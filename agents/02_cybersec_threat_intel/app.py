"""
Cybersecurity Threat Intelligence Agent
=========================================
RAG-powered agent that ingests threat data, classifies severity,
maps to MITRE ATT&CK, and generates incident response playbooks.

Architecture:
  Threat Feeds → Embeddings → FAISS → RAG Agent → LLM → Playbook

Run: streamlit run app.py
"""

import streamlit as st
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_community.vectorstores import FAISS
from langchain.agents import create_react_agent, AgentExecutor
from langchain.tools import Tool
from langchain import hub
import json, os

st.set_page_config(page_title="Threat Intel Agent", page_icon="🛡️", layout="wide")
st.title("🛡️ Cybersecurity Threat Intelligence Agent")
st.caption("RAG-powered threat analysis with MITRE ATT&CK mapping and auto-generated incident response playbooks.")

api_key = st.sidebar.text_input("OpenAI API Key", type="password")
if not api_key:
    st.warning("Enter your OpenAI API key to start.")
    st.stop()

os.environ["OPENAI_API_KEY"] = api_key
llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)

# ─── Sample Threat Knowledge Base ────────────────────────────────────────────
THREAT_KB = [
    {"id": "T1190", "name": "Exploit Public-Facing Application", "tactic": "Initial Access",
     "severity": "Critical", "indicators": "Unusual HTTP 500 errors, spike in failed auth, WAF alerts",
     "mitigation": "Patch management, WAF rules, rate limiting"},
    {"id": "T1566", "name": "Phishing", "tactic": "Initial Access",
     "severity": "High", "indicators": "Suspicious email attachments, user-reported phishing, link scanning alerts",
     "mitigation": "Email filtering, user training, MFA"},
    {"id": "T1078", "name": "Valid Accounts", "tactic": "Defense Evasion",
     "severity": "High", "indicators": "Logins from unusual IPs, off-hours access, impossible travel",
     "mitigation": "MFA, zero-trust access, session monitoring"},
    {"id": "T1486", "name": "Data Encrypted for Impact (Ransomware)", "tactic": "Impact",
     "severity": "Critical", "indicators": "Mass file renames, encryption processes, ransom notes",
     "mitigation": "Immutable backups, EDR, network segmentation"},
    {"id": "T1071", "name": "Application Layer Protocol (C2)", "tactic": "Command & Control",
     "severity": "High", "indicators": "Unusual outbound DNS/HTTP, beaconing patterns, non-standard ports",
     "mitigation": "DNS filtering, egress monitoring, proxy inspection"},
    {"id": "T1110", "name": "Brute Force", "tactic": "Credential Access",
     "severity": "Medium", "indicators": "High failed logins, account lockouts, credential stuffing patterns",
     "mitigation": "Account lockout policies, CAPTCHA, MFA"},
    {"id": "T1055", "name": "Process Injection", "tactic": "Privilege Escalation",
     "severity": "High", "indicators": "Unusual parent-child process trees, memory anomalies",
     "mitigation": "EDR, application whitelisting, memory protection"},
    {"id": "T1041", "name": "Exfiltration Over C2 Channel", "tactic": "Exfiltration",
     "severity": "Critical", "indicators": "Large outbound transfers, encrypted blobs to unknown IPs",
     "mitigation": "DLP, network monitoring, data classification"},
]

@st.cache_resource
def build_threat_vectorstore():
    docs = [
        f"MITRE ID: {t['id']} | Technique: {t['name']} | Tactic: {t['tactic']} | "
        f"Severity: {t['severity']} | Indicators: {t['indicators']} | Mitigation: {t['mitigation']}"
        for t in THREAT_KB
    ]
    return FAISS.from_texts(docs, OpenAIEmbeddings())

vs = build_threat_vectorstore()
retriever = vs.as_retriever(search_kwargs={"k": 5})

# ─── Tools ───────────────────────────────────────────────────────────────────
def search_threats(query: str) -> str:
    results = retriever.get_relevant_documents(query)
    return "\n\n".join([r.page_content for r in results])

def get_critical_threats(_: str) -> str:
    crits = [t for t in THREAT_KB if t["severity"] == "Critical"]
    return json.dumps([{"id": t["id"], "name": t["name"], "mitigation": t["mitigation"]} for t in crits], indent=2)

tools = [
    Tool(name="ThreatKnowledgeBase", func=search_threats,
         description="Search MITRE ATT&CK threat techniques, indicators, and mitigations."),
    Tool(name="CriticalThreats", func=get_critical_threats,
         description="Get all Critical severity threats and their mitigations."),
]

prompt = hub.pull("hwchase17/react")
agent = create_react_agent(llm, tools, prompt)
executor = AgentExecutor(agent=agent, tools=tools, verbose=False, handle_parsing_errors=True)

# ─── UI ──────────────────────────────────────────────────────────────────────
col1, col2 = st.columns([1, 1])
with col1:
    st.subheader("📋 MITRE ATT&CK Knowledge Base")
    for t in THREAT_KB[:4]:
        color = "#ff4b4b" if t["severity"] == "Critical" else "#ffa726"
        st.markdown(f"**{t['id']} - {t['name']}** `{t['tactic']}`")
        st.markdown(f"<span style='color:{color}'>Severity: {t['severity']}</span>", unsafe_allow_html=True)
        st.caption(f"IOC: {t['indicators'][:80]}...")
        st.divider()

with col2:
    st.subheader("🤖 Threat Intelligence Agent")
    incident = st.text_area("Describe an incident or paste IOCs:",
                             "We see mass file renames, unusual outbound encrypted traffic, and ransom notes appearing on endpoints.")
    if st.button("Analyze & Generate Playbook", type="primary"):
        with st.spinner("Correlating with threat intelligence..."):
            result = executor.invoke({"input": f"Analyze this incident and generate a response playbook: {incident}"})
            st.markdown("### 🎯 Incident Response Playbook")
            st.markdown(result["output"])

# Refactored update: 2026-01-30 check

# Refactored update: 2026-02-02 check

# Refactored update: 2026-03-19 check

# Refactored update: 2026-03-23 check

# Refactored update: 2026-04-07 check

# Refactored update: 2026-04-08 check

# Refactored update: 2026-04-14 check

# Refactored update: 2026-04-28 check
