import React from 'react';
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
