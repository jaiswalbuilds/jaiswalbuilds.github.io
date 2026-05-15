# 🔧 Autonomous Code Reviewer Agent

> AI agent with AST-based static analysis tools that reviews Python code for SQL injection, hardcoded secrets, O(n²) complexity, and best practice violations — then suggests fixed code.

## Architecture

```
Python Code Input
    ↓
ReAct Agent
  ├── [SyntaxAndSecurityAnalyzer Tool]
  │     → AST parse → detect SQL injection patterns
  │     → detect hardcoded secrets/API keys
  └── [ComplexityAnalyzer Tool]
        → detect nested for-loops (O(n²) risk)
    ↓
LLM Review Pass
  ├── Critical Issues (must fix)
  ├── Warnings (should fix)
  ├── Suggestions (nice to have)
  └── Fixed code snippets
    ↓
Structured Code Review Report
```

## Features

- 🔴 **Security**: SQL injection detection, hardcoded API keys/secrets
- ⚡ **Performance**: O(n²) nested loop detection, complexity analysis
- 📋 **Best Practices**: LLM review for patterns, naming, error handling
- 🛠️ **Auto-fix**: Agent suggests corrected code for each critical issue
- 📊 Side-by-side: AI review report + static analysis output

## Quick Start

```bash
pip install -r requirements.txt
export OPENAI_API_KEY=sk-...
streamlit run app.py
```

## Sample Vulnerable Code (built-in)

The agent ships with a sample Python script containing:
- SQL injection via f-string query construction
- Hardcoded API key (`sk-prod-abc123secretkey`)
- O(n²) nested loop in `process_data()`

## Stack

`LangChain` · `Python AST` · `ReAct Agent` · `OpenAI GPT-4o-mini` · `Streamlit`

---
Built by [Manish Jaiswal](https://jaiswalbuilds.github.io) · [neurals.in](https://neurals.in)
