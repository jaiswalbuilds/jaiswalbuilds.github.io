import React from 'react';
import { Database, Code2, Cpu, Network, PenTool } from 'lucide-react';
import './Skills.css';

const skillCategories = [
  {
    title: 'Languages & Core',
    icon: <Code2 className="skill-icon" />,
    skills: ['Python', 'SQL', 'Java', 'Shell', 'Solidity']
  },
  {
    title: 'Data Science',
    icon: <Database className="skill-icon" />,
    skills: ['NumPy', 'Pandas', 'Scikit-learn', 'Matplotlib', 'SciPy', 'Jupyter']
  },
  {
    title: 'Deep Learning',
    icon: <Cpu className="skill-icon" />,
    skills: ['PyTorch', 'TensorFlow', 'Keras', 'Transformers', 'Hugging Face', 'ONNX', 'Embeddings']
  },
  {
    title: 'LLMs & GenAI',
    icon: <Network className="skill-icon" />,
    skills: ['LangChain', 'LlamaIndex', 'RAG', 'Agentic AI', 'CrewAI', 'AutoGen', 'OpenAI', 'Gemini', 'Ollama']
  },
  {
    title: 'Vector Databases',
    icon: <Database className="skill-icon" />,
    skills: ['FAISS', 'Pinecone', 'ChromaDB', 'PostgreSQL']
  },
  {
    title: 'Tools & Platforms',
    icon: <PenTool className="skill-icon" />,
    skills: ['FastAPI', 'Docker', 'Kubernetes', 'Terraform', 'AWS', 'GCP', 'GitHub Actions']
  }
];

const Skills = () => {
  return (
    <section id="skills" className="skills-section">
      <div className="container">
        <h2 className="section-title text-gradient">Core ML Stack & Skills</h2>
        
        <div className="skills-grid">
          {skillCategories.map((category, index) => (
            <div key={index} className="skill-card glass-panel">
              <div className="skill-header">
                {category.icon}
                <h3 className="skill-title">{category.title}</h3>
              </div>
              <div className="skill-list">
                {category.skills.map((skill, i) => (
                  <span key={i} className="skill-badge">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;

// Refactored update: 2025-10-13 check

// Refactored update: 2025-10-14 check

// Refactored update: 2025-10-28 check

// Refactored update: 2025-10-29 check

// Refactored update: 2025-11-12 check

// Refactored update: 2025-12-12 check

// Refactored update: 2025-12-29 check

// Refactored update: 2026-01-02 check

// Refactored update: 2026-02-05 check

// Refactored update: 2026-02-11 check

// Refactored update: 2026-02-11 check

// Refactored update: 2026-02-19 check

// Refactored update: 2026-02-24 check

// Refactored update: 2026-02-25 check

// Refactored update: 2026-02-27 check
