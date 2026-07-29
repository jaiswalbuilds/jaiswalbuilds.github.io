import React, { useState, useEffect } from 'react';
import { Terminal, Mail, FileText, MapPin, Compass, ShieldAlert, Cpu } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './Hero.css';

const PROFILE_IMAGE = "https://customer-assets.emergentagent.com/job_62aa6f42-eb1d-43a7-9fbe-6dc3252347a9/artifacts/ao0j8wiu_WhatsApp%20Image%202025-01-26%20at%203.00.01%20PM%20%281%29.jpeg";

const Hero = ({ onShowResume }) => {
  const [time, setTime] = useState('');

  // Live Clock for Asia/Kolkata
  useEffect(() => {
    const updateTime = () => {
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      const formatter = new Intl.DateTimeFormat([], options);
      setTime(formatter.format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Framer Motion Animation Settings
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="hero" className="hero-section">
      <div className="hero-overlay"></div>

      <div className="container">
        <motion.div 
          className="bento-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Card 1: Profile & Bio (col-span-2, row-span-2) */}
          <motion.div 
            className="bento-card bento-profile-card col-span-2 row-span-2"
            variants={cardVariants}
          >
            <div className="profile-header-row">
              <div className="profile-avatar-wrapper">
                <img src={PROFILE_IMAGE} alt="Manish Kumar" className="profile-avatar" />
              </div>
              <div className="profile-title-col">
                <h1 className="profile-name">Manish Kumar</h1>
                <span className="profile-tagline">Forward Deployed AI Engineer</span>
              </div>
            </div>

            <p className="profile-bio">
              Architecting production-grade agentic systems, RAG pipelines, and cloud-native infrastructure. Expert in LangGraph, LLM optimization, and high-concurrency dev platforms.
            </p>

            <div className="profile-actions">
              <motion.button 
                onClick={onShowResume} 
                className="btn btn-primary" 
                style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <FileText size={18} />
                View Resume
              </motion.button>
              <motion.a 
                href="#projects" 
                className="btn btn-outline" 
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Terminal size={18} />
                View Projects
              </motion.a>
            </div>
          </motion.div>

          {/* Card 2: Current Status (col-span-1) */}
          <motion.div 
            className="bento-card bento-status-card glass-panel"
            variants={cardVariants}
          >
            <div className="status-badge">
              <span className="status-pulse"></span>
              Active Now
            </div>
            <h3 className="status-title">Founding AI Engineer</h3>
            <p className="status-desc">@ Neurals.in — Orchestrating stateful FinOps agent workflows.</p>
          </motion.div>

          {/* Card 3: Impact Metric 1 (col-span-1) */}
          <motion.div 
            className="bento-card bento-metric-card glass-panel"
            variants={cardVariants}
          >
            <span className="metric-num">30-40%</span>
            <span className="metric-sub">Cloud-Cost Reduction from Multi-Agent Systems</span>
          </motion.div>

          {/* Card 4: Location & Timezone (col-span-1) */}
          <motion.div 
            className="bento-card bento-location-card glass-panel"
            variants={cardVariants}
          >
            <div className="flag-icon">🇮🇳</div>
            <h3 className="location-title">India</h3>
            <span className="location-subtext">Local Time (UTC+5:30)</span>
            <div className="live-clock">{time || '00:00:00'}</div>
          </motion.div>

          {/* Card 5: Impact Metric 2 (col-span-1) */}
          <motion.div 
            className="bento-card bento-metric-card metric-purple glass-panel"
            variants={cardVariants}
          >
            <span className="metric-num">75%</span>
            <span className="metric-sub">Inference Latency Cut Gated by AI Eval Suites</span>
          </motion.div>

          {/* Card 6: ML Stack (col-span-2) */}
          <motion.div 
            className="bento-card bento-stack-card glass-panel col-span-2"
            variants={cardVariants}
          >
            <h3 className="stack-title">Core AI/ML Stack</h3>
            <div className="stack-grid-mini">
              {['LangGraph', 'LlamaIndex', 'FAISS', 'PyTorch', 'FastAPI', 'Docker', 'Kubernetes', 'AWS', 'GCP', 'Terraform', 'Spring Boot'].map((tech, i) => (
                <motion.span 
                  key={i} 
                  className="stack-badge-mini"
                  whileHover={{ scale: 1.05, borderColor: '#8b5cf6', color: '#ffffff' }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Card 7: Git Streak / History (col-span-2) */}
          <motion.div 
            className="bento-card bento-git-card glass-panel col-span-2"
            variants={cardVariants}
          >
            <div className="git-header">
              <h3 className="git-title">GitHub Velocity</h3>
              <span className="git-badge">jaiswalwrites</span>
            </div>
            
            <div className="git-visual-mockup">
              {Array.from({ length: 42 }).map((_, i) => {
                // Generate a mockup green pattern
                let level = 'level-0';
                if (i % 3 === 0) level = 'level-1';
                if (i % 5 === 0) level = 'level-2';
                if (i % 7 === 0) level = 'level-3';
                if (i % 8 === 0) level = 'level-4';
                return <div key={i} className={`git-dot ${level}`}></div>;
              })}
            </div>

            <div className="git-stats-row">
              <span>365+ Days Commit Streak</span>
              <span>500+ backdated contributions</span>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
