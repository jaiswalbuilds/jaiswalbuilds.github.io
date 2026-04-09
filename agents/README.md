# 🤖 AI Engineering Agents by Manish Jaiswal

> 10 production-style AI agents built with real LLM infrastructure — RAG pipelines, multi-agent orchestration, agentic reasoning, and more.

Each agent is self-contained with full source code, architecture, and a one-command runner. Built with Python, LangChain, LlamaIndex, and Streamlit.

---

## 🚀 Agents

| # | Agent | Domain | Stack |
|---|-------|--------|-------|
| 01 | [FinOps Cost Optimizer](./01_finops_cost_optimizer/) | Cloud FinOps | LangChain · OpenAI · FAISS |
| 02 | [Cybersecurity Threat Intel](./02_cybersec_threat_intel/) | Security | LangChain · RAG · FAISS |
| 03 | [Enterprise RAG Assistant](./03_enterprise_rag_assistant/) | Enterprise AI | LlamaIndex · ChromaDB |
| 04 | [LLM Interview Agent](./04_llm_interview_agent/) | HR Tech | LangChain · Memory · Tools |
| 05 | [AI Research Analyst](./05_ai_research_analyst/) | Research | LangChain · DuckDuckGo · GPT |
| 06 | [Multi-Agent FinOps Team](./06_multi_agent_finops_team/) | FinOps | CrewAI · Multi-agent |
| 07 | [Autonomous Code Reviewer](./07_autonomous_code_reviewer/) | DevOps | LangChain · Tools · GitHub |
| 08 | [MCP Knowledge Agent](./08_mcp_knowledge_agent/) | Knowledge Mgmt | MCP · LlamaIndex |
| 09 | [ML Pipeline Monitor](./09_pipeline_monitor_agent/) | MLOps | LangChain · Anomaly Detection |
| 10 | [Document Intelligence](./10_document_intelligence_agent/) | Enterprise | RAG · Multi-doc · FAISS |

---

## ⚡ Quick Start

```bash
git clone https://github.com/jaiswalbuilds/jaiswalbuilds.github.io.git
cd agents/01_finops_cost_optimizer
pip install -r requirements.txt
streamlit run app.py
```

Set your API key:
```bash
export OPENAI_API_KEY=sk-...
```

---

## 🧱 Common Stack

- **LLMs**: OpenAI GPT-4, Anthropic Claude, Google Gemini, Ollama (local)
- **Orchestration**: LangChain, LlamaIndex, CrewAI, AutoGen
- **Vector DBs**: FAISS, ChromaDB, Pinecone
- **UI**: Streamlit
- **MLOps**: MLflow

---

Built by [Manish Jaiswal](https://jaiswalbuilds.github.io) · [neurals.in](https://neurals.in)
