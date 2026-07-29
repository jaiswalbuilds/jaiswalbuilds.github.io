import React from 'react';
import { Database, Code2, Cpu, Network, PenTool } from 'lucide-react';
import { motion } from 'framer-motion';
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
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="skills" className="skills-section">
      <div className="container">
        <motion.h2 
          className="section-title text-gradient"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          Core ML Stack & Skills
        </motion.h2>
        
        <motion.div 
          className="skills-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {skillCategories.map((category, index) => (
            <motion.div 
              key={index} 
              className="skill-card glass-panel"
              variants={cardVariants}
              whileHover={{ scale: 1.03, translateY: -4 }}
              transition={{ duration: 0.3 }}
            >
              <div className="skill-header">
                {category.icon}
                <h3 className="skill-title">{category.title}</h3>
              </div>
              <div className="skill-list">
                {category.skills.map((skill, i) => (
                  <motion.span 
                    key={i} 
                    className="skill-badge"
                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(59, 130, 246, 0.2)', borderColor: 'rgba(59, 130, 246, 0.5)' }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
