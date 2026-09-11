import React from 'react';
import './Skills.css';

const STACK_LAYERS = [
  {
    category: 'Agentic Orchestration',
    icon: '🤖',
    color: 'var(--accent-violet)',
    skills: ['LangGraph', 'LangChain', 'LlamaIndex', 'CrewAI', 'AutoGen', 'MCP']
  },
  {
    category: 'LLM Serving & Gateway',
    icon: '⚡',
    color: 'var(--accent-cyan)',
    skills: ['OpenAI', 'Anthropic', 'Gemini', 'Ollama', 'LiteLLM', 'AWS Bedrock']
  },
  {
    category: 'Vector & Storage',
    icon: '🗄️',
    color: 'var(--accent-emerald)',
    skills: ['FAISS', 'Pinecone', 'ChromaDB', 'Qdrant', 'pgvector', 'Redis']
  },
  {
    category: 'Evaluation & Observability',
    icon: '📊',
    color: 'var(--accent-amber)',
    skills: ['LangSmith', 'Ragas', 'TruLens', 'Arize Phoenix', 'OpenTelemetry']
  },
  {
    category: 'Cloud & Infrastructure',
    icon: '☁️',
    color: '#60A5FA',
    skills: ['AWS', 'GCP', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions']
  },
  {
    category: 'Languages & APIs',
    icon: '💻',
    color: '#F472B6',
    skills: ['Python', 'FastAPI', 'SQL', 'Java', 'REST', 'GraphQL']
  },
];

export default function Skills() {
  return (
    <div className="skills-section">
      <div className="section-header">
        <span className="section-label">// Stack</span>
        <h2 className="section-title">Technical Skills</h2>
      </div>

      <div className="skills-grid">
        {STACK_LAYERS.map((layer, idx) => (
          <div key={idx} className="skill-layer">
            <div className="skill-layer-header">
              <span className="skill-layer-icon">{layer.icon}</span>
              <span className="skill-layer-name" style={{ color: layer.color }}>{layer.category}</span>
            </div>
            <div className="skill-pills">
              {layer.skills.map(skill => (
                <span key={skill} className="skill-pill">{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
