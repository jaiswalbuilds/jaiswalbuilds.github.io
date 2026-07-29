import React, { useState, useRef } from 'react';
import { Calendar, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, useMotionValue, useAnimation } from 'framer-motion';
import './Experience.css';

const experiences = [
  {
    company: 'Neurals.in',
    logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://neurals.in&size=128',
    role: 'Founding AI Engineer',
    period: 'April 2025 – Present',
    location: 'Remote',
    description: [
      "Architected an enterprise FinOps multi-agent orchestration platform using LangGraph, enabling automated cloud cost analysis, anomaly detection, and governance.",
      "Implemented stateful cyclic graph state machines with human-in-the-loop approvals for resource adjustments, leading to 30–40% cloud cost reductions.",
      "Developed Agent 01, an autonomous FinOps optimizer executing rolling z-score anomaly detection on CSV billing logs.",
      "Engineered Agent 05, a deep-research analyst utilizing web search tools to compile market reports, reducing compilation latency by 85%."
    ]
  },
  {
    company: 'Safe Security',
    logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://safe.security&size=128',
    role: 'AI Platform Engineer — LLM Systems & RAG Infra',
    period: 'August 2023 – March 2025',
    location: 'Bangalore, India',
    description: [
      "Led engineering of Safex, an in-house GenAI assistant using RAG (LangChain + LlamaIndex + FAISS) with 60% accuracy gains and 75% latency cuts.",
      "Built automated AI evaluation suites measuring groundedness, hallucination risk, and citation accuracy before production releases.",
      "Engineered high-throughput knowledge ingestion pipelines and managed 400+ REST API integrations."
    ]
  },
  {
    company: 'Harness.io',
    logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://harness.io&size=128',
    role: 'DevOps & Platform Engineer',
    period: 'March 2021 – July 2023',
    location: 'Bangalore, India',
    description: [
      "Built cloud-native CI/CD pipelines for Kubernetes workloads across AWS and GCP environments.",
      "Automated release engineering workflows using Docker, Terraform, and GitHub Actions, reducing release cycle time."
    ]
  },
  {
    company: 'McAfee',
    logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://mcafee.com&size=128',
    role: 'Cloud Security Platform Engineer',
    period: 'November 2018 – April 2021',
    location: 'Bangalore, India',
    description: [
      "Designed and implemented secure cloud integration workflows for McAfee CASB and IAM systems.",
      "Automated end-to-end integration test suites and API validation frameworks to secure production deployments."
    ]
  },
  {
    company: 'KanTime',
    logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://kantime.com&size=128',
    role: 'Software Engineer',
    period: 'December 2015 – November 2018',
    location: 'Bangalore, India',
    description: [
      "Developed healthcare SaaS platform backend and features utilizing Java, SQL, and XML schemas.",
      "Collaborated with core engineering teams on code debugging, functional validation, and hotfix deployments."
    ]
  }
];

const CARD_WIDTH_PERCENT = 0.65; // 65% of container
const CARD_GAP = 32; // px

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
    // Center the active card
    return (containerWidth / 2) - (cardWidth / 2) - index * (cardWidth + CARD_GAP);
  };

  const snapToIndex = (index) => {
    const clamped = Math.max(0, Math.min(experiences.length - 1, index));
    setActiveIndex(clamped);
    controls.start({
      x: getOffset(clamped),
      transition: { type: 'spring', stiffness: 300, damping: 35, mass: 0.8 }
    });
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = (_, info) => {
    setIsDragging(false);
    const cardWidth = getCardWidth();
    const threshold = cardWidth * 0.2; // 20% card width to trigger a slide
    const velocity = info.velocity.x;

    if (velocity < -300 || info.offset.x < -threshold) {
      snapToIndex(activeIndex + 1);
    } else if (velocity > 300 || info.offset.x > threshold) {
      snapToIndex(activeIndex - 1);
    } else {
      // Snap back to current
      snapToIndex(activeIndex);
    }
  };

  return (
    <section id="experience" className="experience-section">
      <div className="container">
        <div className="section-header-row">
          <motion.h2
            className="section-title text-gradient"
            style={{ margin: 0 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Professional Experience
          </motion.h2>
          <div className="slider-controls">
            <button
              onClick={() => snapToIndex(activeIndex - 1)}
              className="slider-btn"
              disabled={activeIndex === 0}
              style={{ opacity: activeIndex === 0 ? 0.3 : 1, cursor: activeIndex === 0 ? 'default' : 'pointer' }}
              aria-label="Previous"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => snapToIndex(activeIndex + 1)}
              className="slider-btn"
              disabled={activeIndex === experiences.length - 1}
              style={{ opacity: activeIndex === experiences.length - 1 ? 0.3 : 1, cursor: activeIndex === experiences.length - 1 ? 'default' : 'pointer' }}
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

        {/* Drag slider */}
        <div ref={containerRef} className="experience-slider-wrapper">
          <motion.div
            className="experience-track"
            drag="x"
            dragElastic={0.08}
            dragMomentum={false}
            animate={controls}
            style={{ x }}
            initial={{ x: 0 }}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onViewportBoxUpdate={() => {}}
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
                    zIndex: isActive ? 10 : Math.max(0, 5 - distance)
                  }}
                  transition={{ type: 'spring', stiffness: 320, damping: 32 }}
                  style={{
                    cursor: isActive ? 'grab' : 'pointer',
                    boxShadow: isActive
                      ? '0 30px 80px rgba(123, 97, 255, 0.35), 0 0 0 1px rgba(123, 97, 255, 0.4)'
                      : '0 4px 20px rgba(0,0,0,0.2)',
                    border: isActive
                      ? '1px solid rgba(123, 97, 255, 0.5)'
                      : '1px solid var(--glass-border)'
                  }}
                >
                  <div className="exp-card-header">
                    {exp.logo && (
                      <img
                        src={exp.logo}
                        alt={`${exp.company} logo`}
                        className="exp-card-logo"
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    )}
                    <div>
                      <h3 className="exp-card-role">{exp.role}</h3>
                      <div className="exp-card-company">{exp.company}</div>
                    </div>
                  </div>

                  <div className="exp-card-meta">
                    <span className="meta-item"><Calendar size={14} style={{ flexShrink: 0 }} /> {exp.period}</span>
                    <span className="meta-item"><MapPin size={14} style={{ flexShrink: 0 }} /> {exp.location}</span>
                  </div>

                  <ul className="exp-card-bullets">
                    {exp.description.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
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
