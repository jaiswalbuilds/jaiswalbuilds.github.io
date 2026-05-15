# 🤝 Multi-Agent FinOps Team (CrewAI)

> Three specialized CrewAI agents collaborate sequentially: Cost Analyst → Optimization Strategist → Executive Report Writer, each building on the previous agent's findings.

## Architecture

```
Cloud Environment Config (spend, services, pain points)
    ↓
CrewAI Sequential Process
    ├── Agent 1: Cloud Cost Analyst
    │     Goal: Identify waste and anomalies
    │     Backstory: 10yr cloud economist
    │     ↓ (hands off analysis)
    ├── Agent 2: FinOps Optimization Strategist
    │     Goal: Design 5 strategies with projected ROI
    │     Backstory: Reserved instances & rightsizing expert
    │     ↓ (hands off strategies)
    └── Agent 3: Executive Report Writer
          Goal: 30-60-90 day action plan
          Backstory: Technical writer for C-suite
    ↓
Final Executive FinOps Report
```

## Features

- 🤝 3 specialized agents with distinct roles, goals, and backstories
- 🔄 Sequential handoff — each agent's output feeds the next
- 💰 Input your actual cloud spend, services, and pain points
- 📋 Output: 5 optimization strategies with ROI projections + executive action plan
- 🎯 Visual agent progress indicators during execution

## Quick Start

```bash
pip install -r requirements.txt
export OPENAI_API_KEY=sk-...
streamlit run app.py
```

## Multi-Agent Pattern

This demonstrates the **Sequential Crew** pattern from CrewAI:
- Each agent is an LLM with a specific role and backstory
- Tasks are chained — later tasks have context from earlier ones
- Agents don't communicate directly; they pass structured outputs

## Stack

`CrewAI` · `LangChain` · `OpenAI GPT-4o-mini` · `Streamlit`

---
Built by [Manish Jaiswal](https://jaiswalbuilds.github.io) · [neurals.in](https://neurals.in)
