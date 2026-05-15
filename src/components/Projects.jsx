import React from 'react';
import { ExternalLink, Box } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import './Projects.css';

// Importing generated assets
import safexImg from '../assets/safex_dashboard_1778827701816.png';
import interviewImg from '../assets/llm_interview_agent_1778827717107.png';

const projects = [
  {
    title: 'Autonomous LLM Interview Agent',
    description: 'Multi-turn agentic system with memory, tool use, chain-of-thought style reasoning, and LLM evaluation pipeline for automated interviewing processes.',
    tags: ['Agentic AI', 'LLMs', 'Python', 'Memory Management'],
    image: interviewImg,
    links: { github: '#', live: '#' }
  },
  {
    title: 'Safex — Enterprise AI Assistant',
    description: 'Full-stack LLM assistant built with FAISS and vector embeddings, yielding a 60% accuracy gain and 75% latency reduction in production.',
    tags: ['RAG', 'FAISS', 'Prompt Engineering', 'FastAPI'],
    image: safexImg,
    links: { github: '#', live: '#' }
  },
  {
    title: 'Financial Strategy AI Engine',
    description: 'Real-time ML pipeline with feature engineering, predictive scoring, and RAG-based risk alerting for robust financial strategies.',
    tags: ['Scikit-learn', 'Predictive AI', 'RAG', 'Pandas'],
    image: null,
    links: { github: '#', live: '#' }
  },
  {
    title: 'FinOps Agentic Automation',
    description: 'Agentic cloud cost optimisation across AWS, GCP, and Azure using anomaly detection algorithms.',
    tags: ['FinOps', 'Anomaly Detection', 'Cloud', 'Automation'],
    image: null,
    links: { github: '#', live: '#' }
  }
];

const Projects = () => {
  return (
    <section id="projects" className="projects-section">
      <div className="bg-gradient-glow" style={{ top: '20%', right: '-10%' }}></div>
      <div className="container">
        <h2 className="section-title text-gradient">AI Engineering Masterpieces</h2>
        
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card glass-panel">
              {project.image ? (
                <div className="project-image-container">
                  <img src={project.image} alt={project.title} className="project-image" />
                  <div className="project-overlay">
                    <a href={project.links.github} className="project-link"><FaGithub size={20} /></a>
                    <a href={project.links.live} className="project-link"><ExternalLink size={20} /></a>
                  </div>
                </div>
              ) : (
                <div className="project-image-container placeholder-img">
                  <Box size={48} className="placeholder-icon" />
                  <div className="project-overlay">
                    <a href={project.links.github} className="project-link"><FaGithub size={20} /></a>
                    <a href={project.links.live} className="project-link"><ExternalLink size={20} /></a>
                  </div>
                </div>
              )}
              
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
