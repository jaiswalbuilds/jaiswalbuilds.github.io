# 📡 ML Pipeline Monitor Agent

> Monitors ML model accuracy, data drift (z-score), and inference latency across all deployed models — then the ReAct agent auto-generates a prioritized remediation runbook when degradation is detected.

## Architecture

```
Simulated Metrics Feed (14 days × 4 models)
    ↓
Anomaly Detection
  ├── Data drift score (PSI proxy)
  ├── Accuracy degradation (< 90% threshold)
  └── Latency SLA breach (> 150ms)
    ↓
ReAct Agent
  ├── [DriftDetector Tool]      → models with drift score > 0.15
  ├── [PerformanceMonitor Tool] → models with accuracy < 0.90
  └── [LatencyMonitor Tool]     → models with p99 latency > 150ms
    ↓
LLM Reasoning
    ↓
Prioritized Remediation Runbook
```

## Features

- 📊 Interactive line chart: accuracy + drift score over 14 days
- 🤖 4 ML models monitored: fraud-detector, churn-predictor, sentiment-classifier, anomaly-detector
- 🚨 Simulated drift injection after Day 10 on fraud-detector (realistic degradation curve)
- 📋 Agent generates a prioritized runbook: retrain, rollback, alert, or watch
- ⚡ Per-model health metrics: accuracy, drift score, latency

## Quick Start

```bash
pip install -r requirements.txt
export OPENAI_API_KEY=sk-...
streamlit run app.py
```

## What the Agent Detects

| Issue | Threshold | Action Generated |
|-------|-----------|-----------------|
| Data Drift | score > 0.15 | Trigger retraining pipeline |
| Accuracy Drop | < 90% | Rollback to previous model version |
| Latency Spike | p99 > 150ms | Scale inference replicas |

## Stack

`LangChain` · `ReAct Agent` · `OpenAI GPT-4o-mini` · `Pandas` · `NumPy` · `Streamlit`

---
Built by [Manish Jaiswal](https://jaiswalbuilds.github.io) · [neurals.in](https://neurals.in)
