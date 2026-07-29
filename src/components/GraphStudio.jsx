import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Play, Cpu, Check, AlertCircle, RefreshCw, Layers, ShieldCheck, UserCheck } from 'lucide-react';
import './GraphStudio.css';

const DATASET_FEEDS = {
  csv: {
    name: 'AWS Billing Logs (CSV)',
    query: 'Identify computed spend anomalies in May logs',
    rows: 105,
    sample: 'Date,Service,Cost,Instance\n01-May,EC2,$450,m5.large\n15-May,EC2,$1800,c5.xlarge\n20-May,Spot,$380,r5.large',
    nodes: {
      ingest: {
        inputs: { query: 'Analyze May compute costs', dataset: 'aws_billing.csv', size: '42KB' },
        outputs: { status: 'LOADED', rows_ingested: 105, schema: ['Date', 'Service', 'Cost', 'Instance'] }
      },
      route: {
        inputs: { schema: ['Date', 'Service', 'Cost', 'Instance'], intent: 'anomaly_detection' },
        outputs: { selected_route: 'FinOps_Anomaly_Agent', confidence: 0.99 }
      },
      process: {
        inputs: { route: 'FinOps_Anomaly_Agent', method: 'Z-Score_Analysis', threshold: 2.5 },
        outputs: { anomalies_found: 1, z_score: 2.89, details: 'EC2 compute cost spike on May 15 ($1800)' }
      },
      eval: {
        inputs: { prediction: 'Cost spike due to weekend dev-envs left running', citations: ['billing_logs_may'] },
        outputs: { groundedness: 0.98, faithfulness: 1.00, hallucination_detected: false, decision: 'GATE_PASSED' }
      },
      approve: {
        inputs: { recommendation: 'Transition dev instances to Spot scheduler on weekends', saving_estimate: '$14,200/mo' },
        outputs: { approval_required: true, status: 'AWAITING_HUMAN_SIGN_OFF', user: 'Admin' }
      },
      output: {
        inputs: { sign_off: 'APPROVED', executor: 'AWS_Lambda_Spot_Scheduler' },
        outputs: { execution_status: 'SUCCESS', action: 'Spot instances scheduler activated for c5.xlarge cluster' }
      }
    }
  },
  json: {
    name: 'Cybersecurity Threat Alerts (JSON)',
    query: 'Correlate alerts against MITRE framework',
    rows: 45,
    sample: '{"alert_id": "AL-9938a", "ip": "185.190.140.2", "port": 443, "severity": "CRITICAL"}',
    nodes: {
      ingest: {
        inputs: { query: 'Correlate IOCs', alert_source: 'syslog_sensor_03', protocol: 'TCP' },
        outputs: { status: 'PARSED', alert_id: 'AL-9938a', ioc_ip: '185.190.140.2' }
      },
      route: {
        inputs: { alert_severity: 'CRITICAL', threat_domain: 'Network' },
        outputs: { selected_route: 'MITRE_Threat_Correlator', confidence: 0.97 }
      },
      process: {
        inputs: { query_ip: '185.190.140.2', query_type: 'FAISS_Vector_Search' },
        outputs: { matched_threat: 'APT29 (Cozy Bear)', mitre_technique: 'T1566 (Phishing)', severity: 'Critical' }
      },
      eval: {
        inputs: { security_assessment: 'Active spear-phishing payload match' },
        outputs: { precision: 0.98, safety_score: 0.99, decision: 'ALERT_CONFIRMED' }
      },
      approve: {
        inputs: { action: 'Quarantine user + Block IP at gateway', bypass_hitl_on_critical: true },
        outputs: { approval_required: false, status: 'AUTO_BYPASSED_ON_CRITICAL_IOC' }
      },
      output: {
        inputs: { trigger: 'AUTO_BLOCK', firewall_controller: 'PaloAlto_API' },
        outputs: { status: 'BLOCK_COMMAND_DEPLOYED', blocked_ip: '185.190.140.2', duration: 'Permanent' }
      }
    }
  },
  md: {
    name: 'Enterprise Documentation (MD)',
    query: 'What is the bearer token validation protocol?',
    rows: 420,
    sample: '# API Auth Guidelines\nValidate bearer signature using RS256 algorithm.\nEnsure audience claims are verified.',
    nodes: {
      ingest: {
        inputs: { query: 'Bearer token validation protocol', chunks: 420, chunk_size: 512 },
        outputs: { status: 'INDEXED', vector_store: 'ChromaDB', embedding: 'text-embedding-3-small' }
      },
      route: {
        inputs: { query_type: 'Text_QA', language: 'en' },
        outputs: { selected_route: 'Semantic_RAG_QA', confidence: 0.94 }
      },
      process: {
        inputs: { query_vector: 'Array(1536)', k_neighbors: 3 },
        outputs: { matched_documents: ['api_auth.md', 'security_spec.md'], top_similarity: 0.82 }
      },
      eval: {
        inputs: { answer_synthesis: 'Validate bearer token signature using RS256 algorithm.' },
        outputs: { faithfulness: 0.96, answer_relevance: 0.95, citation_accuracy: 1.00, decision: 'RELEASE_APPROVED' }
      },
      approve: {
        inputs: { QA_mode: 'Read-Only' },
        outputs: { approval_required: false, status: 'BYPASSED_FOR_QA' }
      },
      output: {
        inputs: { compilation: 'Markdown Answer Output' },
        outputs: { answer: 'To validate bearer token protocols, retrieve the token from authorization header, decode using RS256, and verify target claims.', citations: ['api_auth.md:L45'] }
      }
    }
  }
};

const GraphStudio = ({ onBack }) => {
  const [selectedDataset, setSelectedDataset] = useState('csv');
  const [llmModel, setLlmModel] = useState('claude');
  const [hitlEnabled, setHitlEnabled] = useState(true);
  const [chunkSize, setChunkSize] = useState(256);
  
  const [currentNodeIndex, setCurrentNodeIndex] = useState(-1);
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

  // Token & Cost Multipliers
  const modelConfig = {
    claude: { promptPrice: 0.000003, compPrice: 0.000015, latencyMult: 1.0 },
    gpt4: { promptPrice: 0.000005, compPrice: 0.000015, latencyMult: 0.9 },
    llama: { promptPrice: 0.0000007, compPrice: 0.0000009, latencyMult: 0.5 }
  };

  const handleDatasetChange = (key) => {
    setSelectedDataset(key);
    setCurrentNodeIndex(-1);
    setSelectedNode('ingest');
    setLogs([{ type: 'system', text: `[SYSTEM] Switched dataset to ${DATASET_FEEDS[key].name}. Click execute pipeline to begin trace.` }]);
    setMetrics({ latency: 0, promptTokens: 0, completionTokens: 0, cost: 0.00 });
  };

  // Node array for linear mapping
  const nodeList = ['ingest', 'route', 'process', 'eval', 'approve', 'output'];

  const executePipeline = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setCurrentNodeIndex(0);
    setSelectedNode('ingest');
    setLogs([]);

    const steps = [
      { id: 'ingest', name: 'Query Ingest', log: '[INGEST] Reading query and indexing data feed...' },
      { id: 'route', name: 'Dynamic Router', log: '[ROUTER] Performing semantic routing selection...' },
      { id: 'process', name: 'Vector / Code Process', log: '[PROCESS] Running vector search and processing code modules...' },
      { id: 'eval', name: 'AI Evaluation Gate', log: '[EVALUATION] Auditing prompt faithfulness and citations...' },
      { id: 'approve', name: 'Human Approval Gate', log: '[APPROVAL] Verifying human-in-the-loop policies...' },
      { id: 'output', name: 'Target Output', log: '[OUTPUT] Compiling final response payload.' }
    ];

    let totalLatency = 0;
    let totalPrompt = 0;
    let totalComp = 0;

    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];
      setCurrentNodeIndex(i);
      setSelectedNode(step.id);

      // Generate step logs
      setLogs(prev => [...prev, step.log]);

      // Calculate latency, token, and cost metrics
      const stepLatency = Math.round((Math.random() * 400 + 200) * modelConfig[llmModel].latencyMult);
      const stepPrompt = Math.round(chunkSize * (1 + Math.random() * 0.5));
      const stepComp = Math.round(150 * (1 + Math.random() * 0.4));
      
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

      // Special verification log
      if (step.id === 'eval') {
        const evalData = activeDataset.nodes.eval.outputs;
        setLogs(prev => [...prev, `[EVAL] Groundedness check: ${evalData.groundedness || evalData.precision} | Verdict: ${evalData.decision}`]);
      }

      if (step.id === 'approve') {
        const appData = activeDataset.nodes.approve.outputs;
        if (appData.approval_required && hitlEnabled) {
          setLogs(prev => [...prev, `[HITL] Gating execution. Waiting for sign-off from: ${appData.user}...`]);
          await new Promise(resolve => setTimeout(resolve, 1500));
          setLogs(prev => [...prev, `[HITL] Sign-off received: APPROVED.`]);
        } else {
          setLogs(prev => [...prev, `[HITL] HITL bypass configured: ${appData.status}`]);
        }
      }

      await new Promise(resolve => setTimeout(resolve, 1200));
    }

    setLogs(prev => [...prev, `[SYSTEM] Pipeline run completed successfully in ${totalLatency}ms. Total Cost: $${(totalPrompt * modelConfig[llmModel].promptPrice + totalComp * modelConfig[llmModel].compPrice).toFixed(4)}`]);
    setIsRunning(false);
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
          <span className="studio-badge-glow">Sandbox v1.0</span>
        </div>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          Design Studio for Agentic Workflows
        </div>
      </header>

      {/* Grid Layout */}
      <div className="studio-layout">
        
        {/* Left Config Panel */}
        <aside className="config-sidebar">
          <h3 className="config-section-title"><Layers size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} /> Setup Parameters</h3>
          
          <div className="form-group">
            <label>Select Dataset Feed</label>
            <select 
              value={selectedDataset} 
              onChange={(e) => handleDatasetChange(e.target.value)}
              className="studio-select"
              disabled={isRunning}
            >
              <option value="csv">AWS Billing Logs (CSV)</option>
              <option value="json">MITRE Attack Feed (JSON)</option>
              <option value="md">Enterprise Manuals (MD)</option>
            </select>
          </div>

          <div className="form-group">
            <label>Select LLM Model</label>
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
            <label>Chunk Frame Size (Tokens)</label>
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
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Human-in-the-loop Gate</span>
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
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Sample Data Record:</span>
            <pre style={{ background: 'rgba(0,0,0,0.4)', padding: '0.5rem', borderRadius: '8px', fontSize: '0.65rem', overflowX: 'auto', whiteSpace: 'pre-wrap', color: '#94a3b8' }}>
              {activeDataset.sample}
            </pre>
          </div>
        </aside>

        {/* Center Node Canvas */}
        <main className="canvas-panel">
          <div className="canvas-controls">
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Interactive Flow Editor</h3>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Click nodes to inspect current state payload variables.</span>
            </div>
            <button 
              onClick={executePipeline} 
              className="btn btn-primary"
              disabled={isRunning}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <Play size={16} /> Execute Workflow
            </button>
          </div>

          <div className="canvas-visual-area">
            {/* Connection Edges Overlay */}
            <svg className="svg-overlay">
              {/* Line 1: Ingest to Route */}
              <path 
                d="M 230 45 L 230 110" 
                className={`edge-path ${currentNodeIndex >= 1 ? 'completed' : currentNodeIndex === 0 ? 'active' : ''}`} 
              />
              {/* Line 2: Route to Process */}
              <path 
                d="M 230 145 L 230 210" 
                className={`edge-path ${currentNodeIndex >= 2 ? 'completed' : currentNodeIndex === 1 ? 'active' : ''}`} 
              />
              {/* Line 3: Process to Eval */}
              <path 
                d="M 230 245 L 230 310" 
                className={`edge-path ${currentNodeIndex >= 3 ? 'completed' : currentNodeIndex === 2 ? 'active' : ''}`} 
              />
              {/* Line 4: Eval to Approve */}
              <path 
                d="M 230 345 L 230 410" 
                className={`edge-path ${currentNodeIndex >= 4 ? 'completed' : currentNodeIndex === 3 ? 'active' : ''}`} 
              />
              {/* Line 5: Approve to Output */}
              <path 
                d="M 230 445 L 230 510" 
                className={`edge-path ${currentNodeIndex >= 5 ? 'completed' : currentNodeIndex === 4 ? 'active' : ''}`} 
              />
            </svg>

            {/* Vertical Stack of Nodes */}
            <div className="nodes-grid">
              
              {/* Node 1: Ingest */}
              <div 
                className={`graph-node ${selectedNode === 'ingest' ? 'active' : ''} ${currentNodeIndex > 0 ? 'completed' : ''}`}
                onClick={() => setSelectedNode('ingest')}
              >
                <div className="node-type">Node 01</div>
                <div className="node-title">Query Ingest</div>
                <div className="node-type">Input Parser</div>
              </div>

              {/* Node 2: Route */}
              <div 
                className={`graph-node ${selectedNode === 'route' ? 'active' : ''} ${currentNodeIndex > 1 ? 'completed' : ''}`}
                onClick={() => setSelectedNode('route')}
              >
                <div className="node-type">Node 02</div>
                <div className="node-title">Dynamic Router</div>
                <div className="node-type">Classifier</div>
              </div>

              {/* Node 3: Process */}
              <div 
                className={`graph-node ${selectedNode === 'process' ? 'active' : ''} ${currentNodeIndex > 2 ? 'completed' : ''}`}
                onClick={() => setSelectedNode('process')}
              >
                <div className="node-type">Node 03</div>
                <div className="node-title">Vector / Code Process</div>
                <div className="node-type">Tool Executor</div>
              </div>

              {/* Node 4: Eval */}
              <div 
                className={`graph-node ${selectedNode === 'eval' ? 'active' : ''} ${currentNodeIndex > 3 ? 'completed' : ''}`}
                onClick={() => setSelectedNode('eval')}
              >
                <div className="node-type">Node 04</div>
                <div className="node-title"><ShieldCheck size={12} style={{ display: 'inline', marginRight: '4px' }} /> AI Eval Gate</div>
                <div className="node-type">Verifier</div>
              </div>

              {/* Node 5: Approve */}
              <div 
                className={`graph-node ${selectedNode === 'approve' ? 'active' : ''} ${currentNodeIndex > 4 ? 'completed' : ''}`}
                onClick={() => setSelectedNode('approve')}
              >
                <div className="node-type">Node 05</div>
                <div className="node-title"><UserCheck size={12} style={{ display: 'inline', marginRight: '4px' }} /> Human Approval</div>
                <div className="node-type">Gating Gate</div>
              </div>

              {/* Node 6: Output */}
              <div 
                className={`graph-node ${selectedNode === 'output' ? 'active' : ''} ${currentNodeIndex > 5 ? 'completed' : ''}`}
                onClick={() => setSelectedNode('output')}
              >
                <div className="node-type">Node 06</div>
                <div className="node-title">Target Output</div>
                <div className="node-type">Response Compiler</div>
              </div>

            </div>
          </div>

          {/* Console output */}
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
          {/* Metrics Panel */}
          <div className="config-sidebar" style={{ padding: '1.25rem' }}>
            <h3 className="config-section-title"><Cpu size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} /> Performance Profile</h3>
            
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
              Pricing calculation dynamically correlates token frames to model tier.
            </div>
          </div>

          {/* Inspector Panel */}
          <div className="inspector-card">
            <div className="inspector-header">
              <h4 className="inspector-title">State Payload Inspector</h4>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                Active Node: <span style={{ color: 'var(--text-accent)' }}>{selectedNode}</span>
              </span>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', flexGrow: 1 }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '2px' }}>Node Inputs:</span>
                <div className="inspector-data-box">
                  {JSON.stringify(activeDataset.nodes[selectedNode].inputs, null, 2)}
                </div>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '2px' }}>Node Outputs:</span>
                <div className="inspector-data-box" style={{ maxHeight: '160px' }}>
                  {JSON.stringify(activeDataset.nodes[selectedNode].outputs, null, 2)}
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
