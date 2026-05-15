import React from 'react';
import './Resume.css';
import { Mail, Globe, Download, ArrowLeft, Phone } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

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
          <h3>Summary</h3>
          <p className="summary-text">
            AI Engineer with <strong>10+ years</strong> building production ML systems, Agentic AI pipelines, and LLM-driven solutions. 
            Currently contributing to <strong>AI inference at SambaNova Systems</strong> in a high-performance LLM deployment environment. 
            Expert in RAG pipelines, multi-agent orchestration, and MLOps at cloud scale. Forward-deployed engineer with a 
            track record of translating complex enterprise requirements into production-ready AI systems.
          </p>
        </section>

        <div className="resume-grid">
          {/* Main Content Column */}
          <div className="resume-left">
            <section className="resume-section">
              <h3>Professional Experience</h3>
              
              <div className="experience-item">
                <div className="exp-header">
                  <strong>SambaNova Systems</strong>
                  <span>Jan 2026 — Present</span>
                </div>
                <div className="exp-sub">AI Engineer — Inference & Forward Deployment</div>
                <ul className="exp-list">
                  <li>Optimizing AI inference pipelines on SambaNova's custom AI accelerator stack.</li>
                  <li>Translating enterprise use cases into production AI solutions for complex environments.</li>
                  <li>Driving LLM pipeline optimization, prompt engineering, and response quality evaluation (Python).</li>
                </ul>
              </div>

              <div className="experience-item">
                <div className="exp-header">
                  <strong>Safe Security</strong>
                  <span>Aug 2023 — Feb 2026</span>
                </div>
                <div className="exp-sub">AI Platform Engineer — LLM Systems, RAG & API Infrastructure</div>
                <ul className="exp-list">
                  <li><strong>Led Safex Engineering:</strong> Built in-house GenAI assistant using RAG + FAISS, achieving <strong>60% accuracy gain</strong> and <strong>75% latency reduction</strong>.</li>
                  <li>Developed Python ML pipelines for risk scoring, anomaly detection, and threat intelligence.</li>
                  <li>Deployed Agentic workflows with multi-step reasoning and structured output schemas.</li>
                  <li>Managed 400+ REST APIs on OpenAPI/Swagger, reducing developer friction by 50%.</li>
                </ul>
              </div>

              <div className="experience-item">
                <div className="exp-header">
                  <strong>Harness.io</strong>
                  <span>Mar 2021 — Jul 2023</span>
                </div>
                <div className="exp-sub">DevOps & Platform Engineer — CI/CD & Cloud Infrastructure</div>
                <ul className="exp-list">
                  <li>Built CI/CD pipelines for K8s deployments across GCP, AWS, and JFrog.</li>
                  <li>Developed internal automation tooling to reduce manual overhead and improve release quality.</li>
                  <li>Contributed to beta-to-GA delivery of the DevSecOps platform within 3 months.</li>
                </ul>
              </div>

              <div className="experience-item">
                <div className="exp-header">
                  <strong>Arcana · Marlin · 1Kosmos</strong>
                  <span>2018 — 2021</span>
                </div>
                <div className="exp-sub">AI SDK & Developer Platform Engineer</div>
                <ul className="exp-list">
                  <li>Built Python/TS SDKs and automated CI/CD for decentralized AI compute infrastructure.</li>
                  <li>Developed EVM smart contracts (Solidity) for on-chain coordination and DeFi primitives.</li>
                </ul>
              </div>
            </section>

            <section className="resume-section">
              <h3>Featured AI Masterpieces</h3>
              <div className="project-item">
                <strong>Autonomous LLM Interview Agent:</strong> Multi-turn agentic system with memory and CoT reasoning.
              </div>
              <div className="project-item">
                <strong>Safex — Enterprise AI:</strong> Full-stack LLM assistant with 60% accuracy gain.
              </div>
              <div className="project-item">
                <strong>FinOps Agentic Automation:</strong> Cloud cost optimization using anomaly detection (Scikit-learn).
              </div>
            </section>
          </div>

          {/* Sidebar Column */}
          <div className="resume-right">
            <section className="resume-section">
              <h3>Key Achievements</h3>
              <div className="achievement-badge"><strong>60%</strong> Accuracy Gain (RAG)</div>
              <div className="achievement-badge"><strong>75%</strong> Latency Reduction</div>
              <div className="achievement-badge"><strong>50%</strong> Dev Query Reduction</div>
              <div className="achievement-badge"><strong>400+</strong> APIs Owned</div>
            </section>

            <section className="resume-section">
              <h3>Core ML Stack</h3>
              <div className="skill-group">
                <strong>Deep Learning & GenAI</strong>
                <p>PyTorch, TensorFlow, LangChain, LlamaIndex, CrewAI, AutoGen, Hugging Face, RAG, Agentic AI</p>
              </div>
              <div className="skill-group">
                <strong>Data Science</strong>
                <p>NumPy, Pandas, Scikit-learn, Matplotlib, SciPy</p>
              </div>
              <div className="skill-group">
                <strong>Infrastructure</strong>
                <p>Docker, K8s, Terraform, AWS, GCP, FAISS, Pinecone, ChromaDB, PostgreSQL</p>
              </div>
            </section>

            <section className="resume-section">
              <h3>Certifications</h3>
              <ul className="cert-list">
                <li>AI Engineer Bootcamp 2025</li>
                <li>DevOps MasterClass (K8s)</li>
                <li>Ethereum & Solidity</li>
              </ul>
            </section>

            <section className="resume-section">
              <h3>Education</h3>
              <p className="edu-text">
                <strong>B.Tech — CSE</strong><br/>
                Vel Tech University, Chennai<br/>
                CGPA 7.34
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
