"""
Enterprise RAG Assistant (Safex-inspired)
==========================================
A production-style RAG assistant that indexes enterprise documents,
enables semantic search, and answers questions with cited sources.

Architecture:
  Documents → Chunking → Embeddings → ChromaDB → Retrieval → LLM → Answer + Citations

Run: streamlit run app.py
"""

import streamlit as st
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_community.vectorstores import Chroma
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.chains import RetrievalQAWithSourcesChain
from langchain.schema import Document
import os, tempfile

st.set_page_config(page_title="Enterprise RAG Assistant", page_icon="🧠", layout="wide")
st.title("🧠 Enterprise RAG Assistant")
st.caption("Upload enterprise documents and ask questions — answers come with cited sources.")

api_key = st.sidebar.text_input("OpenAI API Key", type="password")
if not api_key:
    st.warning("Enter your OpenAI API key to start.")
    st.stop()

os.environ["OPENAI_API_KEY"] = api_key
llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)

# ─── Built-in Sample Docs ─────────────────────────────────────────────────────
SAMPLE_DOCS = [
    Document(page_content="""FAISS (Facebook AI Similarity Search) is a library for efficient similarity search.
    It indexes vector embeddings and enables nearest neighbor search at scale. FAISS supports GPU acceleration
    and is widely used in RAG pipelines for fast retrieval over millions of vectors.""",
    metadata={"source": "vector-db-overview.txt"}),
    Document(page_content="""RAG (Retrieval Augmented Generation) combines retrieval systems with generative LLMs.
    The pipeline: embed query → retrieve top-k chunks → prepend to prompt → generate answer.
    RAG reduces hallucinations by grounding responses in retrieved context.""",
    metadata={"source": "rag-architecture.txt"}),
    Document(page_content="""Prompt engineering best practices: use clear instructions, chain-of-thought for reasoning,
    few-shot examples for consistency, structured output schemas (JSON), and self-critique loops.
    System prompts should define the LLM persona and guardrails.""",
    metadata={"source": "prompt-engineering-guide.txt"}),
    Document(page_content="""Agentic AI systems use LLMs as reasoning engines that call tools iteratively.
    Key patterns: ReAct (Reasoning + Acting), Reflection, Plan-and-Execute, and multi-agent collaboration.
    Memory types: in-context, external (vector DB), and episodic.""",
    metadata={"source": "agentic-ai-patterns.txt"}),
    Document(page_content="""LangChain provides abstractions for building LLM applications: chains, agents, tools, memory, callbacks.
    Key components: LLMChain, RetrievalQA, AgentExecutor, ConversationBufferMemory, FAISS/Chroma vector stores.""",
    metadata={"source": "langchain-reference.txt"}),
]

# ─── Build / Update Vectorstore ───────────────────────────────────────────────
@st.cache_resource
def build_vectorstore(extra_docs=None):
    splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
    docs = SAMPLE_DOCS + (extra_docs or [])
    chunks = splitter.split_documents(docs)
    return Chroma.from_documents(chunks, OpenAIEmbeddings())

# ─── Sidebar Upload ───────────────────────────────────────────────────────────
uploaded = st.sidebar.file_uploader("Upload Documents (.txt)", type=["txt"], accept_multiple_files=True)
extra = []
if uploaded:
    for f in uploaded:
        text = f.read().decode("utf-8")
        extra.append(Document(page_content=text, metadata={"source": f.name}))
    st.sidebar.success(f"Loaded {len(uploaded)} document(s)")

vs = build_vectorstore(extra)
qa_chain = RetrievalQAWithSourcesChain.from_chain_type(
    llm, chain_type="stuff",
    retriever=vs.as_retriever(search_kwargs={"k": 4})
)

# ─── Chat UI ──────────────────────────────────────────────────────────────────
if "messages" not in st.session_state:
    st.session_state.messages = []

for msg in st.session_state.messages:
    with st.chat_message(msg["role"]):
        st.markdown(msg["content"])

if query := st.chat_input("Ask about your enterprise docs..."):
    st.session_state.messages.append({"role": "user", "content": query})
    with st.chat_message("user"):
        st.markdown(query)

    with st.chat_message("assistant"):
        with st.spinner("Searching knowledge base..."):
            result = qa_chain({"question": query})
            answer = result["answer"]
            sources = result.get("sources", "")
            full = answer
            if sources:
                full += f"\n\n📎 **Sources:** `{sources}`"
            st.markdown(full)
            st.session_state.messages.append({"role": "assistant", "content": full})

# Refactored update: 2026-01-10 check
