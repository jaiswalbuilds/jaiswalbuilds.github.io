"""
ML Pipeline Monitor Agent
===========================
Monitors ML model metrics (accuracy, drift, latency), detects anomalies,
and auto-generates remediation runbooks when issues are found.

Architecture: Metrics Feed → Anomaly Detector → LLM Reasoner → Auto-Remediation Playbook
Run: streamlit run app.py
"""
import streamlit as st
from langchain_openai import ChatOpenAI
from langchain.agents import create_react_agent, AgentExecutor
from langchain.tools import Tool
from langchain import hub
import pandas as pd, numpy as np, json, os

st.set_page_config(page_title="ML Pipeline Monitor", page_icon="📡", layout="wide")
st.title("📡 ML Pipeline Monitor Agent")
st.caption("Real-time ML model monitoring with drift detection and AI-generated remediation playbooks.")

api_key = st.sidebar.text_input("OpenAI API Key", type="password")
if not api_key:
    st.warning("Enter your OpenAI API key."); st.stop()

os.environ["OPENAI_API_KEY"] = api_key
llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)

@st.cache_data
def generate_metrics():
    np.random.seed(99)
    models = ["fraud-detector-v2", "churn-predictor", "sentiment-classifier", "anomaly-detector"]
    metrics = []
    for m in models:
        base_acc = np.random.uniform(0.88, 0.97)
        for day in range(14):
            drift = 1 if day >= 10 and "fraud" in m else 0
            metrics.append({
                "model": m, "day": f"Day {day+1}",
                "accuracy": round(base_acc - (drift * 0.08 * np.random.uniform(0.5, 1.5)), 3),
                "latency_ms": round(np.random.normal(120, 15) * (1 + drift * 0.4), 1),
                "data_drift_score": round(np.random.uniform(0.02, 0.08) * (1 + drift * 3), 3),
                "prediction_volume": int(np.random.normal(10000, 500))
            })
    return pd.DataFrame(metrics)

df = generate_metrics()

def get_drift_report(_: str) -> str:
    latest = df[df["day"] == "Day 14"]
    drifted = latest[latest["data_drift_score"] > 0.15]
    if drifted.empty: return "No significant data drift detected."
    return drifted[["model", "accuracy", "data_drift_score", "latency_ms"]].to_json(orient="records")

def get_performance_summary(_: str) -> str:
    latest = df[df["day"] == "Day 14"]
    degraded = latest[latest["accuracy"] < 0.90]
    return degraded[["model", "accuracy", "latency_ms"]].to_json(orient="records") if not degraded.empty else "All models performing within thresholds."

def check_latency_spikes(_: str) -> str:
    latest = df[df["day"] == "Day 14"]
    slow = latest[latest["latency_ms"] > 150]
    return slow[["model", "latency_ms"]].to_json(orient="records") if not slow.empty else "All latencies within SLA (<150ms)."

tools = [
    Tool(name="DriftDetector", func=get_drift_report,
         description="Check for data drift across all ML models."),
    Tool(name="PerformanceMonitor", func=get_performance_summary,
         description="Check model accuracy and performance degradation."),
    Tool(name="LatencyMonitor", func=check_latency_spikes,
         description="Check for latency spikes exceeding SLA thresholds."),
]

prompt = hub.pull("hwchase17/react")
agent = create_react_agent(llm, tools, prompt)
executor = AgentExecutor(agent=agent, tools=tools, verbose=False, handle_parsing_errors=True)

col1, col2 = st.columns([2, 1])
with col1:
    st.subheader("📊 Model Metrics (Last 14 Days)")
    model_filter = st.selectbox("Model", df["model"].unique())
    mdf = df[df["model"] == model_filter]
    st.line_chart(mdf.set_index("day")[["accuracy", "data_drift_score"]])

with col2:
    st.subheader("⚡ Day 14 Status")
    latest = df[(df["day"] == "Day 14") & (df["model"] == model_filter)].iloc[0]
    st.metric("Accuracy", f"{latest['accuracy']:.1%}")
    st.metric("Drift Score", f"{latest['data_drift_score']:.3f}", delta_color="inverse")
    st.metric("Latency", f"{latest['latency_ms']:.0f}ms")

st.divider()
st.subheader("🤖 Monitor Agent")
if st.button("🔍 Run Full Pipeline Audit", type="primary"):
    with st.spinner("Agent auditing all models..."):
        result = executor.invoke({"input": "Run a full audit of all ML models. Check drift, performance, and latency. Generate a prioritized remediation runbook for any issues found."})
    st.markdown("### 🛠️ Remediation Runbook")
    st.markdown(result["output"])

# Refactored update: 2026-04-13 check

# Refactored update: 2026-05-23 check
