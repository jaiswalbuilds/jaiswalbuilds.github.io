import os

workspace_dir = r"C:\Users\jaisw\OneDrive\GitHub\jaiswalbuilds.github.io"
src_dir = os.path.join(workspace_dir, "src")
components_dir = os.path.join(src_dir, "components")

# 13. src/components/Projects.jsx
projects_jsx_content = """import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import './Projects.css';

import safexImg from '../assets/safex_dashboard_1778827701816.png';
import interviewImg from '../assets/llm_interview_agent_1778827717107.png';

const agents = [
  {
    id: '01',
    title: 'FinOps Cost Optimizer Agent',
    description: 'Agentic RAG system that analyzes cloud cost data, detects spending anomalies with z-score analysis, and generates LLM-powered optimization recommendations.',
    tags: ['LangChain', 'FAISS', 'ReAct Agent', 'Anomaly Detection'],
    architecture: 'CSV Cost Data → FAISS Embeddings → ReAct Agent (Anomaly + Spend tools) → LLM Reasoning → Recommendations',
    domain: 'FinOps',
    github: 'https://github.com/jaiswalbuilds/jaiswalbuilds.github.io/tree/main/agents/01_finops_cost_optimizer',
  },
  {
    id: '02',
    title: 'Cybersecurity Threat Intel Agent',
    description: 'RAG-powered agent that correlates incident IOCs against a MITRE ATT&CK knowledge base and auto-generates incident response playbooks.',
    tags: ['RAG', 'FAISS', 'MITRE ATT&CK', 'LangChain'],
    architecture: 'Incident IOCs → FAISS Threat KB → RAG Retrieval → LLM Correlation → IR Playbook',
    domain: 'Cybersecurity',
    github: 'https://github.com/jaiswalbuilds/jaiswalbuilds.github.io/tree/main/agents/02_cybersec_threat_intel',
  },
  {
    id: '03',
    title: 'Enterprise RAG Assistant (Safex)',
    description: 'Production-style RAG assistant that indexes enterprise documents, enables semantic Q&A, and returns cited answers — the architecture behind Safex at Safe Security.',
    tags: ['ChromaDB', 'LlamaIndex', 'RetrievalQA', 'Citations'],
    architecture: 'Documents → Chunking → ChromaDB Embeddings → RetrievalQAWithSources → LLM → Answer + Citations',
    domain: 'Enterprise AI',
    github: 'https://github.com/jaiswalbuilds/jaiswalbuilds.github.io/tree/main/agents/03_enterprise_rag_assistant',
  },
  {
    id: '04',
    title: 'Autonomous LLM Interview Agent',
    description: 'Multi-turn agentic interviewer with conversation memory, adaptive question difficulty, and a structured JSON evaluation pipeline scoring candidates on 4 dimensions.',
    tags: ['ConversationMemory', 'LangChain', 'Evaluation', 'Multi-turn'],
    architecture: 'Role Config → System Prompt → ConversationChain (Memory) → 5-turn Interview Loop → JSON Evaluator → Score Report',
    domain: 'HR Tech / AI',
    github: 'https://github.com/jaiswalbuilds/jaiswalbuilds.github.io/tree/main/agents/04_llm_interview_agent',
  },
  {
    id: '05',
    title: 'AI Deep Research Analyst',
    description: 'Autonomous agent that uses DuckDuckGo web search iteratively to research a topic, synthesizes findings, and produces structured reports at configurable depth.',
    tags: ['ReAct Agent', 'DuckDuckGo', 'Web Search', 'Report Generation'],
    architecture: 'Query → ReAct Agent → Web Search (DuckDuckGo) → Multi-step Reasoning → Synthesized Report',
    domain: 'Research',
    github: 'https://github.com/jaiswalbuilds/jaiswalbuilds.github.io/tree/main/agents/05_ai_research_analyst',
  },
  {
    id: '06',
    title: 'Multi-Agent FinOps Team',
    description: 'Three specialized CrewAI agents collaborate sequentially: Cost Analyst → Optimization Strategist → Executive Report Writer — each handing off findings to the next.',
    tags: ['CrewAI', 'Multi-agent', 'Sequential Process', 'FinOps'],
    architecture: 'Cloud Config → [Cost Analyst Agent] → [Optimizer Agent] → [Writer Agent] → Executive Report',
    domain: 'FinOps / Multi-agent',
    github: 'https://github.com/jaiswalbuilds/jaiswalbuilds.github.io/tree/main/agents/06_multi_agent_finops_team',
  },
  {
    id: '07',
    title: 'Autonomous Code Reviewer',
    description: 'AI agent with AST-based static analysis tools that reviews Python code for SQL injection, hardcoded secrets, O(n²) complexity, and best practice violations.',
    tags: ['AST Analysis', 'ReAct Agent', 'Security', 'Python'],
    architecture: 'Code Input → AST Tools (Security + Complexity) → ReAct Agent → LLM Review → Structured Report + Fixes',
    domain: 'DevSecOps',
    github: 'https://github.com/jaiswalbuilds/jaiswalbuilds.github.io/tree/main/agents/07_autonomous_code_reviewer',
  },
  {
    id: '08',
    title: 'MCP Knowledge Base Agent',
    description: 'Multi-source knowledge agent with MCP-style tool routing across internal docs (FAISS), real-time web search, and API status monitoring — unified into one answer.',
    tags: ['MCP Pattern', 'FAISS', 'Tool Routing', 'Multi-source RAG'],
    architecture: 'Query → Intent → Tool Router → [Internal FAISS | Web Search | API Monitor] → Synthesized Answer',
    domain: 'Knowledge Management',
    github: 'https://github.com/jaiswalbuilds/jaiswalbuilds.github.io/tree/main/agents/08_mcp_knowledge_agent',
  },
  {
    id: '09',
    title: 'ML Pipeline Monitor Agent',
    description: 'Monitors ML model accuracy, data drift (z-score), and latency SLAs across all deployed models — agent auto-generates remediation runbooks on degradation.',
    tags: ['MLOps', 'Drift Detection', 'ReAct Agent', 'Monitoring'],
    architecture: 'Metrics Feed → Anomaly Tools (Drift + Perf + Latency) → ReAct Agent → LLM → Remediation Runbook',
    domain: 'MLOps',
    github: 'https://github.com/jaiswalbuilds/jaiswalbuilds.github.io/tree/main/agents/09_pipeline_monitor_agent',
  },
  {
    id: '10',
    title: 'Document Intelligence Agent',
    description: 'Multi-document RAG agent that ingests multiple files, builds a unified FAISS index, and answers cross-document questions with source citations.',
    tags: ['Multi-doc RAG', 'FAISS', 'Citations', 'LangChain'],
    architecture: 'Multi-doc Upload → Chunking → FAISS Unified Index → RetrievalQAWithSources → Cited Cross-doc Answers',
    domain: 'Enterprise AI',
    github: 'https://github.com/jaiswalbuilds/jaiswalbuilds.github.io/tree/main/agents/10_document_intelligence_agent',
  },
];

export default function Projects() {
  const [filter, setFilter] = useState('All');
  const domains = ['All', ...new Set(agents.map(a => a.domain))];
  const filtered = filter === 'All' ? agents : agents.filter(a => a.domain === filter);

  return (
    <div className="projects-section">
      <div className="section-header">
        <span className="section-label">// Portfolio</span>
        <h2 className="section-title">Projects</h2>
      </div>

      <div className="filter-row" style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        {domains.map(d => (
          <button 
            key={d} 
            className={`filter-btn ${filter === d ? 'active' : ''}`} 
            onClick={() => setFilter(d)}
            style={{
              padding: '0.4rem 1rem',
              borderRadius: '20px',
              border: filter === d ? '1px solid var(--accent-cyan)' : '1px solid var(--border-subtle)',
              background: filter === d ? 'rgba(6,182,212,0.1)' : 'transparent',
              color: filter === d ? 'var(--accent-cyan)' : 'var(--text-muted)',
              cursor: 'pointer',
              fontSize: '0.8rem',
              fontFamily: 'var(--font-mono)'
            }}
          >
            {d}
          </button>
        ))}
      </div>

      <div className="featured-project">
        <div className="featured-label">Featured · In Action</div>
        <h3 style={{ margin: '0 0 1rem', fontSize: '1.25rem' }}>Deterministic AI Claims Automation</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
          End-to-end agentic insurance claims engine built with LangGraph — deterministic state machines, human-in-the-loop approval gates, and full audit trails.
        </p>
        
        <div className="featured-cols">
          <div>
            <div className="featured-col-label">Problem</div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Manual claims processing is slow and error-prone. Traditional LLMs are too non-deterministic for insurance payouts.</p>
          </div>
          <div>
            <div className="featured-col-label">Architecture</div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>LangGraph StateGraph → Extraction Agent → Policy Validator (Rules engine) → HITL Approval Node → Settlement API.</p>
          </div>
          <div>
            <div className="featured-col-label">Impact</div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Reduces claims processing time by 60%. Achieves 99% accuracy in policy validation through deterministic gating.</p>
          </div>
        </div>
        
        <div style={{ marginTop: '1.5rem' }}>
          <a href="https://github.com/jaiswalbuilds/agentic-insurance-claims-engine" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>
            <FaGithub size={14} style={{ marginRight: '6px' }} /> View on GitHub
          </a>
        </div>
      </div>

      <div className="projects-grid card-group">
        <AnimatePresence>
          {filtered.map(agent => (
            <motion.div 
              key={agent.id}
              className="project-card"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              layout
            >
              <h4 className="project-title">{agent.title}</h4>
              <p className="project-desc">{agent.description}</p>
              <div className="project-stack">
                {agent.tags.map(t => <span key={t} className="project-pill">{t}</span>)}
              </div>
              <div className="project-links" style={{ marginTop: '0.5rem' }}>
                <a href={agent.github} target="_blank" rel="noopener noreferrer" className="project-link">
                  <FaGithub size={14} /> View Code
                </a>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
"""
with open(os.path.join(components_dir, "Projects.jsx"), "w", encoding="utf-8") as f:
    f.write(projects_jsx_content)

# 14. src/components/Projects.css
projects_css_content = """.projects-section { padding: 5rem 2.5rem; }

.featured-project {
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
  transition: border-color 0.3s ease;
}
.featured-project:hover { border-color: var(--border-hover); }

.featured-label {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--accent-amber);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  margin-bottom: 0.75rem;
}

.featured-cols {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border-subtle);
}

.featured-col-label {
  font-size: 0.72rem;
  font-family: var(--font-mono);
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 0.5rem;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.project-card {
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.25s ease;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.project-card:hover {
  border-color: var(--border-hover);
  transform: translateY(-3px);
  box-shadow: 0 12px 32px rgba(99,102,241,0.12);
}

.project-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.project-desc {
  font-size: 0.85rem;
  color: var(--text-secondary);
  line-height: 1.6;
  flex: 1;
  margin: 0;
}

.project-stack { display: flex; flex-wrap: wrap; gap: 0.4rem; }

.project-pill {
  font-size: 0.7rem;
  font-family: var(--font-mono);
  background: rgba(6,182,212,0.08);
  border: 1px solid rgba(6,182,212,0.15);
  border-radius: 4px;
  padding: 0.15rem 0.5rem;
  color: var(--accent-cyan);
}

.project-links { display: flex; gap: 0.75rem; }

.project-link {
  font-size: 0.8rem;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  gap: 0.3rem;
  transition: color 0.2s ease;
  min-height: 44px;
  text-decoration: none;
}
.project-link:hover { color: var(--accent-cyan); }

@media (max-width: 768px) {
  .projects-section { padding: 4rem 1.25rem; }
  .projects-grid { grid-template-columns: 1fr; }
  .featured-cols { grid-template-columns: 1fr; }
}
"""
with open(os.path.join(components_dir, "Projects.css"), "w", encoding="utf-8") as f:
    f.write(projects_css_content)

# 15. src/components/Skills.jsx
skills_jsx_content = """import React from 'react';
import './Skills.css';

const STACK_LAYERS = [
  {
    category: 'Agentic Orchestration',
    icon: '🤖',
    color: 'var(--accent-violet)',
    skills: ['LangGraph', 'LangChain', 'LlamaIndex', 'CrewAI', 'AutoGen', 'MCP']
  },
  {
    category: 'LLM Serving & Gateway',
    icon: '⚡',
    color: 'var(--accent-cyan)',
    skills: ['OpenAI', 'Anthropic', 'Gemini', 'Ollama', 'LiteLLM', 'AWS Bedrock']
  },
  {
    category: 'Vector & Storage',
    icon: '🗄️',
    color: 'var(--accent-emerald)',
    skills: ['FAISS', 'Pinecone', 'ChromaDB', 'Qdrant', 'pgvector', 'Redis']
  },
  {
    category: 'Evaluation & Observability',
    icon: '📊',
    color: 'var(--accent-amber)',
    skills: ['LangSmith', 'Ragas', 'TruLens', 'Arize Phoenix', 'OpenTelemetry']
  },
  {
    category: 'Cloud & Infrastructure',
    icon: '☁️',
    color: '#60A5FA',
    skills: ['AWS', 'GCP', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions']
  },
  {
    category: 'Languages & APIs',
    icon: '💻',
    color: '#F472B6',
    skills: ['Python', 'FastAPI', 'SQL', 'Java', 'REST', 'GraphQL']
  },
];

export default function Skills() {
  return (
    <div className="skills-section">
      <div className="section-header">
        <span className="section-label">// Stack</span>
        <h2 className="section-title">Technical Skills</h2>
      </div>

      <div className="skills-grid">
        {STACK_LAYERS.map((layer, idx) => (
          <div key={idx} className="skill-layer">
            <div className="skill-layer-header">
              <span className="skill-layer-icon">{layer.icon}</span>
              <span className="skill-layer-name" style={{ color: layer.color }}>{layer.category}</span>
            </div>
            <div className="skill-pills">
              {layer.skills.map(skill => (
                <span key={skill} className="skill-pill">{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
"""
with open(os.path.join(components_dir, "Skills.jsx"), "w", encoding="utf-8") as f:
    f.write(skills_jsx_content)

# 16. src/components/Skills.css
skills_css_content = """.skills-section { padding: 5rem 2.5rem; }

.skills-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.skill-layer {
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: 12px;
  padding: 1.25rem 1.5rem;
  transition: border-color 0.2s ease;
}

.skill-layer:hover { border-color: var(--border-hover); }

.skill-layer-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.85rem;
}

.skill-layer-icon { font-size: 1rem; }

.skill-layer-name {
  font-size: 0.78rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-secondary);
  font-family: var(--font-mono);
}

.skill-pills { display: flex; flex-wrap: wrap; gap: 0.4rem; }

.skill-pill {
  font-size: 0.75rem;
  font-family: var(--font-mono);
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  color: var(--text-secondary);
  transition: all 0.2s ease;
}

.skill-pill:hover {
  background: rgba(255,255,255,0.08);
  color: var(--text-primary);
}

@media (max-width: 1200px) { .skills-grid { grid-template-columns: repeat(2,1fr); } }
@media (max-width: 600px) {
  .skills-section { padding: 4rem 1.25rem; }
  .skills-grid { grid-template-columns: 1fr; }
}
"""
with open(os.path.join(components_dir, "Skills.css"), "w", encoding="utf-8") as f:
    f.write(skills_css_content)

# 17. src/components/Footer.jsx
footer_jsx_content = """import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { Mail } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <span className="footer-copy">© {new Date().getFullYear()} Manish Jaiswal · Built with React + Vite</span>
        <div className="footer-links">
          <a href="https://github.com/jaiswalbuilds" target="_blank" rel="noopener noreferrer" className="footer-link">
            <FaGithub size={16} />
          </a>
          <a href="https://www.linkedin.com/in/manish-kumar-74ab6210a/" target="_blank" rel="noopener noreferrer" className="footer-link">
            <FaLinkedin size={16} />
          </a>
          <a href="mailto:jaiswalmanish060@gmail.com" className="footer-link">
            <Mail size={16} />
          </a>
          <span className="footer-badge">🟢 Open to FDE Roles</span>
        </div>
      </div>
    </footer>
  );
}
"""
with open(os.path.join(components_dir, "Footer.jsx"), "w", encoding="utf-8") as f:
    f.write(footer_jsx_content)

# 18. src/components/Footer.css
footer_css_content = """.footer {
  border-top: 1px solid var(--border-subtle);
  padding: 1.5rem 2.5rem;
}
.footer-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
}
.footer-copy { font-size: 0.8rem; color: var(--text-muted); font-family: var(--font-mono); }
.footer-links { display: flex; align-items: center; gap: 1rem; }
.footer-link { color: var(--text-muted); transition: color 0.2s ease; min-height: 44px; display: flex; align-items: center; text-decoration: none; }
.footer-link:hover { color: var(--accent-cyan); }
.footer-badge { font-size: 0.78rem; color: var(--accent-emerald); font-family: var(--font-mono); }
"""
with open(os.path.join(components_dir, "Footer.css"), "w", encoding="utf-8") as f:
    f.write(footer_css_content)

print("Third batch of files generated.")
