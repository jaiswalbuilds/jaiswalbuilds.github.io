import React from 'react';
import { Terminal, Mail, FileText } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { motion } from 'framer-motion';
import heroBg from '../assets/ai_core_hero_1778827683584.png';
import './Hero.css';

const PROFILE_IMAGE = "https://customer-assets.emergentagent.com/job_62aa6f42-eb1d-43a7-9fbe-6dc3252347a9/artifacts/ao0j8wiu_WhatsApp%20Image%202025-01-26%20at%203.00.01%20PM%20%281%29.jpeg";

const Hero = ({ onShowResume }) => {
  // Stagger Container Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  // Fade-in-up variants for child items
  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="hero" className="hero-section">
      <div className="hero-bg-image" style={{ backgroundImage: `url(${heroBg})` }}></div>
      <div className="hero-overlay"></div>

      <div className="container hero-container">
        <div className="hero-grid">

          {/* Left — Text Content */}
          <motion.div 
            className="hero-content"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="badge glass-panel">
              <span className="pulse-dot"></span>
              Forward Deployed AI Engineer
            </motion.div>

            <motion.h1 variants={itemVariants} className="hero-title">
              Architecting <span className="text-gradient">Agentic AI</span> &<br />
              ML Systems at Scale.
            </motion.h1>

            <motion.p variants={itemVariants} className="hero-subtitle">
              I am Manish Jaiswal. Building production ML pipelines, Agentic AI, and LLM-driven solutions across cybersecurity, FinOps, Web3, and enterprise AI.
            </motion.p>

            <motion.div variants={itemVariants} className="hero-actions">
              <motion.button 
                onClick={onShowResume} 
                className="btn btn-primary" 
                style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                whileHover={{ scale: 1.05, translateY: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <FileText size={20} />
                Download Resume
              </motion.button>
              <motion.a 
                href="#projects" 
                className="btn btn-outline" 
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                whileHover={{ scale: 1.05, translateY: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Terminal size={20} />
                View Masterpieces
              </motion.a>
            </motion.div>

            <motion.div variants={itemVariants} className="social-links">
              <motion.a 
                href="https://github.com/jaiswalbuilds" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-icon"
                whileHover={{ y: -4, scale: 1.1, color: '#3b82f6' }}
              >
                <FaGithub size={24} />
              </motion.a>
              <motion.a 
                href="https://www.linkedin.com/in/manish-kumar-74ab6210a/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-icon"
                whileHover={{ y: -4, scale: 1.1, color: '#3b82f6' }}
              >
                <FaLinkedin size={24} />
              </motion.a>
              <motion.a 
                href="mailto:jaiswalmanish060@gmail.com" 
                className="social-icon"
                whileHover={{ y: -4, scale: 1.1, color: '#3b82f6' }}
              >
                <Mail size={24} />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right — Profile Image with motion hover */}
          <motion.div 
            className="hero-image-wrapper"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="hero-image-glow"></div>
            <motion.div 
              className="hero-image-panel glass-panel"
              whileHover={{ scale: 1.02, rotateY: 5, rotateX: -5 }}
              transition={{ duration: 0.4 }}
            >
              <img
                src={PROFILE_IMAGE}
                alt="Manish Jaiswal"
                className="hero-profile-img"
              />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
