import React from 'react';
import './Resume.css';
import { Mail, Globe, Download, ArrowLeft, Phone } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Resume = ({ onBack }) => {
  return (
    <div className="resume-overlay">
      <div className="resume-actions no-print">
        <button onClick={onBack} className="btn btn-outline btn-sm" style={{ padding: '0.4rem 0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <ArrowLeft size={14} /> Back to Site
        </button>
        <button onClick={() => window.print()} className="btn btn-primary btn-sm" style={{ padding: '0.4rem 0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Download size={14} /> Download PDF
        </button>
      </div>

      <div className="resume-paper" id="resume-content">
        <header className="resume-header">
          <h1>Manish Jaiswal</h1>
          <h2 className="tagline">AI Engineer · ML Systems · Agentic AI · LLMs</h2>
          <div className="contact-info">
            <span><Mail size={12} /> jaiswalmanish060@gmail.com</span>
            <span><Phone size={12} /> (+91) 8015973380</span>
            <span><Globe size={12} /> manishjaiswal.in</span>
            <span><FaLinkedin size={12} /> linkedin.com/in/manish-kumar-74ab6210a</span>
            <span><FaGithub size={12} /> github.com/jaiswalbuilds</span>
          </div>
        </header>

        <section className="resume-section">
          <h3>Professional Summary</h3>
          <p className="summary-text">
            AI Engineer with <strong>10+ years</strong> experience building production ML systems and Agentic AI pipelines. Expert in RAG, multi-agent orchestration, and MLOps at cloud scale. Currently optimizing LLM inference on <strong>SambaNova stacks</strong> and translating enterprise requirements into production AI.
          </p>
        </section>

        <div className="resume-grid">
          <div className="resume-left">
            <section className="resume-section">
              <h3>Professional Experience</h3>
              
              <div className="experience-item">
                <div className="exp-header">
                  <strong>Neurals.in</strong>
                  <span>Jan 2026 — Present</span>
                </div>
                <div className="exp-sub">AI Engineer — Inference & Forward Deployment (Contract)</div>
                <ul className="exp-list">
                  <li>Optimizing AI inference pipelines on <strong>SambaNova custom accelerators</strong>.</li>
                  <li>Translating enterprise use cases into production-ready AI solutions.</li>
                  <li>Driving LLM optimization, prompt engineering, and quality evaluation tooling.</li>
                </ul>
              </div>

              <div className="experience-item">
                <div className="exp-header">
                  <strong>Safe Security</strong>
                  <span>Aug 2023 — Feb 2026</span>
                </div>
                <div className="exp-sub">AI Platform Engineer — LLM Systems, RAG & API Infrastructure</div>
                <ul className="exp-list">
                  <li><strong>Led Safex:</strong> GenAI assistant with <strong>60% accuracy gain</strong> and <strong>75% latency reduction</strong>.</li>
                  <li>Built Python ML pipelines for risk scoring and threat intelligence.</li>
                  <li>Deployed Agentic workflows with multi-step reasoning and memory management.</li>
                  <li>Owned 400+ REST APIs; reduced developer friction by 50%.</li>
                </ul>
              </div>

              <div className="experience-item">
                <div className="exp-header">
                  <strong>Harness.io</strong>
                  <span>Mar 2021 — Jul 2023</span>
                </div>
                <div className="exp-sub">DevOps & Platform Engineer — CI/CD & Cloud Infrastructure</div>
                <ul className="exp-list">
                  <li>Built CI/CD pipelines for K8s deployments across GCP/AWS/JFrog.</li>
                  <li>Developed internal automation to reduce manual overhead and improve release quality.</li>
                </ul>
              </div>

              <div className="experience-item">
                <div className="exp-header">
                  <strong>Arcana Network · Marlin · 1Kosmos</strong>
                  <span>2018 — 2021</span>
                </div>
                <div className="exp-sub">AI SDK & Developer Platform Engineer</div>
                <ul className="exp-list">
                  <li>Built Python/TS SDKs and automated CI/CD for decentralized AI infrastructure.</li>
                  <li>Developed Solidity smart contracts for on-chain coordination patterns.</li>
                </ul>
              </div>
            </section>

            <section className="resume-section">
              <h3>Featured Projects</h3>
              <div className="project-item"><strong>Interview Agent:</strong> Multi-turn LLM system with adaptive scoring.</div>
              <div className="project-item"><strong>Safex Assistant:</strong> RAG-based LLM with 60% accuracy gain.</div>
              <div className="project-item"><strong>FinOps AI:</strong> Agentic cloud cost optimization across AWS/GCP.</div>
            </section>
          </div>

          <div className="resume-right">
            <section className="resume-section">
              <h3>Key Achievements</h3>
              <div className="achievement-grid">
                <div className="achievement-badge">60% Accuracy</div>
                <div className="achievement-badge">75% Speedup</div>
                <div className="achievement-badge">400+ APIs</div>
                <div className="achievement-badge">50% Support↓</div>
              </div>
            </section>

            <section className="resume-section">
              <h3>Core ML Stack</h3>
              <div className="skill-group">
                <strong>GenAI & RAG</strong>
                <p>LangChain, LlamaIndex, CrewAI, Agentic AI, RAG, Prompt Eng.</p>
              </div>
              <div className="skill-group">
                <strong>Deep Learning</strong>
                <p>PyTorch, TensorFlow, Transformers, Fine-tuning, ONNX</p>
              </div>
              <div className="skill-group">
                <strong>Data Science</strong>
                <p>NumPy, Pandas, Scikit-learn, SciPy, Matplotlib</p>
              </div>
              <div className="skill-group">
                <strong>Infra & Vector</strong>
                <p>Docker, K8s, Terraform, FAISS, Pinecone, Chroma, AWS, GCP</p>
              </div>
            </section>

            <section className="resume-section">
              <h3>Certifications</h3>
              <p className="edu-text">AI Engineer 2025 · DevOps MasterClass · Solidity · OpenAPI</p>
            </section>

            <section className="resume-section">
              <h3>Education</h3>
              <p className="edu-text"><strong>B.Tech — CSE</strong><br/>Vel Tech University · CGPA 7.34</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
