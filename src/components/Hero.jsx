import React, { useState, useEffect, useRef } from 'react';
import { Play, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import './Hero.css';

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
  const [selectedPreset, setSelectedPreset] = useState('finops');
  const [consoleLogs, setConsoleLogs] = useState([
    { type: 'system', text: '[SYSTEM] Agent command console ready. Select a dataset and execute trace...' }
  ]);
  const [isRunning, setIsRunning] = useState(false);
  const consoleRef = useRef(null);

  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [consoleLogs]);

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

  return (
    <div className="hero-section">
      <div className="section-label">// Agent Execution Trace</div>
      
      <div className="scenario-tabs">
        {Object.keys(PRESETS).map(key => (
          <button
            key={key}
            className={`scenario-tab ${selectedPreset === key ? 'active' : ''}`}
            onClick={() => {
              if(!isRunning){
                setSelectedPreset(key);
                setConsoleLogs([{ type: 'system', text: `[SYSTEM] Preset set to ${key.toUpperCase()}. Ready.` }]);
              }
            }}
          >
            {key.replace(/_/g, ' ')}
          </button>
        ))}
      </div>

      <div className="terminal-window">
        <div className="terminal-titlebar">
          <div style={{ display: 'flex', gap: '6px' }}>
            <span className="terminal-dot red"></span>
            <span className="terminal-dot yellow"></span>
            <span className="terminal-dot green"></span>
          </div>
          <span className="terminal-title">agent-trace.sh</span>
          <button onClick={clearConsole} style={{marginLeft: 'auto', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer'}}>
            <Trash2 size={14} />
          </button>
        </div>
        
        <div className="terminal-body" ref={consoleRef} style={{ overflowY: 'auto', maxHeight: '400px' }}>
          {consoleLogs.map((log, i) => (
            <div key={i} className={`line-${log.type}`}>
              {log.text}
            </div>
          ))}
          {isRunning && <div className="line-cursor">_</div>}
        </div>
        
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '0.75rem 1rem', display: 'flex', justifyContent: 'flex-end' }}>
           <button 
              onClick={() => runSimulation(selectedPreset)} 
              className="btn btn-primary"
              disabled={isRunning}
              style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}
            >
              <Play size={14} style={{ marginRight: '6px' }} /> Execute Trace
            </button>
        </div>
      </div>

      <div className="terminal-metrics">
        <div className="metric-tile">
          <span className="metric-label">Latency</span>
          <span className="metric-value">340ms</span>
        </div>
        <div className="metric-tile">
          <span className="metric-label">Tokens</span>
          <span className="metric-value">2,847</span>
        </div>
        <div className="metric-tile">
          <span className="metric-label">Cost</span>
          <span className="metric-value">$0.0014</span>
        </div>
        <div className="metric-tile">
          <span className="metric-label">Accuracy</span>
          <span className="metric-value good">98.2%</span>
        </div>
      </div>
    </div>
  );
};

export default Hero;
