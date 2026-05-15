import React from 'react';
import './Resume.css';
import { Mail, Github, Linkedin, Globe, Download, ArrowLeft } from 'lucide-react';

const Resume = ({ onBack }) => {
  return (
    <div className="resume-overlay">
      <div className="resume-actions no-print">
        <button onClick={onBack} className="btn btn-outline btn-sm" style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ArrowLeft size={16} /> Back to Site
        </button>
        <button onClick={() => window.print()} className="btn btn-primary btn-sm" style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Download size={16} /> Download PDF
        </button>
      </div>

      <div className="resume-paper" id="resume-content">
        {/* Header */}
        <header className="resume-header">
          <div className="header-content">
            <h1>Manish Jaiswal</h1>
            <h2 style={{ color: '#3b82f6' }}>AI Engineer | Agentic AI Specialist</h2>
            <div className="contact-grid">
              <span><Mail size={14} /> jaiswalmanish060@gmail.com</span>
              <span><Globe size={14} /> jaiswalbuilds.github.io</span>
              <span><Linkedin size={14} /> linkedin.com/in/manish-kumar-74ab6210a</span>
              <span><Github size={14} /> github.com/jaiswalbuilds</span>
            </div>
          </div>
        </header>

        <div className="resume-body">
          {/* Left Column */}
          <aside className="resume-sidebar">
            <section>
              <h3>Core Expertise</h3>
              <ul className="skills-list">
                <li><strong>LLMs:</strong> GPT-4o, Claude 3.5, Gemini 1.5</li>
                <li><strong>Agents:</strong> CrewAI, LangChain, ReAct Patterns</li>
                <li><strong>RAG:</strong> LlamaIndex, ChromaDB, FAISS</li>
                <li><strong>Engineering:</strong> Python, PyTorch, Node.js</li>
                <li><strong>MLOps:</strong> Docker, Kubernetes, CI/CD</li>
              </ul>
            </section>

            <section>
              <h3>AI Masterpieces</h3>
              <div className="resume-project">
                <strong>FinOps Cost Optimizer</strong>
                <p>Agentic RAG system for autonomous cloud cost optimization.</p>
              </div>
              <div className="resume-project">
                <strong>Autonomous Interviewer</strong>
                <p>Adaptive LLM interviewer with evaluation logic.</p>
              </div>
              <div className="resume-project">
                <strong>Cyber Threat Intel Agent</strong>
                <p>MITRE ATT&CK correlation engine for incidents.</p>
              </div>
            </section>

            <section>
              <h3>Education</h3>
              <p style={{ fontSize: '0.85rem' }}><strong>B.Tech in Computer Science</strong><br/>Vel Tech University</p>
            </section>
          </aside>

          {/* Right Column */}
          <main className="resume-main">
            <section>
              <h3>Executive Summary</h3>
              <p>
                AI Engineer with <strong>10+ years</strong> of experience building production ML systems and Agentic AI pipelines. 
                Founder of <strong>Neurals.in</strong>. Specialized in transforming complex enterprise requirements into 
                scalable AI solutions. Proven record in improving model accuracy by 60% and reducing costs by 40%.
              </p>
            </section>

            <section>
              <h3>Professional Experience</h3>
              
              <div className="job">
                <div className="job-header">
                  <strong>Neurals.in</strong>
                  <span>2023 — Present</span>
                </div>
                <div className="job-sub">Founding AI Engineer</div>
                <ul>
                  <li>Architected 10 specialized AI agents for automated FinOps and cloud governance.</li>
                  <li>Implemented RAG pipelines reducing operational cloud spend by 30-40% for enterprise clients.</li>
                  <li>Developed multi-agent orchestration systems using CrewAI and LangChain.</li>
                </ul>
              </div>

              <div className="job">
                <div className="job-header">
                  <strong>Safe Security</strong>
                  <span>2023 — 2025</span>
                </div>
                <div className="job-sub">AI Technical Writer / Agent Trainer</div>
                <ul>
                  <li>Trained and optimized "Safex" AI agent, increasing accuracy from 40% to 60%.</li>
                  <li>Optimized 400+ API docs using LLM-driven automation, reducing support tickets by 30%.</li>
                  <li>Implemented RAG systems for real-time cybersecurity threat intelligence mapping.</li>
                </ul>
              </div>

              <div className="job">
                <div className="job-header">
                  <strong>Harness.io</strong>
                  <span>2021 — 2023</span>
                </div>
                <div className="job-sub">Senior Technical Writer (AI/ML)</div>
                <ul>
                  <li>Led documentation for CI Enterprise from Beta to GA within 3 months.</li>
                  <li>Built automated CI/CD pipelines for developer documentation at scale.</li>
                </ul>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Resume;
