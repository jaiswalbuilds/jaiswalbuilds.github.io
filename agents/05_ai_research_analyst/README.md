# 🔍 AI Deep Research Analyst Agent

> Autonomous agent that uses DuckDuckGo web search iteratively to research a topic, synthesizes findings across multiple search passes, and produces structured reports at configurable depth.

## Architecture

```
Research Topic + Depth Config
    ↓
ReAct Agent
  ├── [WebSearch Tool] → DuckDuckGo (multi-pass)
  └── [Summarizer Tool] → LLM text compression
    ↓
Multi-step Reasoning Loop (max 6 iterations)
    ↓
Report Synthesizer
    ↓
Structured Report (Executive / Detailed / Full)
```

## Features

- 🌐 Live web search via DuckDuckGo (no API key required for search)
- 🔄 Multi-pass iterative research — the agent decides when it has enough info
- 📊 Three report depths: Executive Summary, Detailed Analysis, Full Report
- 📥 Download report as markdown file
- 🔧 Live agent reasoning expander for transparency
- ⚙️ Max 6 search iterations to keep costs low

## Quick Start

```bash
pip install -r requirements.txt
export OPENAI_API_KEY=sk-...
streamlit run app.py
```

## Example Topics

- "AI inference optimization techniques for LLMs in 2025"
- "FinOps best practices for multi-cloud environments"
- "FAISS vs Pinecone vs ChromaDB — a technical comparison"

## Stack

`LangChain` · `DuckDuckGo Search` · `ReAct Agent` · `OpenAI GPT-4o-mini` · `Streamlit`

---
Built by [Manish Jaiswal](https://jaiswalbuilds.github.io) · [neurals.in](https://neurals.in)
