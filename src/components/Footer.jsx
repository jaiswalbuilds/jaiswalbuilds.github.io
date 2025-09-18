import React from 'react';
import { Mail, BrainCircuit } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="container footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="#" className="logo">
              <BrainCircuit className="logo-icon" />
              <span className="logo-text text-gradient">JaiswalBuilds</span>
            </a>
            <p className="footer-bio">
              Forward Deployed AI Engineer architecting the future of intelligent systems. Let's build something extraordinary.
            </p>
          </div>
          
          <div className="footer-links-group">
            <h4>Connect</h4>
            <div className="footer-socials">
              <a href="mailto:jaiswalmanish060@gmail.com" className="footer-link">
                <Mail size={18} /> jaiswalmanish060@gmail.com
              </a>
              <a href="https://github.com/jaiswalbuilds" target="_blank" rel="noopener noreferrer" className="footer-link">
                <FaGithub size={18} /> GitHub
              </a>
              <a href="https://www.linkedin.com/in/manish-kumar-74ab6210a/" target="_blank" rel="noopener noreferrer" className="footer-link">
                <FaLinkedin size={18} /> LinkedIn
              </a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Manish Jaiswal. All rights reserved.</p>
          <p className="powered-by">Powered by Agentic AI & Premium Engineering.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

// Refactored update: 2025-09-11 check

// Refactored update: 2025-09-18 check
