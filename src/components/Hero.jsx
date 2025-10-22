import React from 'react';
import { Terminal, ChevronRight, Mail, FileText } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import heroBg from '../assets/ai_core_hero_1778827683584.png';
import './Hero.css';

const PROFILE_IMAGE = "https://customer-assets.emergentagent.com/job_62aa6f42-eb1d-43a7-9fbe-6dc3252347a9/artifacts/ao0j8wiu_WhatsApp%20Image%202025-01-26%20at%203.00.01%20PM%20%281%29.jpeg";

const Hero = ({ onShowResume }) => {
  return (
    <section id="hero" className="hero-section">
      <div className="hero-bg-image" style={{ backgroundImage: `url(${heroBg})` }}></div>
      <div className="hero-overlay"></div>

      <div className="container hero-container animate-fade-in">
        <div className="hero-grid">

          {/* Left — Text Content */}
          <div className="hero-content">
            <div className="badge glass-panel">
              <span className="pulse-dot"></span>
              Forward Deployed AI Engineer
            </div>

            <h1 className="hero-title">
              Architecting <span className="text-gradient">Agentic AI</span> &<br />
              ML Systems at Scale.
            </h1>

            <p className="hero-subtitle">
              I am Manish Jaiswal. Building production ML pipelines, Agentic AI, and LLM-driven solutions across cybersecurity, FinOps, Web3, and enterprise AI.
            </p>

            <div className="hero-actions">
              <button onClick={onShowResume} className="btn btn-primary" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FileText size={20} />
                Download Resume
              </button>
              <a href="#projects" className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Terminal size={20} />
                View Masterpieces
              </a>
            </div>

            <div className="social-links">
              <a href="https://github.com/jaiswalbuilds" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FaGithub size={24} />
              </a>
              <a href="https://www.linkedin.com/in/manish-kumar-74ab6210a/" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FaLinkedin size={24} />
              </a>
              <a href="mailto:jaiswalmanish060@gmail.com" className="social-icon">
                <Mail size={24} />
              </a>
            </div>
          </div>

          {/* Right — Profile Image */}
          <div className="hero-image-wrapper">
            <div className="hero-image-glow"></div>
            <div className="hero-image-panel glass-panel">
              <img
                src={PROFILE_IMAGE}
                alt="Manish Jaiswal"
                className="hero-profile-img"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;

// Refactored update: 2025-10-22 check
