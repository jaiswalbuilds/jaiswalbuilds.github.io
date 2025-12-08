import React from 'react';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import './Experience.css';

const experiences = [
  {
    company: 'Neurals.in',
    role: 'AI Engineer — Inference & Forward Deployment',
    period: 'Jan 2026 – Present',
    location: 'Remote / India',
    description: [
      "Contributing to AI inference pipeline configuration and optimisation on custom AI accelerator stacks.",
      "Translating enterprise customer use cases into production-ready AI solutions across complex environments.",
      "Driving LLM pipeline optimisation, prompt engineering, structured output schemas, and response quality evaluation using Python-based tooling.",
      "Collaborating with engineering and customer success teams to accelerate enterprise AI adoption."
    ]
  },
  {
    company: 'Safe Security',
    role: 'AI Platform Engineer — LLM Systems, RAG & API Infra',
    period: 'Aug 2023 – Feb 2026',
    location: 'Bangalore, India',
    description: [
      "Led full-stack engineering of Safex, an in-house GenAI assistant using RAG over enterprise ML docs with FAISS, vector embeddings, and LLM inference.",
      "Improved query accuracy by 60% and reduced latency by 75% through embedding optimisation and retrieval re-ranking.",
      "Designed and deployed Agentic AI workflows with multi-step reasoning, memory management, and structured output schemas.",
      "Owned 400+ REST APIs on OpenAPI/Swagger and reduced developer friction by 50%."
    ]
  },
  {
    company: 'Harness.io',
    role: 'DevOps & Platform Engineer — CI/CD & Cloud Infra',
    period: 'Mar 2021 – Jul 2023',
    location: 'Bangalore, India',
    description: [
      "Built and owned CI/CD pipeline configurations for containerised builds, Kubernetes deployments, and multi-cloud artifact delivery.",
      "Developed internal automation tooling to reduce manual engineering overhead and improve release quality.",
      "Contributed to beta-to-GA delivery of the DevSecOps platform within 3 months."
    ]
  },
  {
    company: 'Arcana Network · Marlin Protocol · 1Kosmos',
    role: 'AI SDK & Developer Platform Engineer',
    period: '2018 – 2021',
    location: 'Remote',
    description: [
      "Built Python and TypeScript SDKs, REST API integrations, and automated CI/CD pipelines for Web3 and decentralised storage.",
      "Contributed to decentralised AI compute infrastructure at Marlin, including data pipelines and workload distribution."
    ]
  }
];

const Experience = () => {
  return (
    <section id="experience" className="experience-section">
      <div className="container">
        <h2 className="section-title text-gradient">Professional Experience</h2>
        
        <div className="timeline">
          {experiences.map((exp, index) => (
            <div key={index} className="timeline-item glass-panel">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <div className="exp-header">
                  <h3 className="exp-role">{exp.role}</h3>
                  <div className="exp-company">{exp.company}</div>
                </div>
                
                <div className="exp-meta">
                  <span className="meta-item"><Calendar size={16} /> {exp.period}</span>
                  <span className="meta-item"><MapPin size={16} /> {exp.location}</span>
                </div>
                
                <ul className="exp-description">
                  {exp.description.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;

// Refactored update: 2025-11-17 check

// Refactored update: 2025-11-24 check

// Refactored update: 2025-11-26 check

// Refactored update: 2025-12-08 check
