import React from 'react';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
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
  return (
    <section id="experience" className="experience-section">
      <div className="container">
        <h2 className="section-title text-gradient">Professional Experience</h2>
        
        <div className="timeline">
          {experiences.map((exp, index) => (
            <div key={index} className="timeline-item glass-panel">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <div className="exp-header-wrapper" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  {exp.logo && (
                    <img 
                      src={exp.logo} 
                      alt={`${exp.company} logo`} 
                      style={{ width: '2rem', height: '2rem', objectFit: 'contain', backgroundColor: 'white', borderRadius: '4px', padding: '2px', flexShrink: 0 }}
                      onError={(e) => { e.target.style.display = 'none' }}
                    />
                  )}
                  <div>
                    <h3 className="exp-role" style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600 }}>{exp.role}</h3>
                    <div className="exp-company" style={{ opacity: 0.8, fontSize: '0.95rem' }}>{exp.company}</div>
                  </div>
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
