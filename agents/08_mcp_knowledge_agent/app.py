"""
MCP Knowledge Base Agent
==========================
Agent that uses structured tool routing (MCP-style) to query different
knowledge sources — docs, APIs, web — and synthesize a unified answer.

Architecture: Query → Intent Classifier → Tool Router (MCP-style) → Multi-source Retrieval → Synthesizer
Run: streamlit run app.py
"""
import streamlit as st
from langchain_openai import ChatOpenAI
from langchain_community.tools import DuckDuckGoSearchRun
from langchain_community.vectorstores import FAISS
from langchain_openai import OpenAIEmbeddings
from langchain.schema import Document
from langchain.agents import create_react_agent, AgentExecutor
from langchain.tools import Tool
from langchain import hub
import os

st.set_page_config(page_title="MCP Knowledge Agent", page_icon="♾️", layout="wide")
st.title("♾️ MCP Knowledge Base Agent")
st.caption("Multi-source knowledge retrieval: internal docs + web search + structured data, routed via MCP-style tool selection.")

api_key = st.sidebar.text_input("OpenAI API Key", type="password")
if not api_key:
    st.warning("Enter your OpenAI API key."); st.stop()

os.environ["OPENAI_API_KEY"] = api_key
llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)
search = DuckDuckGoSearchRun()

INTERNAL_DOCS = [
    Document(page_content="Our SLA guarantees 99.9% uptime. Incidents must be resolved within 4 hours for P1, 24h for P2.", metadata={"source": "sla-policy"}),
    Document(page_content="API rate limits: 1000 req/min for standard, 5000 req/min for enterprise. Keys rotate every 90 days.", metadata={"source": "api-policy"}),
    Document(page_content="Data retention: 7 years for financial records, 2 years for logs, 1 year for analytics.", metadata={"source": "data-policy"}),
    Document(page_content="On-call rotation: Primary on-call is alerted first, escalates to secondary after 15 minutes, manager after 30.", metadata={"source": "oncall-runbook"}),
    Document(page_content="Deployment process: PR review (2 approvals) → staging → smoke tests → canary 10% → full rollout.", metadata={"source": "deploy-runbook"}),
]

@st.cache_resource
def build_internal_vs():
    return FAISS.from_documents(INTERNAL_DOCS, OpenAIEmbeddings())

internal_vs = build_internal_vs()
retriever = internal_vs.as_retriever(search_kwargs={"k": 3})

def search_internal(query: str) -> str:
    docs = retriever.get_relevant_documents(query)
    if not docs: return "No relevant internal documentation found."
    return "\n\n".join([f"[{d.metadata['source']}]: {d.page_content}" for d in docs])

def search_external(query: str) -> str:
    return search.run(query)

def query_api_status(_: str) -> str:
    return '{"status": "operational", "latency_p99_ms": 142, "error_rate": 0.02, "active_incidents": 0}'

tools = [
    Tool(name="InternalKnowledgeBase", func=search_internal,
         description="Search internal docs: SLAs, runbooks, policies, deployment guides."),
    Tool(name="WebSearch", func=search_external,
         description="Search the web for external/current information not in internal docs."),
    Tool(name="APIStatusMonitor", func=query_api_status,
         description="Get current API health status, latency, and incident information."),
]

prompt = hub.pull("hwchase17/react")
agent = create_react_agent(llm, tools, prompt)
executor = AgentExecutor(agent=agent, tools=tools, verbose=False, handle_parsing_errors=True)

st.subheader("🔍 Knowledge Sources")
c1, c2, c3 = st.columns(3)
c1.info("📚 **Internal Docs**\nSLAs, Runbooks, Policies")
c2.info("🌐 **Web Search**\nCurrent & External Info")
c3.info("📡 **API Monitor**\nReal-time Status")

st.subheader("💬 Ask the Agent")
queries = ["What is our P1 incident SLA?", "How do we deploy to production?",
           "What are the latest LLM inference techniques?", "Is our API operational?"]
selected = st.selectbox("Try a sample query:", [""] + queries)
query = st.text_input("Or type your own:", value=selected)

if query and st.button("Ask", type="primary"):
    with st.spinner("Routing to best knowledge source..."):
        result = executor.invoke({"input": query})
    st.markdown("### 💡 Answer")
    st.markdown(result["output"])
