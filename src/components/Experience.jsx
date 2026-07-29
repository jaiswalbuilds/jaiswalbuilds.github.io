import React, { useState } from 'react';
import { Calendar, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
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
      "Implemented stateful cyclic graph state machines with human-in-the-loop approvals for resource adjustments, leading to 30-40% cloud cost reductions.",
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
      "Designed and implemented secure cloud integration workflows for McAfee CASB (Cloud Access Security Broker) and IAM systems.",
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

const Experience = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const slideLeft = () => {
    setActiveIndex((prev) => Math.max(0, prev - 1));
  };

  const slideRight = () => {
    setActiveIndex((prev) => Math.min(experiences.length - 1, prev + 1));
  };

  return (
    <section id="experience" className="experience-section">
      <div className="container">
        <div className="section-header-row">
          <h2 className="section-title text-gradient" style={{ margin: 0 }}>
            Professional Experience
          </h2>
          <div className="slider-controls">
            <button 
              onClick={slideLeft} 
              className="slider-btn" 
              disabled={activeIndex === 0}
              style={{ opacity: activeIndex === 0 ? 0.3 : 1, cursor: activeIndex === 0 ? 'default' : 'pointer' }}
              aria-label="Slide Left"
              title="Slide Left"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={slideRight} 
              className="slider-btn" 
              disabled={activeIndex === experiences.length - 1}
              style={{ opacity: activeIndex === experiences.length - 1 ? 0.3 : 1, cursor: activeIndex === experiences.length - 1 ? 'default' : 'pointer' }}
              aria-label="Slide Right"
              title="Slide Right"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="experience-slider-wrapper">
          <div 
            className="experience-track"
            style={{
              transform: `translateX(calc(50% - var(--card-width-half) - (${activeIndex} * (var(--card-width) + var(--card-gap)))))`
            }}
          >
            {experiences.map((exp, index) => {
              const isActive = index === activeIndex;
              return (
                <div 
                  key={index} 
                  className={`experience-card glass-panel ${isActive ? 'active' : 'inactive'}`}
                  onClick={() => {
                    if (!isActive) {
                      setActiveIndex(index);
                    }
                  }}
                >
                  <div className="exp-card-header">
                    {exp.logo && (
                      <img 
                        src={exp.logo} 
                        alt={`${exp.company} logo`} 
                        className="exp-card-logo"
                        onError={(e) => { e.target.style.display = 'none' }}
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
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
