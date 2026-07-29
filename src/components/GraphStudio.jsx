import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Play, Cpu, ShieldCheck, UserCheck, Activity, Database, GitBranch, Terminal } from 'lucide-react';
import './GraphStudio.css';

// 6 Diverse Datasets Configuration
const DATASET_FEEDS = {
  csv_billing: {
    name: 'AWS Billing Logs (CSV)',
    query: 'Identify May EC2 compute spend anomalies',
    sample: 'Date,Service,Cost,Instance\n01-May,EC2,$450,m5.large\n15-May,EC2,$1800,c5.xlarge',
    trace: ['ingest', 'context', 'embed', 'router', 'tool_code', 'safety', 'approve', 'output'],
    nodes: {
      ingest: { inputs: { query: 'Analyze May compute costs', format: 'CSV' }, outputs: { status: 'LOADED', size: '42KB' } },
      context: { inputs: { metadata: 'Billing logs' }, outputs: { data_points: 105 } },
      embed: { inputs: { fields: ['Date', 'Service', 'Cost'] }, outputs: { dimensions: 1536 } },
      router: { inputs: { classifier: 'intent_analysis' }, outputs: { target_tool: 'Python_Executor_Node' } },
      tool_db: { inputs: {}, outputs: { status: 'BYPASSED' } },
      tool_web: { inputs: {}, outputs: { status: 'BYPASSED' } },
      tool_code: { inputs: { script: 'zscore_compute.py', Z_threshold: 2.5 }, outputs: { anomaly_detected: 1, z_score: 2.89, details: 'EC2 spend spike on May 15 ($1800)' } },
      eval: { inputs: {}, outputs: { status: 'BYPASSED' } },
      safety: { inputs: { recommendation: 'Shutdown dev-env on weekends' }, outputs: { safety_score: 0.99, decision: 'APPROVED' } },
      approve: { inputs: { action: 'Enable spot schedule on cluster' }, outputs: { status: 'AWAITING_ADMIN_SIGN_OFF', user: 'Admin' } },
      output: { inputs: { approval: 'APPROVED' }, outputs: { action: 'Spot instances scheduler activated' } }
    }
  },
  json_threat: {
    name: 'MITRE Threat Alerts (JSON)',
    query: 'Correlate Host IOC IP alert Syslog AL-9938a',
    sample: '{"alert_id": "AL-9938a", "ip": "185.190.140.2", "severity": "CRITICAL"}',
    trace: ['ingest', 'context', 'embed', 'router', 'tool_db', 'eval', 'output'],
    nodes: {
      ingest: { inputs: { alert_id: 'AL-9938a', format: 'JSON' }, outputs: { status: 'PARSED', IP: '185.190.140.2' } },
      context: { inputs: { metadata: 'Syslog feed' }, outputs: { data_points: 45 } },
      embed: { inputs: { ioc: '185.190.140.2' }, outputs: { dimensions: 1536 } },
      router: { inputs: { classification: 'security_event' }, outputs: { target_tool: 'FAISS_Retriever_Threat_KB' } },
      tool_db: { inputs: { vector_query: '185.190.140.2', k: 1 }, outputs: { threat_group: 'APT29 (Cozy Bear)', technique: 'T1566 (Phishing)' } },
      tool_web: { inputs: {}, outputs: { status: 'BYPASSED' } },
      tool_code: { inputs: {}, outputs: { status: 'BYPASSED' } },
      eval: { inputs: { matched_playbook: 'APT29_Quarantine' }, outputs: { precision: 0.98, recall: 0.94, decision: 'GATED_APPROVED' } },
      safety: { inputs: {}, outputs: { status: 'BYPASSED' } },
      approve: { inputs: {}, outputs: { status: 'BYPASSED_AUTO_APPROVE_CRITICAL_IOC' } },
      output: { inputs: { cmd: 'AUTO_BLOCK' }, outputs: { status: 'BLOCKED', ip: '185.190.140.2', target: 'PaloAlto_Firewall' } }
    }
  },
  md_docs: {
    name: 'Enterprise Documentation (MD)',
    query: 'Bearer token authorization signature validation',
    sample: '# API Auth Guidelines\nValidate bearer signature using RS256 algorithm.',
    trace: ['ingest', 'embed', 'router', 'tool_db', 'eval', 'output'],
    nodes: {
      ingest: { inputs: { query: 'Bearer token RS256 signature', format: 'MD' }, outputs: { status: 'INDEXED' } },
      context: { inputs: {}, outputs: { status: 'BYPASSED' } },
      embed: { inputs: { text: 'Bearer signature RS256' }, outputs: { dimensions: 1536 } },
      router: { inputs: { class: 'documentation_qa' }, outputs: { target_tool: 'FAISS_Retriever_Docs' } },
      tool_db: { inputs: { query: 'token_signature_RS256', k: 3 }, outputs: { retrieved_manuals: ['api_auth.md', 'security_spec.md'], similarity: 0.82 } },
      tool_web: { inputs: {}, outputs: { status: 'BYPASSED' } },
      tool_code: { inputs: {}, outputs: { status: 'BYPASSED' } },
      eval: { inputs: { generated_answer: 'RS256 signature validation protocol' }, outputs: { faithfulness: 0.96, answer_relevance: 0.95, decision: 'RELEASE_APPROVED' } },
      safety: { inputs: {}, outputs: { status: 'BYPASSED' } },
      approve: { inputs: {}, outputs: { status: 'BYPASSED_READ_ONLY_QA' } },
      output: { inputs: { qa_compile: 'Markdown answer payload' }, outputs: { answer: 'Bearer tokens must decode using RS256. Verify audience claims.', citations: ['api_auth.md:L45'] } }
    }
  },
  csv_fraud: {
    name: 'Financial Fraud Transactions (CSV)',
    query: 'Scan credit transaction vectors for anomaly spikes',
    sample: 'ID,Amount,Location,Device\nTX-102,$9800,Ukraine,New_MacBook',
    trace: ['ingest', 'context', 'embed', 'router', 'tool_db', 'tool_code', 'eval', 'safety', 'approve', 'output'],
    nodes: {
      ingest: { inputs: { query: 'Check Kyiv transactions log', format: 'CSV' }, outputs: { status: 'LOADED' } },
      context: { inputs: { database: 'fraud_history' }, outputs: { data_points: 1420 } },
      embed: { inputs: { tx: 'Ukraine, New_MacBook, $9800' }, outputs: { dimensions: 1536 } },
      router: { inputs: { mode: 'parallel_eval' }, outputs: { target_tools: ['FAISS_Retriever', 'Python_Executor'] } },
      tool_db: { inputs: { query_vector: 'Array(1536)' }, outputs: { user_fraud_history_score: 0.88 } },
      tool_web: { inputs: {}, outputs: { status: 'BYPASSED' } },
      tool_code: { inputs: { script: 'velocity_check.py' }, outputs: { tx_velocity: '12tx/sec', z_score: 3.12 } },
      eval: { inputs: { vector_match: 0.88, velocity_z: 3.12 }, outputs: { fraud_probability: 0.94, confidence: 0.97, decision: 'FRAUD_GATED' } },
      safety: { inputs: { containment: 'Quarantine card' }, outputs: { safety_score: 1.00, action: 'CONFIRMED' } },
      approve: { inputs: { approval: 'Flag account limit' }, outputs: { status: 'AWAITING_FRAUD_ANALYST_CONFIRMATION', user: 'Risk_Team' } },
      output: { inputs: { analyst_sign_off: 'APPROVED' }, outputs: { execution_status: 'CARD_LOCKED', notification_sent: true } }
    }
  },
  fasta_protein: {
    name: 'Protein Sequence Matcher (FASTA)',
    query: 'Compare motif sequence MVLA against active receptors',
    sample: '>active_receptor_1\nMVLAGAATVLLGVLAAA\n>active_receptor_2\nMVKLAAGVTVL',
    trace: ['ingest', 'embed', 'router', 'tool_web', 'tool_code', 'eval', 'output'],
    nodes: {
      ingest: { inputs: { query: 'Motif: MVLA', format: 'FASTA' }, outputs: { status: 'LOADED' } },
      context: { inputs: {}, outputs: { status: 'BYPASSED' } },
      embed: { inputs: { sequence: 'MVLAGAATVLLG' }, outputs: { dimensions: 1536 } },
      router: { inputs: { classifier: 'protein_alignment' }, outputs: { target_tools: ['NCBI_Search', 'Python_Alignment'] } },
      tool_db: { inputs: {}, outputs: { status: 'BYPASSED' } },
      tool_web: { inputs: { sequence_ncbi: 'MVLA' }, outputs: { database_hits: 15, top_match: 'Human_GPCR_Receptor' } },
      tool_code: { inputs: { alignment_algo: 'Needleman-Wunsch' }, outputs: { match_score: 84.5, identity: '92%' } },
      eval: { inputs: { hit: 'GPCR_Receptor', identity: '92%' }, outputs: { similarity_confidence: 0.94, groundedness: 0.98, decision: 'ALIGNMENT_CONFIRMED' } },
      safety: { inputs: {}, outputs: { status: 'BYPASSED' } },
      approve: { inputs: {}, outputs: { status: 'AUTO_BYPASS_SCIENTIFIC_QA' } },
      output: { inputs: { compile: 'Protein sequence report' }, outputs: { aligned_motif: 'MVLA-GA-ATVLL', gpcr_association: 'Active GPCR-101 target' } }
    }
  },
  csv_sentiment: {
    name: 'Customer Feedback Sentiment (CSV)',
    query: 'Classify rating spikes in AppStore reviews',
    sample: 'Review,Rating,Date\nApp crashes on start,1,28-May\nLove the new interface,5,29-May',
    trace: ['ingest', 'context', 'embed', 'router', 'tool_web', 'eval', 'output'],
    nodes: {
      ingest: { inputs: { query: 'Classify start crash reviews', format: 'CSV' }, outputs: { status: 'LOADED' } },
      context: { inputs: { reviews_feed: 'AppStore_API' }, outputs: { data_points: 350 } },
      embed: { inputs: { text: 'App crashes on start, rating 1' }, outputs: { dimensions: 1536 } },
      router: { inputs: { mode: 'sentiment_classifier' }, outputs: { target_tool: 'Web_Feedback_Scraper' } },
      tool_db: { inputs: {}, outputs: { status: 'BYPASSED' } },
      tool_web: { inputs: { query_store: 'AppStore_Reviews_API' }, outputs: { total_crashes_referenced: 28 } },
      tool_code: { inputs: {}, outputs: { status: 'BYPASSED' } },
      eval: { inputs: { crashes_logged: 28 }, outputs: { classification: 'Critical Bug Alert', accuracy: 0.96, decision: 'RELEASE_GATED' } },
      safety: { inputs: {}, outputs: { status: 'BYPASSED' } },
      approve: { inputs: {}, outputs: { status: 'BYPASSED_READ_ONLY_ALERT' } },
      output: { inputs: { compile: 'Developer incident log' }, outputs: { alert: 'App crash loop detected in v2.4.1 release. Rollback recommended.' } }
    }
  }
};

// SVG Node positions coordinates mapping
const NODES_CONFIG = {
  ingest: { label: 'Query Ingest', x: 100, y: 150, type: 'input' },
  context: { label: 'Context Aggregator', x: 100, y: 330, type: 'input' },
  
  embed: { label: 'Embedding Projection', x: 280, y: 150, type: 'neural' },
  router: { label: 'Semantic Router', x: 280, y: 330, type: 'neural' },
  
  tool_db: { label: 'FAISS Retriever', x: 500, y: 80, type: 'tool' },
  tool_web: { label: 'Web Scraper', x: 500, y: 240, type: 'tool' },
  tool_code: { label: 'Python Executor', x: 500, y: 400, type: 'tool' },
  
  eval: { label: 'AI Evaluator', x: 720, y: 150, type: 'verification' },
  safety: { label: 'Guardrails Check', x: 720, y: 330, type: 'verification' },
  
  approve: { label: 'HITL Approval', x: 920, y: 240, type: 'approval' },
  
  output: { label: 'Response Compiler', x: 1100, y: 240, type: 'output' }
};

// Connective edges
const EDGES_CONFIG = [
  { from: 'ingest', to: 'embed', path: 'M 100 150 L 280 150' },
  { from: 'context', to: 'router', path: 'M 100 330 L 280 330' },
  { from: 'embed', to: 'router', path: 'M 280 150 L 280 330' },
  
  { from: 'router', to: 'tool_db', path: 'M 280 330 C 390 330, 390 80, 500 80' },
  { from: 'router', to: 'tool_web', path: 'M 280 330 C 390 330, 390 240, 500 240' },
  { from: 'router', to: 'tool_code', path: 'M 280 330 C 390 330, 390 400, 500 400' },
  
  { from: 'tool_db', to: 'eval', path: 'M 500 80 C 610 80, 610 150, 720 150' },
  { from: 'tool_web', to: 'eval', path: 'M 500 240 C 610 240, 610 150, 720 150' },
  { from: 'tool_code', to: 'safety', path: 'M 500 400 C 610 400, 610 330, 720 330' },
  
  { from: 'eval', to: 'safety', path: 'M 720 150 L 720 330' },
  { from: 'eval', to: 'approve', path: 'M 720 150 C 820 150, 820 240, 920 240' },
  { from: 'safety', to: 'approve', path: 'M 720 330 C 820 330, 820 240, 920 240' },
  
  { from: 'approve', to: 'output', path: 'M 920 240 L 1100 240' }
];

const GraphStudio = ({ onBack }) => {
  const [selectedDataset, setSelectedDataset] = useState('csv_billing');
  const [llmModel, setLlmModel] = useState('claude');
  const [hitlEnabled, setHitlEnabled] = useState(true);
  const [chunkSize, setChunkSize] = useState(256);
  
  const [activeNodes, setActiveNodes] = useState([]);
  const [completedNodes, setCompletedNodes] = useState([]);
  const [selectedNode, setSelectedNode] = useState('ingest');
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState([]);
  
  const [metrics, setMetrics] = useState({
    latency: 0,
    promptTokens: 0,
    completionTokens: 0,
    cost: 0.00
  });

  const consoleRef = useRef(null);

  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [logs]);

  const activeDataset = DATASET_FEEDS[selectedDataset];

  // Price matrix
  const modelConfig = {
    claude: { promptPrice: 0.000003, compPrice: 0.000015, latencyMult: 1.0 },
    gpt4: { promptPrice: 0.000005, compPrice: 0.000015, latencyMult: 0.9 },
    llama: { promptPrice: 0.0000007, compPrice: 0.0000009, latencyMult: 0.5 }
  };

  const handleDatasetChange = (key) => {
    setSelectedDataset(key);
    setActiveNodes([]);
    setCompletedNodes([]);
    setSelectedNode('ingest');
    setLogs([{ type: 'system', text: `[SYSTEM] Switched dataset feed to ${DATASET_FEEDS[key].name}. Ready.` }]);
    setMetrics({ latency: 0, promptTokens: 0, completionTokens: 0, cost: 0.00 });
  };

  const executePipeline = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setActiveNodes([]);
    setCompletedNodes([]);
    setSelectedNode('ingest');
    setLogs([]);

    const traceSteps = activeDataset.trace;
    let totalLatency = 0;
    let totalPrompt = 0;
    let totalComp = 0;

    for (let i = 0; i < traceSteps.length; i++) {
      const nodeId = traceSteps[i];
      const nodeConf = NODES_CONFIG[nodeId];
      
      // Node becomes active
      setActiveNodes([nodeId]);
      setSelectedNode(nodeId);
      
      setLogs(prev => [...prev, `[PROCESS] Active Node: Node ${String(i+1).padStart(2, '0')} (${nodeConf.label}) firing...`]);

      const stepLatency = Math.round((Math.random() * 300 + 150) * modelConfig[llmModel].latencyMult);
      const stepPrompt = Math.round(chunkSize * (1 + Math.random() * 0.4));
      const stepComp = Math.round(120 * (1 + Math.random() * 0.3));

      totalLatency += stepLatency;
      totalPrompt += stepPrompt;
      totalComp += stepComp;

      const currentCost = (totalPrompt * modelConfig[llmModel].promptPrice) + (totalComp * modelConfig[llmModel].compPrice);

      setMetrics({
        latency: totalLatency,
        promptTokens: totalPrompt,
        completionTokens: totalComp,
        cost: parseFloat(currentCost.toFixed(4))
      });

      // Special Logs per Node type
      if (nodeId === 'router') {
        const routeData = activeDataset.nodes.router.outputs;
        setLogs(prev => [...prev, `[ROUTER] Classifying input schema. Routing signals to: ${routeData.target_tool || routeData.target_tools}`]);
      }

      if (nodeId === 'eval') {
        const evalData = activeDataset.nodes.eval.outputs;
        setLogs(prev => [...prev, `[EVAL] Accuracy rating: ${evalData.groundedness || evalData.precision || evalData.similarity_confidence} | Verdict: ${evalData.decision}`]);
      }

      if (nodeId === 'approve') {
        const appData = activeDataset.nodes.approve.outputs;
        if (appData.status === 'AWAITING_ADMIN_SIGN_OFF' && hitlEnabled) {
          setLogs(prev => [...prev, `[HITL_GATE] Flow blocked. Waiting for manual override validation from: ${appData.user}...`]);
          await new Promise(resolve => setTimeout(resolve, 1500));
          setLogs(prev => [...prev, `[HITL_GATE] Signature validation verified. Flow APPROVED.`]);
        } else if (appData.status === 'AWAITING_FRAUD_ANALYST_CONFIRMATION' && hitlEnabled) {
          setLogs(prev => [...prev, `[HITL_GATE] Gating transaction limit lock. Confirming with: ${appData.user}...`]);
          await new Promise(resolve => setTimeout(resolve, 1500));
          setLogs(prev => [...prev, `[HITL_GATE] Analyst clearance: VERIFIED.`]);
        } else {
          setLogs(prev => [...prev, `[HITL_GATE] Human approval bypassed: ${appData.status}`]);
        }
      }

      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Node complete
      setActiveNodes([]);
      setCompletedNodes(prev => [...prev, nodeId]);
    }

    setLogs(prev => [...prev, `[SUCCESS] DAG Trace execute complete. Latency: ${totalLatency}ms | Token Cost: $${(totalPrompt * modelConfig[llmModel].promptPrice + totalComp * modelConfig[llmModel].compPrice).toFixed(4)}`]);
    setIsRunning(false);
  };

  // Helper check if connection is active/firing
  const isConnectionActive = (edge) => {
    if (!isRunning) return false;
    const fromIndex = activeDataset.trace.indexOf(edge.from);
    const toIndex = activeDataset.trace.indexOf(edge.to);
    
    // An edge is active if the "from" node is currently running or completed, and "to" is next or active
    const activeIndex = activeDataset.trace.indexOf(activeNodes[0]);
    if (activeIndex === -1) return false;

    // Edge is currently firing if active node is "from" and "to" is the next step in trace
    return activeDataset.trace[activeIndex] === edge.from && activeDataset.trace[activeIndex + 1] === edge.to;
  };

  const isConnectionCompleted = (edge) => {
    const fromIndex = completedNodes.indexOf(edge.from);
    const toIndex = completedNodes.indexOf(edge.to);
    return fromIndex !== -1 && toIndex !== -1;
  };

  return (
    <div className="studio-container animate-fade-in">
      {/* Top Header */}
      <header className="studio-header">
        <div className="studio-title-row">
          <button onClick={onBack} className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>
            <ArrowLeft size={16} /> Back
          </button>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 600, fontFamily: 'var(--font-display)' }}>Graph Studio</h2>
          <span className="studio-badge-glow">Neural DAG Builder</span>
        </div>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          State-of-the-Art Visual Agent Graph Designer
        </div>
      </header>

      {/* Grid Layout */}
      <div className="studio-layout">
        
        {/* Left Config Panel */}
        <aside className="config-sidebar">
          <h3 className="config-section-title"><GitBranch size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} /> Parameters</h3>
          
          <div className="form-group">
            <label>Select Dataset Feed</label>
            <select 
              value={selectedDataset} 
              onChange={(e) => handleDatasetChange(e.target.value)}
              className="studio-select"
              disabled={isRunning}
            >
              <option value="csv_billing">AWS Billing Logs (CSV)</option>
              <option value="json_threat">MITRE Attack Feed (JSON)</option>
              <option value="md_docs">Enterprise Manuals (MD)</option>
              <option value="csv_fraud">Financial Fraud Spike (CSV)</option>
              <option value="fasta_protein">Protein Alignments (FASTA)</option>
              <option value="csv_sentiment">Reviews Sentiment (CSV)</option>
            </select>
          </div>

          <div className="form-group">
            <label>Reasoner LLM Core</label>
            <select 
              value={llmModel} 
              onChange={(e) => setLlmModel(e.target.value)}
              className="studio-select"
              disabled={isRunning}
            >
              <option value="claude">Claude 3.5 Sonnet</option>
              <option value="gpt4">GPT-4o</option>
              <option value="llama">Llama 3 70B (Local)</option>
            </select>
          </div>

          <div className="form-group slider-container">
            <label>Frame Buffer size (Tokens)</label>
            <div className="slider-labels">
              <span>128</span>
              <span style={{ color: 'var(--text-accent)' }}>{chunkSize}</span>
              <span>512</span>
            </div>
            <input 
              type="range" 
              min="128" 
              max="512" 
              step="64"
              value={chunkSize}
              onChange={(e) => setChunkSize(parseInt(e.target.value))}
              className="studio-input"
              style={{ cursor: 'pointer' }}
              disabled={isRunning}
            />
          </div>

          <div className="form-group">
            <div className="toggle-switch">
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>HITL Verification Gate</span>
              <label>
                <input 
                  type="checkbox" 
                  checked={hitlEnabled}
                  onChange={(e) => setHitlEnabled(e.target.checked)}
                  className="toggle-input"
                  disabled={isRunning}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
          
          <div className="form-group" style={{ marginTop: 'auto', gap: '0.35rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Active Schema Sample:</span>
            <pre style={{ background: 'rgba(0,0,0,0.4)', padding: '0.5rem', borderRadius: '8px', fontSize: '0.65rem', overflowX: 'auto', whiteSpace: 'pre-wrap', color: '#94a3b8', maxHeight: '110px' }}>
              {activeDataset.sample}
            </pre>
          </div>
        </aside>

        {/* Center Neural Canvas */}
        <main className="canvas-panel">
          <div className="canvas-controls">
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Active Agent Topology DAG</h3>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Click nodes to audit their internal payload states.</span>
            </div>
            <button 
              onClick={executePipeline} 
              className="btn btn-primary"
              disabled={isRunning}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <Play size={16} /> Execute Pipeline
            </button>
          </div>

          <div className="canvas-scroll-container">
            <div className="canvas-visual-area">
              
              {/* Dynamic SVG Connections Overlay */}
              <svg className="svg-overlay">
                {EDGES_CONFIG.map((edge, index) => {
                  const active = isConnectionActive(edge);
                  const completed = isConnectionCompleted(edge);
                  return (
                    <g key={index}>
                      {/* Connection Line */}
                      <path 
                        d={edge.path} 
                        className={`edge-path ${active ? 'active' : ''} ${completed ? 'completed' : ''}`}
                      />
                      {/* Firing Light Beam (Circle) moving along connection */}
                      {active && (
                        <circle r="4" className="firing-signal">
                          <animateMotion 
                            path={edge.path} 
                            dur="1s" 
                            repeatCount="indefinite" 
                          />
                        </circle>
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* Render Nodes relative to layout coordinates map */}
              <div className="nodes-layer">
                {Object.entries(NODES_CONFIG).map(([nodeId, node]) => {
                  const isActive = activeNodes.includes(nodeId);
                  const isCompleted = completedNodes.includes(nodeId);
                  return (
                    <div 
                      key={nodeId}
                      className={`graph-node type-${node.type} ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                      style={{ left: `${node.x}px`, top: `${node.y}px` }}
                      onClick={() => setSelectedNode(nodeId)}
                    >
                      <div className="node-type">Node: {nodeId.toUpperCase()}</div>
                      <div className="node-title">{node.label}</div>
                      <div className="node-type" style={{ color: 'var(--text-accent)' }}>
                        {isActive ? 'FIRING' : isCompleted ? 'DONE' : 'STANDBY'}
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>

          {/* Typewriter logs */}
          <div ref={consoleRef} className="console-card">
            {logs.map((log, i) => (
              <div key={i} style={{ marginBottom: '2px' }}>
                {log}
              </div>
            ))}
          </div>
        </main>

        {/* Right Info Sidebar */}
        <aside className="payload-sidebar">
          {/* Performance Profile metrics */}
          <div className="config-sidebar" style={{ padding: '1.25rem' }}>
            <h3 className="config-section-title"><Activity size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} /> Performance Profile</h3>
            
            <div className="metric-grid-mini">
              <div className="mini-metric-tile">
                <span className="mini-metric-val">{metrics.latency}ms</span>
                <span className="mini-metric-lbl">Total Latency</span>
              </div>
              <div className="mini-metric-tile">
                <span className="mini-metric-val">${metrics.cost.toFixed(4)}</span>
                <span className="mini-metric-lbl">Est. Cost</span>
              </div>
              <div className="mini-metric-tile">
                <span className="mini-metric-val">{metrics.promptTokens}</span>
                <span className="mini-metric-lbl">Prompt Tokens</span>
              </div>
              <div className="mini-metric-tile">
                <span className="mini-metric-val">{metrics.completionTokens}</span>
                <span className="mini-metric-lbl">Comp. Tokens</span>
              </div>
            </div>
            
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              Pricing maps token payloads directly to model API price grids.
            </div>
          </div>

          {/* Inspector Panel */}
          <div className="inspector-card">
            <div className="inspector-header">
              <h4 className="inspector-title">State Payload Inspector</h4>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                Active Node: <span style={{ color: 'var(--text-accent)' }}>{selectedNode.toUpperCase()}</span>
              </span>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', flexGrow: 1 }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '2px' }}>Node Inputs:</span>
                <div className="inspector-data-box">
                  {JSON.stringify(activeDataset.nodes[selectedNode]?.inputs || {}, null, 2)}
                </div>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '2px' }}>Node Outputs:</span>
                <div className="inspector-data-box" style={{ maxHeight: '160px' }}>
                  {JSON.stringify(activeDataset.nodes[selectedNode]?.outputs || {}, null, 2)}
                </div>
              </div>
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
};

export default GraphStudio;
