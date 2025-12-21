# 🎙️ Autonomous LLM Interview Agent

> Multi-turn agentic interviewer with conversation memory, adaptive question difficulty, and a structured JSON evaluation pipeline scoring candidates on 4 dimensions.

## Architecture

```
Role / Level / Focus Config
    ↓
System Prompt (dynamic, role-aware)
    ↓
ConversationChain + ConversationBufferMemory
    ↓
5-Turn Interview Loop
  ├── Q1: Medium difficulty
  ├── Q2: Adapts based on answer quality
  ├── Q3: Escalates or maintains difficulty
  ├── Q4: Practical / system design
  └── Q5: Final deep-dive
    ↓
JSON Evaluator LLM
    ↓
Score Report (4 dimensions + recommendation)
```

## Features

- 🎯 Role-configurable: AI Engineer, ML Engineer, Data Scientist
- 📈 Adaptive difficulty that escalates based on answer quality
- 🧠 ConversationBufferMemory for full interview context retention
- 📊 Structured JSON evaluation: overall score, 4 sub-scores, strengths, improvement areas
- 🏷️ Verdict: Strong Hire / Hire / No Hire
- 🔄 Reset and re-run with different role configurations

## Quick Start

```bash
pip install -r requirements.txt
export OPENAI_API_KEY=sk-...
streamlit run app.py
```

## Evaluation Schema

```json
{
  "overall_score": 8,
  "technical_depth": 9,
  "communication": 7,
  "problem_solving": 8,
  "recommendation": "Strong Hire",
  "strengths": ["Deep RAG knowledge", "Clear system design thinking"],
  "improvement_areas": ["Could elaborate more on MLOps practices"],
  "summary": "..."
}
```

## Stack

`LangChain` · `ConversationBufferMemory` · `OpenAI GPT-4o-mini` · `Streamlit`

---
Built by [Manish Jaiswal](https://jaiswalbuilds.github.io) · [neurals.in](https://neurals.in)
