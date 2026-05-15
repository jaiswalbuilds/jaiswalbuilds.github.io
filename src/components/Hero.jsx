import React from 'react';
import { Terminal, ChevronRight, Mail } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import './Hero.css';

// We'll use the generated image from assets
// Assuming the first image starts with ai_core_hero
import heroBg from '../assets/ai_core_hero_1778827683584.png'; // Make sure the name matches the actual copied file, or we can use a CSS background with an absolute path or a generic name if we renamed it. We'll find out.
// Actually, it's safer to use an absolute path for local dev or an import. 
// I will just use a generic style for now, and fix the import if needed.

const Hero = () => {
  return (
    <section id="hero" className="hero-section">
      <div className="hero-bg-image" style={{ backgroundImage: `url(/src/assets/ai_core_hero_1778827683584.png)` }}></div>
      <div className="hero-overlay"></div>
      
      <div className="container hero-container animate-fade-in">
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
            Currently optimizing AI inference and transforming enterprise needs into robust AI applications.
          </p>
          
          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary">
              <Terminal size={20} />
              View Masterpieces
            </a>
            <a href="https://neurals.in" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              Visit Neurals.in
              <ChevronRight size={20} />
            </a>
          </div>
          
          <div className="social-links mt-8 flex gap-4">
            <a href="https://github.com/jaiswalwrites" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FaGithub size={24} />
            </a>
            <a href="https://linkedin.com/in/manish-kumar-74ab6210a" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FaLinkedin size={24} />
            </a>
            <a href="mailto:jaiswalmanish060@gmail.com" className="social-icon">
              <Mail size={24} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
