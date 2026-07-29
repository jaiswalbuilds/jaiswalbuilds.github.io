import React, { useState, useRef } from 'react';
import { Calendar, MapPin, ChevronLeft, ChevronRight, TrendingUp, Zap, Clock, Users } from 'lucide-react';
import { motion, useMotionValue, useAnimation } from 'framer-motion';
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
    logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://neurals.in&size=128',
    role: 'Forward Deployed AI Engineer',
    domain: 'FinOps Automation',
    period: 'April 2025 – Present',
    location: 'Remote',
    context: 'Early-stage, fast-moving team building enterprise FinOps automation for cloud cost governance and anomaly detection.',
    ownership: 'Owned agent orchestration layer, cost-analysis workflows, release reliability, and HITL approval flow.',
    leadership: 'Drove technical design, incident debugging, and rollout coordination for agentic workflows.',
    description: [
      'Architected an enterprise FinOps multi-agent orchestration platform using LangGraph, enabling automated cloud cost analysis, anomaly detection, and governance.',
      'Implemented stateful cyclic graph state machines with human-in-the-loop approvals for resource adjustments, leading to 30–40% cloud cost reductions.',
      'Developed Optimiser Agent: autonomous FinOps optimizer executing rolling z-score anomaly detection on CSV billing logs and generating auto-scaling plans.',
      'Engineered Research Agent: deep-research analyst using web search tools to compile market reports, reducing latency by 85%.',
      'Resolved high-concurrency event loop bottlenecks and memory leaks under heavy concurrent query loads.',
    ],
    tech: ['Python', 'FastAPI', 'LangGraph', 'OpenAI', 'Ollama', 'Kubernetes', 'Docker', 'Terraform', 'MCP'],
  },
  {
    company: 'Safe Security',
    logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://safe.security&size=128',
    role: 'Platform Engineer',
    domain: 'CRQM · CyberSecurity',
    period: 'August 2023 – March 2025',
    location: 'Bangalore, India',
    context: 'Enterprise security platform team shipping multi-tenant GenAI and RAG capabilities for security workflows.',
    ownership: 'Owned retrieval quality, ingestion microservices, chunking/ranking logic, and AI evaluation gates.',
    leadership: 'Coordinated with security, product, and platform stakeholders to harden releases and improve quality standards.',
    description: [
      'Designed and built the backend microservice architecture for Safex, a multi-tenant GenAI assistant with enterprise RAG pipelines for complex security semantic queries.',
      'Developed custom FAISS index tuning, hierarchical document chunking algorithms, and cross-encoder re-ranking models, raising query precision by 60% and cutting latency by 75%.',
      'Engineered async data ingestion microservices (FastAPI) parsing and indexing high-volume OpenAPI 3.0 specs and unstructured data into semantic clusters.',
      'Built automated AI evaluation suites measuring groundedness, hallucination risk, and citation accuracy before production releases.',
    ],
    tech: ['Python', 'FAISS', 'ChromaDB', 'LlamaIndex', 'LangChain', 'OpenAI', 'FastAPI', 'OpenAPI', 'PostgreSQL'],
  },
  {
    company: 'Harness.io',
    logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://harness.io&size=128',
    role: 'Platform Engineer',
    domain: 'DevOps · ML · AI',
    period: 'March 2021 – July 2023',
    location: 'Bangalore, India',
    context: 'Platform engineering supporting internal developer productivity across Kubernetes-based multi-cloud build infrastructure.',
    ownership: 'Owned CI/CD automation, GitOps templates, Terraform/Helm delivery patterns, and policy enforcement logic.',
    leadership: 'Helped take the developer platform from beta to GA in 3 months across core engineering and platform stakeholders.',
    description: [
      'Designed and built containerized CI/CD infrastructure executing 1,000+ builds per day on Kubernetes clusters (EKS, GKE).',
      'Developed custom GitOps automation triggers, Terraform templates, and Helm charts for multi-cloud deployments.',
      'Created cloud cost-monitoring tooling and automated policy checks using Open Policy Agent (OPA) for secure resource provisioning.',
      'Delivered the developer platform from beta to GA in 3 months working across engineering and platform teams.',
    ],
    tech: ['Kubernetes', 'Docker', 'Terraform', 'Jenkins', 'AWS', 'GCP', 'GitHub Actions', 'Helm', 'OPA'],
  },
  {
    company: 'McAfee',
    logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://mcafee.com&size=128',
    role: 'Software Engineer',
    domain: 'Cloud Security',
    period: 'November 2018 – April 2021',
    location: 'Bangalore, India',
    context: 'Enterprise Cloud Access Security Broker platform intercepting and inspecting SaaS data streams for Fortune 500 tenants.',
    ownership: 'Owned security middleware, IAM compliance pipelines, and tenant synchronization workers.',
    leadership: '',
    description: [
      'Developed security middleware and policy enforcement engines for McAfee CASB, intercepting and inspecting enterprise SaaS data streams.',
      'Wrote high-throughput REST APIs (Java/Python) and background worker queues managing customer tenant synchronization and IAM compliance.',
      'Optimized microservice communication overhead by implementing gRPC streaming and caching mechanisms.',
    ],
    tech: ['Java', 'Python', 'gRPC', 'REST APIs', 'IAM', 'CASB'],
  },
  {
    company: 'KanTime',
    logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://kantime.com&size=128',
    role: 'Software Engineer',
    domain: 'Healthcare · SaaS',
    period: 'December 2015 – November 2018',
    location: 'Bangalore, India',
    context: 'Large-scale healthcare SaaS platform serving enterprise healthcare providers across the US.',
    ownership: 'Owned backend API modules, database optimization, and HIPAA-compliant billing integrations.',
    leadership: '',
    description: [
      'Designed and developed scalable backend API modules for a healthcare SaaS platform using Java, Spring Boot, and PostgreSQL.',
      'Optimized slow-running queries, redesigned complex relational tables, and implemented Redis caching to reduce query latency by 40%.',
      'Engineered secure, HIPAA-compliant XML/JSON billing integration adapters communicating with external healthcare clearinghouse gateways.',
    ],
    tech: ['Java', 'Spring Boot', 'PostgreSQL', 'Redis', 'XML', 'JSON', 'HIPAA'],
  },
];

const CARD_WIDTH_PERCENT = 0.65;
const CARD_GAP = 32;

const Experience = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);
  const x = useMotionValue(0);
  const controls = useAnimation();

  const getCardWidth = () => {
    if (!containerRef.current) return 600;
    return containerRef.current.offsetWidth * CARD_WIDTH_PERCENT;
  };

  const getOffset = (index) => {
    const cardWidth = getCardWidth();
    const containerWidth = containerRef.current ? containerRef.current.offsetWidth : window.innerWidth;
    return (containerWidth / 2) - (cardWidth / 2) - index * (cardWidth + CARD_GAP);
  };

  const snapToIndex = (index) => {
    const clamped = Math.max(0, Math.min(experiences.length - 1, index));
    setActiveIndex(clamped);
    controls.start({
      x: getOffset(clamped),
      transition: { type: 'spring', stiffness: 300, damping: 35, mass: 0.8 },
    });
  };

  const handleDragEnd = (_, info) => {
    setIsDragging(false);
    const cardWidth = getCardWidth();
    const threshold = cardWidth * 0.2;
    const velocity = info.velocity.x;
    if (velocity < -300 || info.offset.x < -threshold) snapToIndex(activeIndex + 1);
    else if (velocity > 300 || info.offset.x > threshold) snapToIndex(activeIndex - 1);
    else snapToIndex(activeIndex);
  };

  return (
    <section id="experience" className="experience-section">
      <div className="container">

        {/* Section heading */}
        <motion.h2
          className="section-title text-gradient"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Professional Experience
        </motion.h2>

        {/* Impact Banner */}
        <div className="impact-banner">
          <p className="impact-label">⚡ Impact Driven</p>
          <div className="impact-grid">
            {impactStats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={i}
                  className="impact-tile glass-panel"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Icon size={20} className="impact-icon" />
                  <span className="impact-value">{stat.value}</span>
                  <span className="impact-metric-label">{stat.label}</span>
                  <span className="impact-sub">{stat.sub}</span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Carousel header row */}
        <div className="section-header-row">
          <p className="exp-subtitle">Drag to explore · Click a card to focus</p>
          <div className="slider-controls">
            <button
              onClick={() => snapToIndex(activeIndex - 1)}
              className="slider-btn"
              disabled={activeIndex === 0}
              style={{ opacity: activeIndex === 0 ? 0.3 : 1 }}
              aria-label="Previous"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => snapToIndex(activeIndex + 1)}
              className="slider-btn"
              disabled={activeIndex === experiences.length - 1}
              style={{ opacity: activeIndex === experiences.length - 1 ? 0.3 : 1 }}
              aria-label="Next"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Dot indicators */}
        <div className="slider-dots">
          {experiences.map((_, i) => (
            <button
              key={i}
              className={`slider-dot ${i === activeIndex ? 'active' : ''}`}
              onClick={() => snapToIndex(i)}
              aria-label={`Go to card ${i + 1}`}
            />
          ))}
        </div>

        {/* Drag track */}
        <div ref={containerRef} className="experience-slider-wrapper">
          <motion.div
            className="experience-track"
            drag="x"
            dragElastic={0.08}
            dragMomentum={false}
            animate={controls}
            style={{ x }}
            initial={{ x: 0 }}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={handleDragEnd}
          >
            {experiences.map((exp, index) => {
              const isActive = index === activeIndex;
              const distance = Math.abs(index - activeIndex);
              return (
                <motion.div
                  key={index}
                  className="experience-card glass-panel"
                  onClick={() => { if (!isDragging && !isActive) snapToIndex(index); }}
                  animate={{
                    scale: isActive ? 1.04 : Math.max(0.82, 1 - distance * 0.09),
                    opacity: isActive ? 1 : Math.max(0.28, 1 - distance * 0.38),
                    filter: isActive
                      ? 'grayscale(0%) blur(0px)'
                      : `grayscale(${Math.min(90, distance * 55)}%) blur(${distance * 0.8}px)`,
                    y: isActive ? -12 : distance * 6,
                    zIndex: isActive ? 10 : Math.max(0, 5 - distance),
                  }}
                  transition={{ type: 'spring', stiffness: 320, damping: 32 }}
                  style={{
                    cursor: isActive ? 'grab' : 'pointer',
                    boxShadow: isActive
                      ? '0 30px 80px rgba(123, 97, 255, 0.35), 0 0 0 1px rgba(123, 97, 255, 0.4)'
                      : '0 4px 20px rgba(0,0,0,0.2)',
                    border: isActive
                      ? '1px solid rgba(123, 97, 255, 0.5)'
                      : '1px solid var(--glass-border)',
                  }}
                >
                  {/* Card header */}
                  <div className="exp-card-header">
                    {exp.logo && (
                      <img
                        src={exp.logo}
                        alt={`${exp.company} logo`}
                        className="exp-card-logo"
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    )}
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <h3 className="exp-card-role">{exp.role}</h3>
                        <span className="domain-badge">{exp.domain}</span>
                      </div>
                      <div className="exp-card-company">{exp.company}</div>
                    </div>
                  </div>

                  {/* Meta */}
                  <div className="exp-card-meta">
                    <span className="meta-item"><Calendar size={13} style={{ flexShrink: 0 }} /> {exp.period}</span>
                    <span className="meta-item"><MapPin size={13} style={{ flexShrink: 0 }} /> {exp.location}</span>
                  </div>

                  {/* Context / Ownership / Leadership callouts */}
                  <div className="callout-row">
                    <div className="callout"><span className="callout-label">Context</span>{exp.context}</div>
                    <div className="callout"><span className="callout-label">Ownership</span>{exp.ownership}</div>
                    {exp.leadership && <div className="callout"><span className="callout-label">Leadership</span>{exp.leadership}</div>}
                  </div>

                  {/* Bullet achievements */}
                  <ul className="exp-card-bullets">
                    {exp.description.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>

                  {/* Tech pills */}
                  <div className="tech-pills">
                    {exp.tech.map((t, i) => (
                      <span key={i} className="tech-pill">{t}</span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default Experience;
