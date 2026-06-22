"""
Document Intelligence Agent
==============================
Multi-document RAG agent that ingests PDFs/text, extracts key information,
compares documents, and answers cross-document questions with citations.

Architecture: Multi-doc Upload → Chunking → FAISS → Cross-doc RAG → Cited Answers
Run: streamlit run app.py
"""
import streamlit as st
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_community.vectorstores import FAISS
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.chains import RetrievalQAWithSourcesChain
from langchain.schema import Document
import os

st.set_page_config(page_title="Document Intelligence Agent", page_icon="📄", layout="wide")
st.title("📄 Document Intelligence Agent")
st.caption("Multi-document RAG: upload docs, ask cross-document questions, get cited answers.")

api_key = st.sidebar.text_input("OpenAI API Key", type="password")
if not api_key:
    st.warning("Enter your OpenAI API key."); st.stop()

os.environ["OPENAI_API_KEY"] = api_key
llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)

SAMPLE_DOCS = {
    "Q1-2025-Report.txt": "Q1 2025 Revenue: $12.4M (↑18% YoY). Top segment: Enterprise AI ($8.1M). Headcount: 142. Gross margin: 74%. Key wins: 3 Fortune 500 clients. R&D spend: $2.1M on LLM infrastructure.",
    "Q2-2025-Report.txt": "Q2 2025 Revenue: $15.2M (↑23% YoY). Enterprise AI grew to $10.8M. Headcount: 158 (+11%). Gross margin: 76%. Launched FinOps AI product. R&D: $2.8M.",
    "Product-Roadmap.txt": "H2 2025 Roadmap: 1) Multi-modal RAG (Q3), 2) On-premise LLM deployment (Q3), 3) Autonomous FinOps agents (Q4), 4) Voice AI interface (Q4). Budget: $5M R&D.",
    "Risk-Assessment.txt": "Key risks: LLM API dependency (Medium), data privacy regulations (High), talent acquisition (Medium), competitor pricing pressure (High). Mitigation: multi-provider strategy, GDPR compliance program.",
}

uploaded = st.sidebar.file_uploader("Upload your own .txt files", type=["txt"], accept_multiple_files=True)

@st.cache_resource
def build_vs(extra_docs_str: str):
    all_docs = []
    for name, content in SAMPLE_DOCS.items():
        all_docs.append(Document(page_content=content, metadata={"source": name}))
    if extra_docs_str:
        for item in extra_docs_str.split("|||"):
            if ":::" in item:
                name, content = item.split(":::", 1)
                all_docs.append(Document(page_content=content, metadata={"source": name}))
    splitter = RecursiveCharacterTextSplitter(chunk_size=400, chunk_overlap=40)
    chunks = splitter.split_documents(all_docs)
    return FAISS.from_documents(chunks, OpenAIEmbeddings())

extra_str = ""
if uploaded:
    parts = [f"{f.name}:::{f.read().decode('utf-8')}" for f in uploaded]
    extra_str = "|||".join(parts)

vs = build_vs(extra_str)
qa_chain = RetrievalQAWithSourcesChain.from_chain_type(
    llm, retriever=vs.as_retriever(search_kwargs={"k": 5}))

col1, col2 = st.columns([1, 2])
with col1:
    st.subheader("📚 Loaded Documents")
    for name in SAMPLE_DOCS:
        st.markdown(f"📄 `{name}`")
    if uploaded:
        for f in uploaded:
            st.markdown(f"📄 `{f.name}` *(uploaded)*")

with col2:
    st.subheader("💬 Ask Questions Across All Documents")
    sample_qs = [
        "Compare Q1 and Q2 2025 revenue growth.",
        "What are the biggest risks and how are they mitigated?",
        "What new products are planned for H2 2025?",
        "How has headcount changed over the quarters?",
    ]
    selected = st.selectbox("Sample questions:", [""] + sample_qs)
    query = st.text_input("Your question:", value=selected)

    if query and st.button("🔍 Search Documents", type="primary"):
        with st.spinner("Searching across all documents..."):
            result = qa_chain({"question": query})
        st.markdown("### 💡 Answer")
        st.markdown(result["answer"])
        if result.get("sources"):
            st.markdown(f"📎 **Sources:** `{result['sources']}`")

    if st.button("📊 Extract Key Metrics Summary"):
        with st.spinner("Extracting..."):
            result = qa_chain({"question": "Summarize all key financial metrics, product launches, and risks across all documents in a structured table format."})
        st.markdown("### 📊 Document Summary")
        st.markdown(result["answer"])

# Refactored update: 2026-04-21 check

# Refactored update: 2026-05-06 check

# Refactored update: 2026-06-15 check

# Refactored update: 2026-06-22 check
