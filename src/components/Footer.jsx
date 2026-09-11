import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { Mail } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <span className="footer-copy">© {new Date().getFullYear()} Manish Jaiswal · Built with React + Vite</span>
        <div className="footer-links">
          <a href="https://github.com/jaiswalbuilds" target="_blank" rel="noopener noreferrer" className="footer-link">
            <FaGithub size={16} />
          </a>
          <a href="https://www.linkedin.com/in/manish-kumar-74ab6210a/" target="_blank" rel="noopener noreferrer" className="footer-link">
            <FaLinkedin size={16} />
          </a>
          <a href="mailto:jaiswalmanish060@gmail.com" className="footer-link">
            <Mail size={16} />
          </a>
          <span className="footer-badge">🟢 Open to FDE Roles</span>
        </div>
      </div>
    </footer>
  );
}
