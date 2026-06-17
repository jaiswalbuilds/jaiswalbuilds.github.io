"""
Multi-Agent FinOps Team (CrewAI)
==================================
Three specialized AI agents collaborate: Cost Analyst, Optimization Strategist,
and Report Writer — to produce a complete cloud cost optimization plan.

Architecture: CrewAI Crew → Cost Analyst Agent + Optimizer Agent + Writer Agent → Final Report
Run: streamlit run app.py
"""
import streamlit as st
from crewai import Agent, Task, Crew, Process
from langchain_openai import ChatOpenAI
import os

st.set_page_config(page_title="Multi-Agent FinOps Team", page_icon="🤝", layout="wide")
st.title("🤝 Multi-Agent FinOps Team")
st.caption("Three specialized AI agents collaborate to optimize your cloud costs end-to-end.")

api_key = st.sidebar.text_input("OpenAI API Key", type="password")
if not api_key:
    st.warning("Enter your OpenAI API key."); st.stop()

os.environ["OPENAI_API_KEY"] = api_key

# ─── Agent Definitions ────────────────────────────────────────────────────────
llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.2)

cost_analyst = Agent(
    role="Cloud Cost Analyst",
    goal="Analyze cloud spending patterns and identify cost anomalies and waste",
    backstory="Expert cloud economist with 10 years analyzing AWS, GCP, Azure bills.",
    llm=llm, verbose=False
)

optimizer = Agent(
    role="FinOps Optimization Strategist",
    goal="Design concrete optimization strategies with projected savings",
    backstory="FinOps practitioner specializing in reserved instances, rightsizing, and governance.",
    llm=llm, verbose=False
)

writer = Agent(
    role="Executive Report Writer",
    goal="Synthesize analysis into clear, executive-ready recommendations",
    backstory="Technical writer who transforms complex cloud data into business decisions.",
    llm=llm, verbose=False
)

# ─── UI ───────────────────────────────────────────────────────────────────────
st.subheader("📋 Cloud Environment Details")
col1, col2, col3 = st.columns(3)
with col1:
    monthly_spend = st.number_input("Monthly Cloud Spend ($)", value=50000, step=5000)
    cloud = st.selectbox("Primary Cloud", ["AWS", "GCP", "Azure", "Multi-cloud"])
with col2:
    top_services = st.multiselect("Top Services", ["EC2/Compute", "S3/Storage", "RDS/Database",
                                                    "Kubernetes", "Lambda", "CDN", "AI/ML Services"],
                                   default=["EC2/Compute", "RDS/Database"])
with col3:
    pain_points = st.multiselect("Pain Points", ["Unexpected spikes", "Idle resources",
                                                   "No reserved instances", "Shadow IT", "No tagging"],
                                  default=["Idle resources", "No reserved instances"])

if st.button("🚀 Launch Agent Team", type="primary"):
    context = f"""
    Cloud: {cloud} | Monthly Spend: ${monthly_spend:,}
    Top Services: {', '.join(top_services)}
    Pain Points: {', '.join(pain_points)}
    """

    tasks = [
        Task(description=f"Analyze this cloud environment and identify specific waste areas:\n{context}",
             agent=cost_analyst, expected_output="Detailed cost analysis with specific waste areas identified"),
        Task(description="Based on the analysis, design 5 concrete optimization strategies with projected savings %",
             agent=optimizer, expected_output="5 optimization strategies with ROI projections"),
        Task(description="Write an executive summary report with a 30-60-90 day action plan",
             agent=writer, expected_output="Executive report with prioritized action plan"),
    ]

    crew = Crew(agents=[cost_analyst, optimizer, writer], tasks=tasks,
                process=Process.sequential, verbose=False)

    col_a, col_b, col_c = st.columns(3)
    with col_a:
        st.markdown("**🔍 Cost Analyst**"); st.info("Analyzing spending patterns...")
    with col_b:
        st.markdown("**⚡ Optimizer**"); st.info("Designing strategies...")
    with col_c:
        st.markdown("**📝 Report Writer**"); st.info("Writing report...")

    with st.spinner("Agent team working..."):
        result = crew.kickoff()

    st.success("✅ Agent team completed!")
    st.markdown("## 📊 FinOps Optimization Report")
    st.markdown(str(result))

# Refactored update: 2026-03-03 check

# Refactored update: 2026-03-10 check

# Refactored update: 2026-04-08 check

# Refactored update: 2026-05-19 check

# Refactored update: 2026-06-03 check

# Refactored update: 2026-06-17 check
