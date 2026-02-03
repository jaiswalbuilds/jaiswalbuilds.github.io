# ♾️ MCP Knowledge Base Agent

> Multi-source knowledge agent with MCP-style tool routing — automatically routes queries to internal docs (FAISS), real-time web search (DuckDuckGo), or API status monitoring, then synthesizes a unified answer.

## Architecture

```
User Query
    ↓
ReAct Agent (Tool Router)
    ├── [InternalKnowledgeBase Tool]
    │     → FAISS search over 5 internal policy/runbook docs
    │     → SLAs, deployment runbooks, API policies
    ├── [WebSearch Tool]
    │     → DuckDuckGo for external/current information
    └── [APIStatusMonitor Tool]
          → Returns current API health, latency, incidents
    ↓
LLM Synthesis (combines results from all sources)
    ↓
Unified Answer
```

## Features

- 🏛️ **Internal KB**: SLA policy, API rate limits, data retention, on-call runbook, deploy process
- 🌐 **Web Search**: Live DuckDuckGo for external/current questions
- 📡 **API Monitor**: Simulated real-time API health status feed
- 🔀 **Smart Routing**: Agent decides which tool(s) to use based on query intent
- 💬 Sample queries to demonstrate routing behavior

## Quick Start

```bash
pip install -r requirements.txt
export OPENAI_API_KEY=sk-...
streamlit run app.py
```

## MCP Pattern

This agent implements the **Model Context Protocol** pattern:
- Tools are discrete, well-described "context providers"
- The LLM selects which tool(s) to invoke based on the query
- Results are synthesized into a single, coherent response
- Extensible: add new tools (databases, APIs, files) without changing the agent core

## Sample Queries

- "What is our P1 incident SLA?" → routes to Internal KB
- "What are the latest LLM inference techniques?" → routes to Web Search
- "Is our API operational?" → routes to API Monitor

## Stack

`LangChain` · `FAISS` · `DuckDuckGo Search` · `ReAct Agent` · `OpenAI GPT-4o-mini` · `Streamlit`

---
Built by [Manish Jaiswal](https://jaiswalbuilds.github.io) · [neurals.in](https://neurals.in)
