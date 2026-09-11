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
    { type: 'success', text: '[SUCCESS] Recommendation: Enable spot transition. Savings: $14,200/mo.' }
  ],
  security: [
    { type: 'system', text: '[SYSTEM] Initializing Agent 02 (Threat Intel Analyzer)...' },
    { type: 'router', text: '[ROUTER] Query routed to: MITRE ATT&CK Knowledge Base (ChromaDB)' },
    { type: 'tool', text: '[TOOL] Querying IOC database for IP: 185.190.140.2' },
    { type: 'anomaly', text: '[THREAT] Matching threat signatures found: APT29 Cozy Bear IOC' },
    { type: 'eval', text: '[EVAL] Context Recall: 0.95 | Context Precision: 0.98 | Safety Check: PASS' },
    { type: 'success', text: '[SUCCESS] Playbook generated: Auto quarantine command sent to PaloAlto API.' }
  ],
  rag_docs: [
    { type: 'system', text: '[SYSTEM] Initializing Agent 03 (Enterprise RAG Assistant)...' },
    { type: 'router', text: '[ROUTER] Intent: Documentation QA. Target: FAISS Vector store.' },
    { type: 'tool', text: '[TOOL] Querying embeddings for chunk search (bearer validation)' },
    { type: 'eval', text: '[EVAL] Faithfulness: 0.96 | Answer Relevance: 0.95 | Citation Accuracy: 1.00' },
    { type: 'success', text: '[SUCCESS] Output: RS256 signature validation is verified in api_auth.md:L45.' }
  ],
  fraud: [
    { type: 'system', text: '[SYSTEM] Initializing Agent 04 (Fraud Transaction Scanner)...' },
    { type: 'router', text: '[ROUTER] Triggering parallel runs: FAISS query + Python velocity script' },
    { type: 'tool', text: '[TOOL:DB] Retrieved user baseline profile matched index score: 0.88' },
    { type: 'tool', text: '[TOOL:CODE] Velocity check script: 12tx/sec (spike threshold = 5)' },
    { type: 'eval', text: '[EVAL] Probability of Fraud: 94% | Safety Flag: High' },
    { type: 'success', text: '[SUCCESS] Output: Card account flagged. quarantine commands triggered.' }
  ],
  protein: [
    { type: 'system', text: '[SYSTEM] Initializing Agent 05 (Protein Align Motif Matcher)...' },
    { type: 'router', text: '[ROUTER] Routing target: NCBI Web Search + Needleman-Wunsch Alignment' },
    { type: 'tool', text: '[TOOL:WEB] NCBI hits: GPCR Active Receptors matched sequence identity: 92%' },
    { type: 'tool', text: '[TOOL:CODE] Alignment calculated matching indices: GPCR-101 target' },
    { type: 'eval', text: '[EVAL] Motif Groundedness: 0.98 | Alignment confidence: 0.94' },
    { type: 'success', text: '[SUCCESS] Output: MVLA sequence motif successfully matched active GPCR targets.' }
  ],
  sentiment: [
    { type: 'system', text: '[SYSTEM] Initializing Agent 06 (AppStore Sentiment Auditor)...' },
    { type: 'router', text: '[ROUTER] Routing alert to reviews scraper...' },
    { type: 'tool', text: '[TOOL:WEB] Scraped AppStore API reviews: 350 records' },
    { type: 'eval', text: '[EVAL] Crash frequency spike: 28 mentions | Bug category: critical' },
    { type: 'success', text: '[SUCCESS] Output: App crash loop in v2.4.1 detected. Hotfix/Rollback recommended.' }
  ],
  clinical: [
    { type: 'system', text: '[SYSTEM] Initializing Agent 07 (Clinical Trials Matcher)...' },
    { type: 'router', text: '[ROUTER] Routing patient criteria search query to ClinicalTrials API' },
    { type: 'tool', text: '[TOOL:DB] FAISS database search for eligibility criteria matching oncological profiles' },
    { type: 'eval', text: '[EVAL] Semantic Relevance: 0.94 | Groundedness: 0.97 | Safety Check: PASS' },
    { type: 'success', text: '[SUCCESS] Output: Candidate matches NCT-0428 trial. Patient invitation payload ready.' }
  ],
  legal: [
    { type: 'system', text: '[SYSTEM] Initializing Agent 08 (Legal Agreement Auditor)...' },
    { type: 'router', text: '[ROUTER] Routing contract clauses to AST-based compliance analyzer' },
    { type: 'tool', text: '[TOOL:CODE] Python parser scanning text for liability limits and indemnity terms' },
    { type: 'eval', text: '[EVAL] Compliance Score: 85% | Liability alert detected: PASS' },
    { type: 'success', text: '[SUCCESS] Output: Liability limit clause is valid and within parameters. Audit approved.' }
  ],
  logistics: [
    { type: 'system', text: '[SYSTEM] Initializing Agent 09 (E-Commerce Logistics Router)...' },
    { type: 'router', text: '[ROUTER] Routing alert feed to delivery optimization solver' },
    { type: 'tool', text: '[TOOL:CODE] Executing routing optimizer script: delivery_anomalies.py' },
    { type: 'eval', text: '[EVAL] Accuracy rating: 0.97 | Out-of-bounds anomaly: 3 delay clusters detected' },
    { type: 'success', text: '[SUCCESS] Output: 3 warehouse delays bypassed. Rerouted order flow to carrier-B.' }
  ],
  devops: [
    { type: 'system', text: '[SYSTEM] Initializing Agent 10 (DevOps YAML build monitor)...' },
    { type: 'router', text: '[ROUTER] Routing parser logs query to GitHub actions trace analyzer' },
    { type: 'tool', text: '[TOOL:CODE] Executing log classification model matching error outputs' },
    { type: 'eval', text: '[EVAL] Precision: 0.96 | Recall: 0.95 | Verdict: BUILD_FAIL_GATED' },
    { type: 'success', text: '[SUCCESS] Output: Build failed on Node-18 dependency deprecation. Remediation patch ready.' }
  ]
};

const Hero = ({ onShowResume, onLaunchStudio }) => {
  const [time, setTime] = useState('');
  const [selectedPreset, setSelectedPreset] = useState('finops');
  const [consoleLogs, setConsoleLogs] = useState([
    { type: 'system', text: '[SYSTEM] Agent command console ready. Select a dataset and execute trace...' }
  ]);
  const [isRunning, setIsRunning] = useState(false);
  const consoleRef = useRef(null);

  // Auto-scroll console directly to bypass page scroll jumps
  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
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
    if (isRunning || !PRESETS[key]) return;
    setIsRunning(true);
    setConsoleLogs([]);

    const steps = PRESETS[key] || [];
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
                title="Open the interactive Neural Graph Studio to configure datasets, model parameters, and visualize multi-agent workflows in a live DAG canvas."
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
              <select 
                value={selectedPreset} 
                onChange={(e) => {
                  if (PRESETS[e.target.value]) {
                    setSelectedPreset(e.target.value);
                    setConsoleLogs([{ type: 'system', text: `[SYSTEM] Preset set to ${e.target.value.toUpperCase()}. Ready.` }]);
                  }
                }}
                className="terminal-btn"
                style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', outline: 'none', fontStyle: 'normal' }}
                disabled={isRunning}
              >
                <option value="finops">AWS Billing Logs (CSV)</option>
                <option value="security">MITRE Threat Alerts (JSON)</option>
                <option value="rag_docs">Enterprise Manuals (MD)</option>
                <option value="fraud">Fraud Transactions (CSV)</option>
                <option value="protein">Protein Alignments (FASTA)</option>
                <option value="sentiment">Reviews Sentiment (CSV)</option>
                <option value="clinical">Clinical Trials (JSON)</option>
                <option value="legal">Legal Contracts (TXT)</option>
                <option value="logistics">Warehouse Logistics (CSV)</option>
                <option value="devops">GitHub Action Logs (YAML)</option>
              </select>
              <button onClick={clearConsole} className="terminal-btn" disabled={isRunning} title="Clear terminal">
                <Trash2 size={12} />
              </button>
            </div>

            <div ref={consoleRef} className="terminal-console">
              {consoleLogs.map((log, i) => (
                <div key={i} className={`log-line ${log.type}`}>
                  {log.text}
                </div>
              ))}
            </div>

            <div className="terminal-actions-row" style={{ justifyContent: 'center' }}>
              <button 
                onClick={() => runSimulation(selectedPreset)} 
                className="terminal-btn" 
                disabled={isRunning}
                style={{ padding: '0.5rem 1.25rem', width: '100%', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}
                title="Simulate a live multi-agent execution run. Outputs real-time routing traces, tool calls, and automated validation gates."
              >
                <Play size={12} style={{ display: 'inline' }} /> Execute Agent Simulation Trace
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
              <span className="git-badge">jaiswalbuilds</span>
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
