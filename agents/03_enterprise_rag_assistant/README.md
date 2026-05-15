# 🧠 Enterprise RAG Assistant (Safex-inspired)

> Production-style RAG assistant that indexes enterprise documents, enables semantic Q&A with cited sources — the architecture behind Safex at Safe Security (60% accuracy gain, 75% latency reduction).

## Architecture

```
Enterprise Documents (built-in + uploaded .txt)
    ↓
RecursiveCharacterTextSplitter (chunk_size=500, overlap=50)
    ↓
ChromaDB Vector Store (OpenAI Embeddings)
    ↓
RetrievalQAWithSourcesChain (top-k=4)
    ↓
LLM Answer Generation
    ↓
Answer + Source Citations
```

## Features

- 📚 5 built-in knowledge base docs (RAG, FAISS, LangChain, Agentic AI, Prompt Engineering)
- 📤 Upload your own `.txt` files to expand the knowledge base
- 💬 Persistent chat interface with conversation history
- 📎 Every answer includes source citations
- 🔄 ChromaDB for persistent, scalable vector storage

## Quick Start

```bash
pip install -r requirements.txt
export OPENAI_API_KEY=sk-...
streamlit run app.py
```

## Real-World Impact

This architecture was used to build **Safex** at Safe Security:
- **60% improvement** in AI query accuracy via RAG + re-ranking
- **75% reduction** in response latency via embedding optimization
- Deployed over 400+ REST API docs as the knowledge base

## Stack

`LangChain` · `ChromaDB` · `OpenAI Embeddings` · `RetrievalQAWithSources` · `Streamlit`

---
Built by [Manish Jaiswal](https://jaiswalbuilds.github.io) · [neurals.in](https://neurals.in)
