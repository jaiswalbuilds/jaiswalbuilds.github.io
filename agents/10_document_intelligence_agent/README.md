# 📄 Document Intelligence Agent

> Multi-document RAG agent that ingests multiple files, builds a unified FAISS index, and answers cross-document questions with source citations — enabling semantic search across an entire document corpus.

## Architecture

```
Multiple Documents (built-in + user uploaded .txt)
    ↓
RecursiveCharacterTextSplitter (chunk_size=400, overlap=40)
    ↓
FAISS Unified Vector Index (all docs in one index)
    ↓
RetrievalQAWithSourcesChain (top-k=5)
    ↓
LLM Answer Generation
    ↓
Answer + [Source File Citations]
```

## Features

- 📚 4 built-in business docs: Q1 Report, Q2 Report, Product Roadmap, Risk Assessment
- 📤 Upload additional `.txt` files to expand the corpus dynamically
- 🔍 Cross-document questions: compare Q1 vs Q2, find risks in roadmap, etc.
- 📎 Every answer cites the exact source document(s) used
- 📊 One-click "Extract Key Metrics Summary" across all documents
- 🧹 Clean two-panel UI: document list + Q&A interface

## Quick Start

```bash
pip install -r requirements.txt
export OPENAI_API_KEY=sk-...
streamlit run app.py
```

## Sample Cross-Document Questions

- "Compare Q1 and Q2 2025 revenue growth." → synthesizes Q1 + Q2 reports
- "What are the biggest risks and how are they mitigated?" → pulls from Risk Assessment
- "What new products are planned for H2 2025?" → pulls from Roadmap
- "How has headcount changed over the quarters?" → cross-references Q1 + Q2

## Stack

`LangChain` · `FAISS` · `OpenAI Embeddings` · `RetrievalQAWithSources` · `Streamlit`

---
Built by [Manish Jaiswal](https://jaiswalbuilds.github.io) · [neurals.in](https://neurals.in)
