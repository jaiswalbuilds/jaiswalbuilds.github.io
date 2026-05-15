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
        {/* Header Section */}
        <header className="resume-header">
          <div className="header-main">
            <h1>Manish Jaiswal</h1>
            <h2 className="tagline">AI Engineer · ML Systems · Agentic AI · LLMs</h2>
            <div className="contact-info">
              <span><Mail size={12} /> jaiswalmanish060@gmail.com</span>
              <span><Phone size={12} /> (+91) 8015973380</span>
              <span><Globe size={12} /> manishjaiswal.in</span>
              <span><FaLinkedin size={12} /> linkedin.com/in/manish-kumar-74ab6210a</span>
              <span><FaGithub size={12} /> github.com/jaiswalbuilds</span>
            </div>
          </div>
        </header>

        <section className="resume-section">
          <h3>Professional Summary</h3>
          <p className="summary-text">
            AI Engineer with <strong>10+ years</strong> experience building production ML systems, Agentic AI pipelines, and LLM-driven solutions across cybersecurity, FinOps, Web3, and enterprise AI. Expert in RAG pipelines, multi-agent orchestration, and MLOps at cloud scale. Currently driving AI inference optimization on custom AI accelerator stacks and translating complex enterprise requirements into production-ready AI systems.
          </p>
        </section>

        <div className="resume-grid">
          {/* Main Content Column */}
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
                  <li>Contributing to AI inference pipeline configuration and optimization on <strong>SambaNova's custom AI accelerator stack</strong>.</li>
                  <li>Translating enterprise customer use cases into production-ready AI solutions across complex environments.</li>
                  <li>Driving LLM pipeline optimization, prompt engineering, structured output schemas, and response quality evaluation.</li>
                  <li>Collaborating with engineering and customer success teams to accelerate enterprise AI adoption.</li>
                </ul>
              </div>

              <div className="experience-item">
                <div className="exp-header">
                  <strong>Safe Security</strong>
                  <span>Aug 2023 — Feb 2026</span>
                </div>
                <div className="exp-sub">AI Platform Engineer — LLM Systems, RAG & API Infrastructure</div>
                <ul className="exp-list">
                  <li><strong>Led full-stack engineering of Safex:</strong> In-house GenAI assistant using RAG over enterprise ML docs with FAISS, achieving <strong>60% accuracy gain</strong> and <strong>75% latency reduction</strong>.</li>
                  <li>Built Python ML pipelines using Pandas, NumPy, and Scikit-learn for risk scoring and anomaly detection.</li>
                  <li>Designed Agentic AI workflows with multi-step reasoning, memory management, and structured output schemas.</li>
                  <li>Owned 400+ REST APIs on OpenAPI/Swagger; reduced developer friction by 50%.</li>
                </ul>
              </div>

              <div className="experience-item">
                <div className="exp-header">
                  <strong>Harness.io</strong>
                  <span>Mar 2021 — Jul 2023</span>
                </div>
                <div className="exp-sub">DevOps & Platform Engineer — CI/CD & Cloud Infrastructure</div>
                <ul className="exp-list">
                  <li>Built CI/CD pipeline configurations for containerized builds and Kubernetes deployments across GCP/AWS.</li>
                  <li>Developed internal automation tooling to reduce manual engineering overhead and improve release quality.</li>
                  <li>Contributed to beta-to-GA delivery of the DevSecOps platform within 3 months.</li>
                </ul>
              </div>

              <div className="experience-item">
                <div className="exp-header">
                  <strong>Arcana Network · Marlin · 1Kosmos</strong>
                  <span>2018 — 2021</span>
                </div>
                <div className="exp-sub">AI SDK & Developer Platform Engineer</div>
                <ul className="exp-list">
                  <li>Built Python and TypeScript SDKs, REST API integrations, and automated CI/CD pipelines.</li>
                  <li>Contributed to decentralized AI compute infrastructure, workload distribution, and node monitoring.</li>
                  <li>Developed EVM smart contracts in Solidity for on-chain coordination patterns.</li>
                </ul>
              </div>
            </section>
          </div>

          {/* Sidebar Column */}
          <div className="resume-right">
            <section className="resume-section">
              <h3>Key Achievements</h3>
              <div className="achievement-badge"><strong>60%</strong> Accuracy Gain (RAG)</div>
              <div className="achievement-badge"><strong>75%</strong> Latency Reduction</div>
              <div className="achievement-badge"><strong>400+</strong> REST APIs Owned</div>
              <div className="achievement-badge"><strong>50%</strong> Query Reduction</div>
            </section>

            <section className="resume-section">
              <h3>Core ML Stack</h3>
              <div className="skill-group">
                <strong>GenAI & Orchestration</strong>
                <p>LangChain, LlamaIndex, CrewAI, AutoGen, Agentic AI, RAG, Prompt Engineering</p>
              </div>
              <div className="skill-group">
                <strong>Deep Learning</strong>
                <p>PyTorch, TensorFlow, Hugging Face, Transformers, Fine-tuning, ONNX</p>
              </div>
              <div className="skill-group">
                <strong>Data Science</strong>
                <p>NumPy, Pandas, Scikit-learn, Matplotlib, SciPy, Jupyter</p>
              </div>
              <div className="skill-group">
                <strong>Infrastructure</strong>
                <p>Docker, K8s, Terraform, FAISS, Pinecone, ChromaDB, AWS, GCP, Azure</p>
              </div>
            </section>

            <section className="resume-section">
              <h3>Featured Projects</h3>
              <div className="project-item"><strong>Interview Agent:</strong> Multi-turn LLM system.</div>
              <div className="project-item"><strong>Safex Assistant:</strong> 60% accuracy gain.</div>
              <div className="project-item"><strong>FinOps AI:</strong> Cost optimization agent.</div>
            </section>

            <section className="resume-section">
              <h3>Education</h3>
              <p className="edu-text"><strong>B.Tech — CSE</strong><br/>Vel Tech University<br/>CGPA 7.34</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
