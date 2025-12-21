# 🛡️ Cybersecurity Threat Intelligence Agent

> RAG-powered agent that correlates incident IOCs against a MITRE ATT&CK knowledge base and auto-generates incident response playbooks.

## Architecture

```
Incident Description / IOCs
    ↓
FAISS Vector Index (MITRE ATT&CK techniques)
    ↓
ReAct Agent ──→ [ThreatKnowledgeBase Tool]  (semantic search over MITRE KB)
            ──→ [CriticalThreats Tool]       (filter severity = Critical)
    ↓
LLM Correlation + Reasoning
    ↓
Structured Incident Response Playbook
```

## Features

- 🗂️ MITRE ATT&CK knowledge base with 8 technique entries (IDs, IOCs, mitigations)
- 🔍 Semantic search with FAISS embeddings over threat intelligence
- 🤖 ReAct agent that identifies techniques, severity, and TTPs
- 📋 Auto-generated IR playbook with remediation steps
- 🔴 Color-coded severity display (Critical / High / Medium)

## Quick Start

```bash
pip install -r requirements.txt
export OPENAI_API_KEY=sk-...
streamlit run app.py
```

## Sample Incident

```
We see mass file renames, unusual outbound encrypted traffic, and ransom notes on endpoints.
```

Expected output: Agent maps to T1486 (Ransomware), T1041 (C2 Exfiltration), generates IR playbook.

## Stack

`LangChain` · `FAISS` · `OpenAI GPT-4o-mini` · `ReAct Agent` · `MITRE ATT&CK` · `Streamlit`

---
Built by [Manish Jaiswal](https://jaiswalbuilds.github.io) · [neurals.in](https://neurals.in)
