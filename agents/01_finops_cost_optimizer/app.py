"""
FinOps Cost Optimizer Agent
============================
Agentic RAG system that analyzes cloud cost data, detects anomalies,
and generates optimization recommendations using LLMs.

Architecture:
  CSV Cost Data -> FAISS Embeddings -> ReAct Agent (Anomaly + Spend tools) -> LLM Reasoning -> Recommendations

Run:
  pip install -r requirements.txt
  streamlit run app.py
"""

import streamlit as st
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_community.vectorstores import FAISS
from langchain.agents import create_react_agent, AgentExecutor
from langchain.tools import Tool
from langchain import hub
import pandas as pd
import numpy as np
import json
import os

st.set_page_config(page_title="FinOps Cost Optimizer", page_icon="💰", layout="wide")
st.title("💰 FinOps Cost Optimizer Agent")
st.caption("AI-powered cloud cost analysis, anomaly detection, and optimization recommendations.")

api_key = st.sidebar.text_input("OpenAI API Key", type="password")
if not api_key:
    st.warning("Enter your OpenAI API key in the sidebar to start.")
    st.stop()

os.environ["OPENAI_API_KEY"] = api_key
llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)

# ── Sample Cloud Cost Data ────────────────────────────────────────────────────
@st.cache_data
def generate_cost_data():
    np.random.seed(42)
    services = ["EC2", "S3", "RDS", "Lambda", "CloudFront", "EKS", "DynamoDB"]
    months = ["Jan", "Feb", "Mar", "Apr", "May"]
    records = []
    for svc in services:
        base = np.random.uniform(500, 5000)
        for m in months:
            spike = np.random.choice([1.0, 1.0, 1.0, 2.8], p=[0.7, 0.1, 0.1, 0.1])
            records.append({
                "service": svc,
                "month": m,
                "cost_usd": round(base * np.random.uniform(0.9, 1.1) * spike, 2),
                "region": np.random.choice(["us-east-1", "us-west-2", "eu-west-1"])
            })
    return pd.DataFrame(records)

df = generate_cost_data()

# ── Anomaly Detection (z-score) ───────────────────────────────────────────────
def detect_anomalies(df):
    anomalies = []
    for svc in df["service"].unique():
        sdf = df[df["service"] == svc].copy()
        mean, std = sdf["cost_usd"].mean(), sdf["cost_usd"].std()
        sdf["is_anomaly"] = sdf["cost_usd"] > mean + 1.5 * std
        sdf["z_score"] = (sdf["cost_usd"] - mean) / (std + 1e-9)
        anomalies.append(sdf)
    return pd.concat(anomalies)

adf = detect_anomalies(df)

# ── Build FAISS Knowledge Base ────────────────────────────────────────────────
@st.cache_resource
def build_vectorstore(_df):
    docs = [
        (f"Service: {row['service']}, Month: {row['month']}, "
         f"Cost: ${row['cost_usd']}, Region: {row['region']}, "
         f"Anomaly: {row.get('is_anomaly', False)}")
        for _, row in _df.iterrows()
    ]
    return FAISS.from_texts(docs, OpenAIEmbeddings())

vectorstore = build_vectorstore(adf)

# ── Tools ─────────────────────────────────────────────────────────────────────
def get_anomaly_summary(_: str) -> str:
    anomalies = adf[adf["is_anomaly"] == True]
    if anomalies.empty:
        return "No anomalies detected."
    return json.dumps(
        anomalies[["service", "month", "cost_usd", "region"]].to_dict("records"),
        indent=2
    )

def get_top_spenders(_: str) -> str:
    top = df.groupby("service")["cost_usd"].sum().sort_values(ascending=False).head(3)
    return top.to_json()

def get_savings_opportunities(_: str) -> str:
    tips = [
        "Switch EC2 on-demand to Reserved Instances for 30-40% savings",
        "Enable S3 Intelligent-Tiering to automatically move cold data",
        "Rightsize RDS instances — check if db.r5.large can be replaced with db.t3.medium",
        "Delete unattached EBS volumes and old snapshots",
        "Use Lambda Savings Plans for predictable workloads",
    ]
    return json.dumps(tips)

tools = [
    Tool(
        name="AnomalyDetector",
        func=get_anomaly_summary,
        description="Returns services with cost anomalies (unexpected spikes detected by z-score)."
    ),
    Tool(
        name="TopSpenders",
        func=get_top_spenders,
        description="Returns the top 3 cloud services by total spend across all months."
    ),
    Tool(
        name="SavingsOpportunities",
        func=get_savings_opportunities,
        description="Returns a list of proven cloud cost reduction strategies."
    ),
]

# ── Agent Setup ───────────────────────────────────────────────────────────────
prompt = hub.pull("hwchase17/react")
agent = create_react_agent(llm, tools, prompt)
agent_executor = AgentExecutor(
    agent=agent, tools=tools, verbose=False, handle_parsing_errors=True
)

# ── UI ────────────────────────────────────────────────────────────────────────
col1, col2 = st.columns([2, 1])

with col1:
    st.subheader("📊 Cloud Cost Overview (Last 5 Months)")
    pivot = df.pivot_table(
        values="cost_usd", index="service", columns="month", aggfunc="sum"
    )
    st.dataframe(pivot.style.highlight_max(axis=1, color="#ff4b4b"), use_container_width=True)

with col2:
    st.subheader("🚨 Anomalies Detected")
    anoms = adf[adf["is_anomaly"] == True][["service", "month", "cost_usd"]]
    if not anoms.empty:
        st.dataframe(anoms, use_container_width=True)
    else:
        st.success("No anomalies found!")

    total = df["cost_usd"].sum()
    st.metric("Total 5-Month Spend", f"${total:,.0f}")
    st.metric("Anomaly Count", len(adf[adf["is_anomaly"] == True]))

st.divider()
st.subheader("🤖 Ask the FinOps Agent")

sample_queries = [
    "Which services have cost spikes and how do I reduce them?",
    "What are the top 3 spenders and what actions should I take?",
    "Give me a FinOps savings plan for this cloud environment.",
]
selected = st.selectbox("Try a sample query:", [""] + sample_queries)
query = st.text_input("Or type your own question:", value=selected)

if query and st.button("Analyze", type="primary"):
    with st.spinner("Agent analyzing your cloud costs..."):
        result = agent_executor.invoke({"input": query})
        st.markdown("### 💡 Agent Recommendation")
        st.markdown(result["output"])

# Refactored update: 2025-12-23 check

# Refactored update: 2025-12-31 check

# Refactored update: 2026-02-03 check

# Refactored update: 2026-03-20 check

# Refactored update: 2026-03-20 check

# Refactored update: 2026-03-30 check

# Refactored update: 2026-05-27 check

# Refactored update: 2026-06-03 check

# Refactored update: 2026-06-18 check

# Refactored update: 2026-07-09 check
