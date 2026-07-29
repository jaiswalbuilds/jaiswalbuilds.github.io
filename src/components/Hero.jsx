import React, { useState, useEffect, useRef } from 'react';
import { FileText, Terminal, Mail, Play, Trash2, ShieldAlert, Cpu } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './Hero.css';

const PROFILE_IMAGE = "https://customer-assets.emergentagent.com/job_62aa6f42-eb1d-43a7-9fbe-6dc3252347a9/artifacts/ao0j8wiu_WhatsApp%20Image%202025-01-26%20at%203.00.01%20PM%20%281%29.jpeg";

const PRESETS = {
  finops: [
    { type: 'system', text: '[SYSTEM] Initializing Agent 01 (FinOps Cost Optimizer)...' },
    { type: 'router', text: '[ROUTER] Query routed to: FAISS Vector DB (k=3, threshold=0.75)' },
    { type: 'tool', text: '[TOOL] Running CSVAnomaliesTool on log: aws_billing_may.csv' },
    { type: 'anomaly', text: '[ANOMALY] Detected 3 compute cost spikes (Z-Score = 2.89) in EC2' },
    { type: 'text', text: '[THOUGHT] Reasoner: Anomalies correspond to un-scheduled dev-envs on weekends.' },
    { type: 'eval', text: '[EVAL] Groundedness: 0.98 | Citation Accuracy: 1.00 | Hallucination Check: PASS' },
    { type: 'success', text: '[SUCCESS] Recommendation compiled: Enable spot transition. Est. savings: $14,200/mo.' }
  ],
  security: [
    { type: 'system', text: '[SYSTEM] Initializing Agent 02 (Threat Intel Analyzer)...' },
    { type: 'router', text: '[ROUTER] Query routed to: MITRE ATT&CK Knowledge Base (ChromaDB)' },
    { type: 'tool', text: '[TOOL] Querying IOC database for IP: 185.190.140.2' },
    { type: 'anomaly', text: '[THREAT] Matching threat signatures found: APT29 (Cozy Bear) phishing indicators' },
    { type: 'text', text: '[THOUGHT] Reasoner: Compiling containment and quarantine instructions for firewall.' },
    { type: 'eval', text: '[EVAL] Context Recall: 0.95 | Context Precision: 0.98 | Safety Check: PASS' },
    { type: 'success', text: '[SUCCESS] Playbook generated: Port blocking + account suspension initiated.' }
  ],
  ragVerify: [
    { type: 'system', text: '[SYSTEM] Initializing RAG Pipeline Verification (Safex)...' },
    { type: 'text', text: '[DATA] Indexing 420 markdown product specs into ChromaDB...' },
    { type: 'tool', text: '[EVAL] Running automated benchmark suite: 100 queries...' },
    { type: 'eval', text: '[METRIC] Faithfulness: 0.96 | Answer Relevance: 0.95 | P99 Latency: 120ms' },
    { type: 'success', text: '[SUCCESS] Pipeline verification complete. Gated Release: APPROVED.' }
  ]
};

const Hero = ({ onShowResume, onLaunchStudio }) => {
  const [time, setTime] = useState('');
  const [consoleLogs, setConsoleLogs] = useState([
    { type: 'system', text: '[SYSTEM] Agent command console ready. Click a preset below to run agent trace...' }
  ]);
  const [isRunning, setIsRunning] = useState(false);
  const consoleEndRef = useRef(null);

  // Auto-scroll console
  useEffect(() => {
    if (consoleEndRef.current) {
      consoleEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [consoleLogs]);

  // Live Clock (Asia/Kolkata)
  useEffect(() => {
    const updateTime = () => {
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      setTime(new Intl.DateTimeFormat([], options).format(new Date()));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Run Trace Simulation
  const runSimulation = async (key) => {
    if (isRunning) return;
    setIsRunning(true);
    setConsoleLogs([]);

    const steps = PRESETS[key];
    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setConsoleLogs(prev => [...prev, steps[i]]);
    }
    setIsRunning(false);
  };

  const clearConsole = () => {
    setConsoleLogs([{ type: 'system', text: '[SYSTEM] Console cleared. Standby.' }]);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
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
          {/* Card 1: Profile card (col-span-2, row-span-2) */}
          <motion.div className="bento-card bento-profile-card col-span-2 row-span-2" variants={cardVariants}>
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
              Forward Deployed AI Engineer specializing in production multi-agent systems, cyclic graphs (LangGraph), vector database tuning, and high-throughput microservices. Built and audited enterprise RAG assistants and FinOps governance layers.
            </p>
            <div className="profile-actions">
              <motion.button 
                onClick={onShowResume} 
                className="btn btn-primary" 
                style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <FileText size={18} /> View Resume
              </motion.button>
              <motion.button 
                onClick={onLaunchStudio} 
                className="btn btn-outline" 
                style={{ 
                  cursor: 'pointer', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem', 
                  borderColor: 'var(--accent-cyan)', 
                  color: 'var(--text-accent)' 
                }}
                whileHover={{ scale: 1.03, backgroundColor: 'rgba(0, 255, 255, 0.05)' }}
                whileTap={{ scale: 0.98 }}
              >
                <Cpu size={18} /> Launch Graph Studio
              </motion.button>
            </div>
          </motion.div>

          {/* Card 2: Current Status (col-span-1) */}
          <motion.div className="bento-card bento-status-card glass-panel" variants={cardVariants}>
            <div className="status-badge">
              <span className="status-pulse"></span> Active Now
            </div>
            <h3 className="status-title">Founding AI Engineer</h3>
            <p className="status-desc">@ Neurals.in — Building stateful cyclic graphs & cost agents.</p>
          </motion.div>

          {/* Card 3: Impact Metric 1 (col-span-1) */}
          <motion.div className="bento-card bento-metric-card glass-panel" variants={cardVariants}>
            <span className="metric-num">30-40%</span>
            <span className="metric-sub">Cloud-Cost Reduction from Multi-Agent Systems</span>
          </motion.div>

          {/* Card 4: Terminal Simulator (col-span-2, row-span-2) */}
          <motion.div className="bento-card bento-terminal-card" variants={cardVariants}>
            <div className="terminal-header">
              <div className="terminal-dots">
                <span className="t-dot red"></span>
                <span className="t-dot yellow"></span>
                <span className="t-dot green"></span>
              </div>
              <span className="terminal-title">Agent Execution Trace Simulator</span>
              <button onClick={clearConsole} className="terminal-btn" disabled={isRunning} title="Clear terminal">
                <Trash2 size={12} />
              </button>
            </div>

            <div className="terminal-console">
              {consoleLogs.map((log, i) => (
                <div key={i} className={`log-line ${log.type}`}>
                  {log.text}
                </div>
              ))}
              <div ref={consoleEndRef} />
            </div>

            <div className="terminal-actions-row">
              <button onClick={() => runSimulation('finops')} className="terminal-btn" disabled={isRunning}>
                <Play size={10} style={{ marginRight: '4px', display: 'inline' }} /> Run FinOps Agent
              </button>
              <button onClick={() => runSimulation('security')} className="terminal-btn" disabled={isRunning}>
                <Play size={10} style={{ marginRight: '4px', display: 'inline' }} /> Run Security Agent
              </button>
              <button onClick={() => runSimulation('ragVerify')} className="terminal-btn" disabled={isRunning}>
                <Play size={10} style={{ marginRight: '4px', display: 'inline' }} /> Verify RAG Pipeline
              </button>
            </div>
          </motion.div>

          {/* Card 5: ML Stack (col-span-2) */}
          <motion.div className="bento-card bento-stack-card glass-panel col-span-2" variants={cardVariants}>
            <h3 className="stack-title">Core AI/ML Stack</h3>
            <div className="stack-grid-mini">
              {['LangGraph', 'LlamaIndex', 'FAISS', 'PyTorch', 'FastAPI', 'Docker', 'Kubernetes', 'AWS', 'GCP', 'Terraform', 'Spring Boot'].map((tech, i) => (
                <motion.span 
                  key={i} 
                  className="stack-badge-mini"
                  whileHover={{ scale: 1.05, borderColor: '#7b61ff', color: '#ffffff' }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Card 6: GitHub Velocity (col-span-2) */}
          <motion.div className="bento-card bento-git-card glass-panel col-span-2" variants={cardVariants}>
            <div className="git-header">
              <h3 className="git-title">GitHub Velocity</h3>
              <span className="git-badge">jaiswalwrites</span>
            </div>
            <div className="git-visual-mockup">
              {Array.from({ length: 42 }).map((_, i) => {
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

          {/* Card 7: Location & Timezone (col-span-1) */}
          <motion.div className="bento-card bento-location-card glass-panel" variants={cardVariants}>
            <div className="flag-icon">🇮🇳</div>
            <h3 className="location-title">India</h3>
            <span className="location-subtext">Local Time (UTC+5:30)</span>
            <div className="live-clock">{time || '00:00:00'}</div>
          </motion.div>

          {/* Card 8: Impact Metric 2 (col-span-1) */}
          <motion.div className="bento-card bento-metric-card metric-purple glass-panel" variants={cardVariants}>
            <span className="metric-num">75%</span>
            <span className="metric-sub">Inference Latency Cut Gated by AI Eval Suites</span>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
