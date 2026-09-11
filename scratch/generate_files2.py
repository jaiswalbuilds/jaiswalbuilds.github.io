import os

workspace_dir = r"C:\Users\jaisw\OneDrive\GitHub\jaiswalbuilds.github.io"
src_dir = os.path.join(workspace_dir, "src")
components_dir = os.path.join(src_dir, "components")

# 9. src/components/Hero.jsx
hero_jsx_content = """import React, { useState, useEffect, useRef } from 'react';
import { Play, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import './Hero.css';

const PRESETS = {
  finops: [
    { type: 'system', text: '[SYSTEM] Initializing Agent 01 (FinOps Cost Optimizer)...' },
    { type: 'router', text: '[ROUTER] Query routed to: FAISS Vector DB (k=3, threshold=0.75)' },
    { type: 'tool', text: '[TOOL] Running CSVAnomaliesTool on log: aws_billing_may.csv' },
    { type: 'anomaly', text: '[ANOMALY] Detected 3 compute cost spikes (Z-Score = 2.89) in EC2' },
    { type: 'text', text: '[THOUGHT] Reasoner: Anomalies correspond to un-scheduled dev-envs on weekends.' },
    { type: 'eval', text: '[EVAL] Groundedness: 0.98 | Citation Accuracy: 1.00 | Hallucination Check: PASS' },
    { type: 'success', text: '[SUCCESS] Recommendation: Enable spot transition. Savings: $14,200/mo.' }
  ],
  security: [
    { type: 'system', text: '[SYSTEM] Initializing Agent 02 (Threat Intel Analyzer)...' },
    { type: 'router', text: '[ROUTER] Query routed to: MITRE ATT&CK Knowledge Base (ChromaDB)' },
    { type: 'tool', text: '[TOOL] Querying IOC database for IP: 185.190.140.2' },
    { type: 'anomaly', text: '[THREAT] Matching threat signatures found: APT29 Cozy Bear IOC' },
    { type: 'eval', text: '[EVAL] Context Recall: 0.95 | Context Precision: 0.98 | Safety Check: PASS' },
    { type: 'success', text: '[SUCCESS] Playbook generated: Auto quarantine command sent to PaloAlto API.' }
  ],
  rag_docs: [
    { type: 'system', text: '[SYSTEM] Initializing Agent 03 (Enterprise RAG Assistant)...' },
    { type: 'router', text: '[ROUTER] Intent: Documentation QA. Target: FAISS Vector store.' },
    { type: 'tool', text: '[TOOL] Querying embeddings for chunk search (bearer validation)' },
    { type: 'eval', text: '[EVAL] Faithfulness: 0.96 | Answer Relevance: 0.95 | Citation Accuracy: 1.00' },
    { type: 'success', text: '[SUCCESS] Output: RS256 signature validation is verified in api_auth.md:L45.' }
  ],
  fraud: [
    { type: 'system', text: '[SYSTEM] Initializing Agent 04 (Fraud Transaction Scanner)...' },
    { type: 'router', text: '[ROUTER] Triggering parallel runs: FAISS query + Python velocity script' },
    { type: 'tool', text: '[TOOL:DB] Retrieved user baseline profile matched index score: 0.88' },
    { type: 'tool', text: '[TOOL:CODE] Velocity check script: 12tx/sec (spike threshold = 5)' },
    { type: 'eval', text: '[EVAL] Probability of Fraud: 94% | Safety Flag: High' },
    { type: 'success', text: '[SUCCESS] Output: Card account flagged. quarantine commands triggered.' }
  ],
  protein: [
    { type: 'system', text: '[SYSTEM] Initializing Agent 05 (Protein Align Motif Matcher)...' },
    { type: 'router', text: '[ROUTER] Routing target: NCBI Web Search + Needleman-Wunsch Alignment' },
    { type: 'tool', text: '[TOOL:WEB] NCBI hits: GPCR Active Receptors matched sequence identity: 92%' },
    { type: 'tool', text: '[TOOL:CODE] Alignment calculated matching indices: GPCR-101 target' },
    { type: 'eval', text: '[EVAL] Motif Groundedness: 0.98 | Alignment confidence: 0.94' },
    { type: 'success', text: '[SUCCESS] Output: MVLA sequence motif successfully matched active GPCR targets.' }
  ],
  sentiment: [
    { type: 'system', text: '[SYSTEM] Initializing Agent 06 (AppStore Sentiment Auditor)...' },
    { type: 'router', text: '[ROUTER] Routing alert to reviews scraper...' },
    { type: 'tool', text: '[TOOL:WEB] Scraped AppStore API reviews: 350 records' },
    { type: 'eval', text: '[EVAL] Crash frequency spike: 28 mentions | Bug category: critical' },
    { type: 'success', text: '[SUCCESS] Output: App crash loop in v2.4.1 detected. Hotfix/Rollback recommended.' }
  ],
  clinical: [
    { type: 'system', text: '[SYSTEM] Initializing Agent 07 (Clinical Trials Matcher)...' },
    { type: 'router', text: '[ROUTER] Routing patient criteria search query to ClinicalTrials API' },
    { type: 'tool', text: '[TOOL:DB] FAISS database search for eligibility criteria matching oncological profiles' },
    { type: 'eval', text: '[EVAL] Semantic Relevance: 0.94 | Groundedness: 0.97 | Safety Check: PASS' },
    { type: 'success', text: '[SUCCESS] Output: Candidate matches NCT-0428 trial. Patient invitation payload ready.' }
  ],
  legal: [
    { type: 'system', text: '[SYSTEM] Initializing Agent 08 (Legal Agreement Auditor)...' },
    { type: 'router', text: '[ROUTER] Routing contract clauses to AST-based compliance analyzer' },
    { type: 'tool', text: '[TOOL:CODE] Python parser scanning text for liability limits and indemnity terms' },
    { type: 'eval', text: '[EVAL] Compliance Score: 85% | Liability alert detected: PASS' },
    { type: 'success', text: '[SUCCESS] Output: Liability limit clause is valid and within parameters. Audit approved.' }
  ],
  logistics: [
    { type: 'system', text: '[SYSTEM] Initializing Agent 09 (E-Commerce Logistics Router)...' },
    { type: 'router', text: '[ROUTER] Routing alert feed to delivery optimization solver' },
    { type: 'tool', text: '[TOOL:CODE] Executing routing optimizer script: delivery_anomalies.py' },
    { type: 'eval', text: '[EVAL] Accuracy rating: 0.97 | Out-of-bounds anomaly: 3 delay clusters detected' },
    { type: 'success', text: '[SUCCESS] Output: 3 warehouse delays bypassed. Rerouted order flow to carrier-B.' }
  ],
  devops: [
    { type: 'system', text: '[SYSTEM] Initializing Agent 10 (DevOps YAML build monitor)...' },
    { type: 'router', text: '[ROUTER] Routing parser logs query to GitHub actions trace analyzer' },
    { type: 'tool', text: '[TOOL:CODE] Executing log classification model matching error outputs' },
    { type: 'eval', text: '[EVAL] Precision: 0.96 | Recall: 0.95 | Verdict: BUILD_FAIL_GATED' },
    { type: 'success', text: '[SUCCESS] Output: Build failed on Node-18 dependency deprecation. Remediation patch ready.' }
  ]
};

const Hero = ({ onShowResume, onLaunchStudio }) => {
  const [selectedPreset, setSelectedPreset] = useState('finops');
  const [consoleLogs, setConsoleLogs] = useState([
    { type: 'system', text: '[SYSTEM] Agent command console ready. Select a dataset and execute trace...' }
  ]);
  const [isRunning, setIsRunning] = useState(false);
  const consoleRef = useRef(null);

  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [consoleLogs]);

  const runSimulation = async (key) => {
    if (isRunning || !PRESETS[key]) return;
    setIsRunning(true);
    setConsoleLogs([]);

    const steps = PRESETS[key] || [];
    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setConsoleLogs(prev => [...prev, steps[i]]);
    }
    setIsRunning(false);
  };

  const clearConsole = () => {
    setConsoleLogs([{ type: 'system', text: '[SYSTEM] Console cleared. Standby.' }]);
  };

  return (
    <div className="hero-section">
      <div className="section-label">// Agent Execution Trace</div>
      
      <div className="scenario-tabs">
        {Object.keys(PRESETS).map(key => (
          <button
            key={key}
            className={`scenario-tab ${selectedPreset === key ? 'active' : ''}`}
            onClick={() => {
              if(!isRunning){
                setSelectedPreset(key);
                setConsoleLogs([{ type: 'system', text: `[SYSTEM] Preset set to ${key.toUpperCase()}. Ready.` }]);
              }
            }}
          >
            {key.replace(/_/g, ' ')}
          </button>
        ))}
      </div>

      <div className="terminal-window">
        <div className="terminal-titlebar">
          <div style={{ display: 'flex', gap: '6px' }}>
            <span className="terminal-dot red"></span>
            <span className="terminal-dot yellow"></span>
            <span className="terminal-dot green"></span>
          </div>
          <span className="terminal-title">agent-trace.sh</span>
          <button onClick={clearConsole} style={{marginLeft: 'auto', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer'}}>
            <Trash2 size={14} />
          </button>
        </div>
        
        <div className="terminal-body" ref={consoleRef} style={{ overflowY: 'auto', maxHeight: '400px' }}>
          {consoleLogs.map((log, i) => (
            <div key={i} className={`line-${log.type}`}>
              {log.text}
            </div>
          ))}
          {isRunning && <div className="line-cursor">_</div>}
        </div>
        
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '0.75rem 1rem', display: 'flex', justifyContent: 'flex-end' }}>
           <button 
              onClick={() => runSimulation(selectedPreset)} 
              className="btn btn-primary"
              disabled={isRunning}
              style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}
            >
              <Play size={14} style={{ marginRight: '6px' }} /> Execute Trace
            </button>
        </div>
      </div>

      <div className="terminal-metrics">
        <div className="metric-tile">
          <span className="metric-label">Latency</span>
          <span className="metric-value">340ms</span>
        </div>
        <div className="metric-tile">
          <span className="metric-label">Tokens</span>
          <span className="metric-value">2,847</span>
        </div>
        <div className="metric-tile">
          <span className="metric-label">Cost</span>
          <span className="metric-value">$0.0014</span>
        </div>
        <div className="metric-tile">
          <span className="metric-label">Accuracy</span>
          <span className="metric-value good">98.2%</span>
        </div>
      </div>
    </div>
  );
};

export default Hero;
"""
with open(os.path.join(components_dir, "Hero.jsx"), "w", encoding="utf-8") as f:
    f.write(hero_jsx_content)

# 10. src/components/Hero.css
hero_css_content = """.hero-section {
  padding: 7rem 2.5rem 4rem;
}
.hero-label {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: var(--accent-cyan);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-bottom: 1.5rem;
  opacity: 0.8;
}
.scenario-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
}
.scenario-tab {
  padding: 0.35rem 0.85rem;
  border-radius: 6px;
  border: 1px solid var(--border-subtle);
  background: transparent;
  color: var(--text-muted);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
  text-transform: capitalize;
}
.scenario-tab:hover {
  border-color: var(--accent-cyan);
  color: var(--accent-cyan);
}
.scenario-tab.active {
  background: rgba(6,182,212,0.1);
  border-color: var(--accent-cyan);
  color: var(--accent-cyan);
}
.terminal-window {
  background: #0d1117;
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 12px;
  overflow: hidden;
  min-height: 380px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(99,102,241,0.1);
}
.terminal-titlebar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: rgba(255,255,255,0.03);
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
.terminal-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}
.terminal-dot.red { background: #FF5F57; }
.terminal-dot.yellow { background: #FFBD2E; }
.terminal-dot.green { background: #28CA41; }
.terminal-title {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--text-muted);
  margin-left: 0.5rem;
}
.terminal-body {
  padding: 1.25rem 1.5rem;
  min-height: 320px;
  font-family: var(--font-mono);
  font-size: 0.82rem;
  line-height: 1.7;
}
.line-system { color: #94A3B8; }
.line-router { color: #A78BFA; }
.line-tool { color: #38BDF8; }
.line-anomaly { color: #FB923C; }
.line-eval { color: #4ADE80; }
.line-success { color: #34D399; }
.line-text { color: #94A3B8; }
.line-cursor { color: var(--accent-cyan); animation: blink 1s step-end infinite; display: inline-block; }
.terminal-metrics {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.75rem;
  margin-top: 1.25rem;
}
.metric-tile {
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: 10px;
  padding: 0.85rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}
.metric-label {
  font-size: 0.7rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-family: var(--font-mono);
}
.metric-value {
  font-family: var(--font-mono);
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-primary);
  font-variant-numeric: tabular-nums;
}
.metric-value.good { color: var(--accent-emerald); }
@media (max-width: 768px) {
  .hero-section { padding: 5.5rem 1.25rem 3rem; }
  .terminal-metrics { grid-template-columns: repeat(2,1fr); }
  .scenario-tabs { gap: 0.4rem; }
  .scenario-tab { font-size: 0.7rem; padding: 0.3rem 0.65rem; }
}
"""
with open(os.path.join(components_dir, "Hero.css"), "w", encoding="utf-8") as f:
    f.write(hero_css_content)

# 11. src/components/Experience.jsx
experience_jsx_content = """import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Zap, Clock, Users } from 'lucide-react';
import './Experience.css';

const impactStats = [
  { icon: TrendingUp, value: '30–40%', label: 'Cloud-Cost Reduction', sub: 'FinOps multi-agent + HITL governance' },
  { icon: Zap,        value: '60% / 75%', label: 'Retrieval Accuracy / Latency', sub: 'Evaluation-gated RAG release workflows' },
  { icon: Clock,      value: '85%',    label: 'Latency Cut', sub: 'Agentic deep-research report compilation' },
  { icon: Users,      value: '50%',    label: 'Fewer Support Requests', sub: 'Knowledge ingestion across 400+ OpenAPI specs' },
];

const experiences = [
  {
    company: 'Neurals.in',
    role: 'Forward Deployed AI Engineer',
    domain: 'FinOps Automation',
    period: 'April 2025 – Present',
    location: 'Remote',
    bullets: [
      'Architected an enterprise FinOps multi-agent orchestration platform using LangGraph, enabling automated cloud cost analysis, anomaly detection, and governance.',
      'Implemented stateful cyclic graph state machines with human-in-the-loop approvals for resource adjustments, leading to 30–40% cloud cost reductions.',
      'Developed Optimiser Agent: autonomous FinOps optimizer executing rolling z-score anomaly detection on CSV billing logs and generating auto-scaling plans.',
      'Engineered Research Agent: deep-research analyst using web search tools to compile market reports, reducing latency by 85%.',
      'Resolved high-concurrency event loop bottlenecks and memory leaks under heavy concurrent query loads.',
    ],
    stack: ['Python', 'FastAPI', 'LangGraph', 'OpenAI', 'Ollama', 'Kubernetes', 'Docker', 'Terraform', 'MCP'],
  },
  {
    company: 'Safe Security',
    role: 'Platform Engineer',
    domain: 'CRQM · CyberSecurity',
    period: 'August 2023 – March 2025',
    location: 'Bangalore, India',
    bullets: [
      'Designed and built the backend microservice architecture for Safex, a multi-tenant GenAI assistant with enterprise RAG pipelines for complex security semantic queries.',
      'Developed custom FAISS index tuning, hierarchical document chunking algorithms, and cross-encoder re-ranking models, raising query precision by 60% and cutting latency by 75%.',
      'Engineered async data ingestion microservices (FastAPI) parsing and indexing high-volume OpenAPI 3.0 specs and unstructured data into semantic clusters.',
      'Built automated AI evaluation suites measuring groundedness, hallucination risk, and citation accuracy before production releases.',
    ],
    stack: ['Python', 'FAISS', 'ChromaDB', 'LlamaIndex', 'LangChain', 'OpenAI', 'FastAPI', 'OpenAPI', 'PostgreSQL'],
  },
  {
    company: 'Harness.io',
    role: 'Platform Engineer',
    domain: 'DevOps · ML · AI',
    period: 'March 2021 – July 2023',
    location: 'Bangalore, India',
    bullets: [
      'Designed and built containerized CI/CD infrastructure executing 1,000+ builds per day on Kubernetes clusters (EKS, GKE).',
      'Developed custom GitOps automation triggers, Terraform templates, and Helm charts for multi-cloud deployments.',
      'Created cloud cost-monitoring tooling and automated policy checks using Open Policy Agent (OPA) for secure resource provisioning.',
      'Delivered the developer platform from beta to GA in 3 months working across engineering and platform teams.',
    ],
    stack: ['Kubernetes', 'Docker', 'Terraform', 'Jenkins', 'AWS', 'GCP', 'GitHub Actions', 'Helm', 'OPA'],
  },
  {
    company: 'McAfee',
    role: 'Software Engineer',
    domain: 'Cloud Security',
    period: 'November 2018 – April 2021',
    location: 'Bangalore, India',
    bullets: [
      'Developed security middleware and policy enforcement engines for McAfee CASB, intercepting and inspecting enterprise SaaS data streams.',
      'Wrote high-throughput REST APIs (Java/Python) and background worker queues managing customer tenant synchronization and IAM compliance.',
      'Optimized microservice communication overhead by implementing gRPC streaming and caching mechanisms.',
    ],
    stack: ['Java', 'Python', 'gRPC', 'REST APIs', 'IAM', 'CASB'],
  },
  {
    company: 'KanTime',
    role: 'Software Engineer',
    domain: 'Healthcare · SaaS',
    period: 'December 2015 – November 2018',
    location: 'Bangalore, India',
    bullets: [
      'Designed and developed scalable backend API modules for a healthcare SaaS platform using Java, Spring Boot, and PostgreSQL.',
      'Optimized slow-running queries, redesigned complex relational tables, and implemented Redis caching to reduce query latency by 40%.',
      'Engineered secure, HIPAA-compliant XML/JSON billing integration adapters communicating with external healthcare clearinghouse gateways.',
    ],
    stack: ['Java', 'Spring Boot', 'PostgreSQL', 'Redis', 'XML', 'JSON', 'HIPAA'],
  },
];

export default function Experience() {
  return (
    <div className="experience-section">
      <div className="section-header">
        <span className="section-label">// Work History</span>
        <h2 className="section-title">Experience</h2>
      </div>

      <div className="exp-impact-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '3rem' }}>
        {impactStats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="impact-tile glass-panel" style={{ padding: '1rem', borderRadius: '12px' }}>
              <Icon size={20} className="impact-icon" style={{ color: 'var(--accent-cyan)' }} />
              <div className="impact-value" style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0.5rem 0 0.25rem' }}>{stat.value}</div>
              <div className="impact-metric-label" style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 500 }}>{stat.label}</div>
              <div className="impact-sub" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{stat.sub}</div>
            </div>
          );
        })}
      </div>

      <div className="timeline">
        {experiences.map((exp, i) => (
          <motion.div
            key={i}
            className="timeline-entry"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="timeline-dot" />
            <div className="timeline-card glass-panel" style={{ width: '100%', padding: '1.5rem', borderRadius: '12px' }}>
              <div className="timeline-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div className="timeline-left">
                  <div className="timeline-company">{exp.company}</div>
                  <div className="timeline-role">{exp.role}</div>
                </div>
                <div className="timeline-right">
                  <div className="timeline-period">{exp.period}</div>
                  <div className="timeline-location">{exp.location}</div>
                </div>
              </div>
              <ul className="timeline-bullets">
                {exp.bullets.map((b, j) => (
                  <li key={j}>{b}</li>
                ))}
              </ul>
              <div className="timeline-stack" style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '1rem' }}>
                {exp.stack?.map(t => <span key={t} className="stack-pill">{t}</span>)}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
"""
with open(os.path.join(components_dir, "Experience.jsx"), "w", encoding="utf-8") as f:
    f.write(experience_jsx_content)

# 12. src/components/Experience.css
experience_css_content = """.experience-section {
  padding: 5rem 2.5rem;
}
.timeline {
  border-left: 1px solid var(--border-subtle);
  margin-left: 5px;
}
.timeline-entry {
  display: flex;
  gap: 1.5rem;
  padding: 0 0 2.5rem 1.75rem;
  position: relative;
}
.timeline-dot {
  position: absolute;
  left: -5px;
  top: 6px;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--accent-violet);
  border: 2px solid var(--bg-canvas);
}
.timeline-card {
  transition: all 0.3s ease;
  border-left: 2px solid transparent;
}
.timeline-card:hover {
  border-left-color: var(--accent-violet);
  box-shadow: 0 8px 30px rgba(99,102,241,0.1);
  transform: translateX(4px);
}
.timeline-company {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-primary);
}
.timeline-role {
  font-size: 0.85rem;
  color: var(--accent-cyan);
  font-family: var(--font-mono);
}
.timeline-period {
  font-size: 0.78rem;
  color: var(--text-muted);
  font-family: var(--font-mono);
  text-align: right;
}
.timeline-location {
  font-size: 0.75rem;
  color: var(--text-muted);
  text-align: right;
}
.timeline-bullets {
  margin: 0;
  padding: 0;
}
.timeline-bullets li {
  font-size: 0.88rem;
  color: var(--text-secondary);
  line-height: 1.65;
  margin-bottom: 0.4rem;
  list-style: none;
  position: relative;
  padding-left: 1rem;
}
.timeline-bullets li::before {
  content: '▸';
  color: var(--accent-violet);
  position: absolute;
  left: 0;
}
.stack-pill {
  font-size: 0.72rem;
  font-family: var(--font-mono);
  background: rgba(99,102,241,0.08);
  border: 1px solid rgba(99,102,241,0.15);
  border-radius: 4px;
  padding: 0.15rem 0.5rem;
  color: var(--accent-violet);
}
@media (max-width: 600px) {
  .experience-section { padding: 4rem 1.25rem; }
  .timeline-header { flex-direction: column; align-items: flex-start; }
  .timeline-period, .timeline-location { text-align: left; }
}
"""
with open(os.path.join(components_dir, "Experience.css"), "w", encoding="utf-8") as f:
    f.write(experience_css_content)

print("Second batch of files generated.")
