"""
AI Deep Research Analyst Agent
================================
Autonomous agent that researches a topic using DuckDuckGo, synthesizes findings,
and produces a structured research report with key insights.

Architecture: Query → Web Search Tool → Synthesis LLM → Structured Report
Run: streamlit run app.py
"""
import streamlit as st
from langchain_openai import ChatOpenAI
from langchain_community.tools import DuckDuckGoSearchRun
from langchain.agents import create_react_agent, AgentExecutor
from langchain.tools import Tool
from langchain import hub
import os

st.set_page_config(page_title="AI Research Analyst", page_icon="🔍", layout="wide")
st.title("🔍 AI Deep Research Analyst Agent")
st.caption("Autonomous web research agent that synthesizes findings into structured reports.")

api_key = st.sidebar.text_input("OpenAI API Key", type="password")
if not api_key:
    st.warning("Enter your OpenAI API key."); st.stop()

os.environ["OPENAI_API_KEY"] = api_key
llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.2)

search = DuckDuckGoSearchRun()
tools = [
    Tool(name="WebSearch", func=search.run,
         description="Search the web for current information on any topic."),
    Tool(name="Summarizer", func=lambda q: llm.predict(f"Summarize this concisely: {q}"),
         description="Summarize long text into key points."),
]

prompt = hub.pull("hwchase17/react")
agent = create_react_agent(llm, tools, prompt)
executor = AgentExecutor(agent=agent, tools=tools, verbose=True, handle_parsing_errors=True, max_iterations=6)

topic = st.text_input("Research Topic", "AI inference optimization techniques for LLMs in 2025")
depth = st.selectbox("Report Depth", ["Executive Summary", "Detailed Analysis", "Full Report"])

REPORT_PROMPT = {
    "Executive Summary": "Provide a 3-bullet executive summary with key findings and one recommendation.",
    "Detailed Analysis": "Provide: 1) Overview 2) Key findings (5 points) 3) Implications 4) Recommendations",
    "Full Report": "Provide a structured report: Executive Summary, Background, Key Findings, Analysis, Recommendations, Conclusion",
}

if st.button("🔍 Start Research", type="primary"):
    with st.spinner(f"Researching '{topic}'..."):
        instruction = f"""Research '{topic}' thoroughly using web search.
        Then {REPORT_PROMPT[depth]}
        Format your final answer in clean markdown."""
        
        with st.expander("🔧 Agent Reasoning (Live)", expanded=False):
            result = executor.invoke({"input": instruction})
        
        st.markdown("## 📄 Research Report")
        st.markdown(result["output"])
        
        st.download_button("📥 Download Report", result["output"],
                           file_name=f"research_{topic[:30].replace(' ','_')}.md",
                           mime="text/markdown")

# Refactored update: 2026-02-09 check

# Refactored update: 2026-04-01 check

# Refactored update: 2026-05-08 check

# Refactored update: 2026-05-25 check

# Refactored update: 2026-05-25 check

# Refactored update: 2026-06-24 check
