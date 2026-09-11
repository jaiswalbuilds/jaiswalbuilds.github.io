import React, { useState } from 'react';
import { ExternalLink, ChevronDown, ChevronUp, Cpu, Video, Play } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import './Projects.css';

import safexImg from '../assets/safex_dashboard_1778827701816.png';
import interviewImg from '../assets/llm_interview_agent_1778827717107.png';

const agents = [
  {
    id: '01',
    title: 'FinOps Cost Optimizer Agent',
    emoji: '💰',
    description: 'Agentic RAG system that analyzes cloud cost data, detects spending anomalies with z-score analysis, and generates LLM-powered optimization recommendations.',
    tags: ['LangChain', 'FAISS', 'ReAct Agent', 'Anomaly Detection'],
    architecture: 'CSV Cost Data → FAISS Embeddings → ReAct Agent (Anomaly + Spend tools) → LLM Reasoning → Recommendations',
    domain: 'FinOps',
    image: null,
    github: 'https://github.com/jaiswalbuilds/jaiswalbuilds.github.io/tree/main/agents/01_finops_cost_optimizer',
  },
  {
    id: '02',
    title: 'Cybersecurity Threat Intel Agent',
    emoji: '🛡️',
    description: 'RAG-powered agent that correlates incident IOCs against a MITRE ATT&CK knowledge base and auto-generates incident response playbooks.',
    tags: ['RAG', 'FAISS', 'MITRE ATT&CK', 'LangChain'],
    architecture: 'Incident IOCs → FAISS Threat KB → RAG Retrieval → LLM Correlation → IR Playbook',
    domain: 'Cybersecurity',
    image: safexImg,
    github: 'https://github.com/jaiswalbuilds/jaiswalbuilds.github.io/tree/main/agents/02_cybersec_threat_intel',
  },
  {
    id: '03',
    title: 'Enterprise RAG Assistant (Safex)',
    emoji: '🧠',
    description: 'Production-style RAG assistant that indexes enterprise documents, enables semantic Q&A, and returns cited answers — the architecture behind Safex at Safe Security.',
    tags: ['ChromaDB', 'LlamaIndex', 'RetrievalQA', 'Citations'],
    architecture: 'Documents → Chunking → ChromaDB Embeddings → RetrievalQAWithSources → LLM → Answer + Citations',
    domain: 'Enterprise AI',
    image: safexImg,
    github: 'https://github.com/jaiswalbuilds/jaiswalbuilds.github.io/tree/main/agents/03_enterprise_rag_assistant',
  },
  {
    id: '04',
    title: 'Autonomous LLM Interview Agent',
    emoji: '🎙️',
    description: 'Multi-turn agentic interviewer with conversation memory, adaptive question difficulty, and a structured JSON evaluation pipeline scoring candidates on 4 dimensions.',
    tags: ['ConversationMemory', 'LangChain', 'Evaluation', 'Multi-turn'],
    architecture: 'Role Config → System Prompt → ConversationChain (Memory) → 5-turn Interview Loop → JSON Evaluator → Score Report',
    domain: 'HR Tech / AI',
    image: interviewImg,
    github: 'https://github.com/jaiswalbuilds/jaiswalbuilds.github.io/tree/main/agents/04_llm_interview_agent',
  },
  {
    id: '05',
    title: 'AI Deep Research Analyst',
    emoji: '🔍',
    description: 'Autonomous agent that uses DuckDuckGo web search iteratively to research a topic, synthesizes findings, and produces structured reports at configurable depth.',
    tags: ['ReAct Agent', 'DuckDuckGo', 'Web Search', 'Report Generation'],
    architecture: 'Query → ReAct Agent → Web Search (DuckDuckGo) → Multi-step Reasoning → Synthesized Report',
    domain: 'Research',
    image: null,
    github: 'https://github.com/jaiswalbuilds/jaiswalbuilds.github.io/tree/main/agents/05_ai_research_analyst',
  },
  {
    id: '06',
    title: 'Multi-Agent FinOps Team',
    emoji: '🤝',
    description: 'Three specialized CrewAI agents collaborate sequentially: Cost Analyst → Optimization Strategist → Executive Report Writer — each handing off findings to the next.',
    tags: ['CrewAI', 'Multi-agent', 'Sequential Process', 'FinOps'],
    architecture: 'Cloud Config → [Cost Analyst Agent] → [Optimizer Agent] → [Writer Agent] → Executive Report',
    domain: 'FinOps / Multi-agent',
    image: null,
    github: 'https://github.com/jaiswalbuilds/jaiswalbuilds.github.io/tree/main/agents/06_multi_agent_finops_team',
  },
  {
    id: '07',
    title: 'Autonomous Code Reviewer',
    emoji: '🔧',
    description: 'AI agent with AST-based static analysis tools that reviews Python code for SQL injection, hardcoded secrets, O(n²) complexity, and best practice violations.',
    tags: ['AST Analysis', 'ReAct Agent', 'Security', 'Python'],
    architecture: 'Code Input → AST Tools (Security + Complexity) → ReAct Agent → LLM Review → Structured Report + Fixes',
    domain: 'DevSecOps',
    image: null,
    github: 'https://github.com/jaiswalbuilds/jaiswalbuilds.github.io/tree/main/agents/07_autonomous_code_reviewer',
  },
  {
    id: '08',
    title: 'MCP Knowledge Base Agent',
    emoji: '♾️',
    description: 'Multi-source knowledge agent with MCP-style tool routing across internal docs (FAISS), real-time web search, and API status monitoring — unified into one answer.',
    tags: ['MCP Pattern', 'FAISS', 'Tool Routing', 'Multi-source RAG'],
    architecture: 'Query → Intent → Tool Router → [Internal FAISS | Web Search | API Monitor] → Synthesized Answer',
    domain: 'Knowledge Management',
    image: null,
    github: 'https://github.com/jaiswalbuilds/jaiswalbuilds.github.io/tree/main/agents/08_mcp_knowledge_agent',
  },
  {
    id: '09',
    title: 'ML Pipeline Monitor Agent',
    emoji: '📡',
    description: 'Monitors ML model accuracy, data drift (z-score), and latency SLAs across all deployed models — agent auto-generates remediation runbooks on degradation.',
    tags: ['MLOps', 'Drift Detection', 'ReAct Agent', 'Monitoring'],
    architecture: 'Metrics Feed → Anomaly Tools (Drift + Perf + Latency) → ReAct Agent → LLM → Remediation Runbook',
    domain: 'MLOps',
    image: null,
    github: 'https://github.com/jaiswalbuilds/jaiswalbuilds.github.io/tree/main/agents/09_pipeline_monitor_agent',
  },
  {
    id: '10',
    title: 'Document Intelligence Agent',
    emoji: '📄',
    description: 'Multi-document RAG agent that ingests multiple files, builds a unified FAISS index, and answers cross-document questions with source citations.',
    tags: ['Multi-doc RAG', 'FAISS', 'Citations', 'LangChain'],
    architecture: 'Multi-doc Upload → Chunking → FAISS Unified Index → RetrievalQAWithSources → Cited Cross-doc Answers',
    domain: 'Enterprise AI',
    image: null,
    github: 'https://github.com/jaiswalbuilds/jaiswalbuilds.github.io/tree/main/agents/10_document_intelligence_agent',
  },
];

const domainColors = {
  'FinOps': '#06b6d4',
  'Cybersecurity': '#ef4444',
  'Enterprise AI': '#8b5cf6',
  'HR Tech / AI': '#3b82f6',
  'Research': '#f59e0b',
  'FinOps / Multi-agent': '#06b6d4',
  'DevSecOps': '#10b981',
  'Knowledge Management': '#8b5cf6',
  'MLOps': '#f97316',
};

const AgentCard = ({ agent }) => {
  const [expanded, setExpanded] = useState(false);
  const color = domainColors[agent.domain] || '#3b82f6';

  return (
    <motion.div 
      layout
      className={`agent-card glass-panel ${expanded ? 'expanded' : ''}`}
      whileHover={{ scale: 1.02, translateY: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="agent-card-top">
        {agent.image && (
          <div className="agent-img-container">
            <img src={agent.image} alt={agent.title} className="agent-img" />
          </div>
        )}
        <div className="agent-card-header">
          <div className="agent-number-row">
            <span className="agent-id">Agent {agent.id}</span>
            <span className="agent-domain" style={{ color, borderColor: color, background: `${color}15` }}>
              {agent.domain}
            </span>
          </div>
          <h3 className="agent-title">
            <span className="agent-emoji">{agent.emoji}</span> {agent.title}
          </h3>
          <p className="agent-description">{agent.description}</p>
          <div className="agent-tags">
            {agent.tags.map((tag, i) => (
              <span key={i} className="tag">{tag}</span>
            ))}
          </div>
        </div>
      </div>

      <button className="expand-btn" onClick={() => setExpanded(!expanded)}>
        <Cpu size={16} />
        {expanded ? 'Hide Architecture' : 'View Architecture'}
        {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="architecture-panel"
            style={{ overflow: 'hidden' }}
          >
            <div className="architecture-flow">
              {agent.architecture.split('→').map((step, i, arr) => (
                <React.Fragment key={i}>
                  <div className="arch-step" style={{ borderColor: `${color}50`, background: `${color}08` }}>
                    {step.trim()}
                  </div>
                  {i < arr.length - 1 && <div className="arch-arrow" style={{ color }}>→</div>}
                </React.Fragment>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="agent-links">
        <a href={agent.github} target="_blank" rel="noopener noreferrer" className="agent-link-btn">
          <FaGithub size={16} /> View Code
        </a>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [filter, setFilter] = useState('All');
  const domains = ['All', ...new Set(agents.map(a => a.domain))];
  const filtered = filter === 'All' ? agents : agents.filter(a => a.domain === filter);

  return (
    <section id="projects" className="projects-section">
      <div className="bg-gradient-glow" style={{ top: '10%', right: '-15%' }}></div>
      <div className="container">
        <motion.h2 
          className="section-title text-gradient"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          AI Engineering Masterpieces
        </motion.h2>
        <motion.p 
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          10 production-ready AI agents — clone, customize, and ship. Each with full source code and architecture.
        </motion.p>

        <motion.div 
          className="github-cta glass-panel"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div>
            <strong>⭐ All agents are open source</strong>
            <span> — clone the repo and run any agent in 3 commands</span>
          </div>
          <a href="https://github.com/jaiswalbuilds/jaiswalbuilds.github.io/tree/main/agents"
             target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            <FaGithub size={18} /> Browse All Agents
          </a>
        </motion.div>

        <div className="filter-row">
          {domains.map(d => (
            <button key={d} className={`filter-btn ${filter === d ? 'active' : ''}`} onClick={() => setFilter(d)}>
              {d}
            </button>
          ))}
        </div>

        {/* ── Featured Video Project ── */}
        <motion.div
          className="featured-video-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
          <div className="featured-video-header">
            <span className="featured-badge">
              <Play size={12} /> Featured · In Action
            </span>
            <h3 className="featured-video-title">Deterministic AI Claims Automation with Human Oversight</h3>
            <p className="featured-video-desc">
              End-to-end agentic insurance claims engine built with LangGraph — deterministic state machines,
              human-in-the-loop approval gates, and full audit trails. Reduces claims processing time by 60%.
            </p>
            <div className="featured-tags">
              {['LangGraph', 'Human-in-the-Loop', 'State Machine', 'Insurance', 'Deterministic AI'].map(t => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
          </div>
          <div className="featured-video-embed-wrapper">
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
              <iframe
                src="https://www.loom.com/embed/501465a4829742c4a8d275ad03dafb51"
                frameBorder="0"
                webkitallowfullscreen="true"
                mozallowfullscreen="true"
                allowFullScreen
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', borderRadius: '10px' }}
                title="Deterministic AI Claims Automation"
              />
            </div>
          </div>
          <div className="featured-video-footer">
            <a
              href="https://github.com/jaiswalbuilds/agentic-insurance-claims-engine"
              target="_blank"
              rel="noopener noreferrer"
              className="agent-link-btn featured-github-btn"
            >
              <FaGithub size={16} /> View on GitHub
            </a>
          </div>
        </motion.div>

        <motion.div layout className="agents-grid">
          <AnimatePresence mode="popLayout">
            {filtered.map(agent => <AgentCard key={agent.id} agent={agent} />)}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
