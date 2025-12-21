# 💰 FinOps Cost Optimizer Agent

> Agentic RAG system that analyzes cloud cost data, detects spending anomalies, and generates LLM-powered optimization recommendations.

## Architecture

```
CSV Cost Data
    ↓
Z-Score Anomaly Detection (per service)
    ↓
FAISS Vector Index (cost records as documents)
    ↓
ReAct Agent ──→ [AnomalyDetector Tool]
            ──→ [TopSpenders Tool]
            ──→ [SavingsOpportunities Tool]
    ↓
LLM Reasoning (GPT-4o-mini)
    ↓
Prioritized Optimization Recommendations
```

## Features

- 📊 Pivot table of 5-month cloud spend across 7 AWS services
- 🚨 Automatic z-score anomaly detection with visual highlighting
- 🤖 ReAct agent with 3 specialized tools (anomaly, spend, savings)
- 💬 Natural language interface: ask anything about your cloud costs
- 💡 Actionable recommendations with specific cost reduction strategies

## Quick Start

```bash
pip install -r requirements.txt
export OPENAI_API_KEY=sk-...
streamlit run app.py
```

## Sample Queries

- "Which services have cost spikes and how do I reduce them?"
- "What are the top 3 spenders and what actions should I take?"
- "Give me a FinOps savings plan for this cloud environment."

## Stack

`LangChain` · `FAISS` · `OpenAI GPT-4o-mini` · `ReAct Agent` · `Streamlit` · `Pandas` · `NumPy`

---
Built by [Manish Jaiswal](https://jaiswalbuilds.github.io) · [neurals.in](https://neurals.in)
