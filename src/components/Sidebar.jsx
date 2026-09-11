import React, { useState, useEffect } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { Mail, Calendar, FileText, Cpu } from 'lucide-react';
import './Sidebar.css';

const TITLES = [
  'Forward Deployed AI Engineer',
  'Enterprise AI Systems Architect',
  'LangGraph & RAG Specialist',
  'Multi-Agent Systems Builder',
];

const NAV_ITEMS = [
  { id: 'hero', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Stack' },
];

const STATS = [
  { value: '8+', label: 'Years' },
  { value: '5', label: 'Companies' },
  { value: '40%', label: 'Cost Saved' },
  { value: '60%', label: 'RAG Accuracy' },
];

const PROFILE_IMAGE = "https://customer-assets.emergentagent.com/job_62aa6f42-eb1d-43a7-9fbe-6dc3252347a9/artifacts/ao0j8wiu_WhatsApp%20Image%202025-01-26%20at%203.00.01%20PM%20%281%29.jpeg";

export default function Sidebar({ activeSection, onShowResume, onLaunchStudio }) {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = TITLES[titleIndex];
    let timeout;
    if (!isDeleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60);
    } else if (!isDeleting && displayed.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 30);
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false);
      setTitleIndex((i) => (i + 1) % TITLES.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, titleIndex]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="sidebar">
      <div className="sidebar-inner">
        <div className="sidebar-profile">
          <div className="sidebar-avatar-ring">
            <img src={PROFILE_IMAGE} alt="Manish Jaiswal" className="sidebar-avatar" />
            <span className="sidebar-status-dot" title="Open to FDE Roles" />
          </div>
          <div className="sidebar-identity">
            <h1 className="sidebar-name">Manish Jaiswal</h1>
            <div className="sidebar-title-wrap">
              <span className="sidebar-title">{displayed}</span>
              <span className="sidebar-cursor">|</span>
            </div>
          </div>
        </div>

        <div className="availability-badge">
          <span className="avail-dot" />
          <span>Open to FDE &amp; AI Engineer Roles</span>
        </div>

        <p className="sidebar-pitch">
          Architecting production-grade multi-agent systems, enterprise RAG pipelines, and LangGraph state machines deployed into Fortune 500 infrastructures.
        </p>

        <nav className="sidebar-nav">
          {NAV_ITEMS.map(({ id, label }) => (
            <button
              key={id}
              className={`sidebar-nav-item ${activeSection === id ? 'active' : ''}`}
              onClick={() => scrollTo(id)}
            >
              <span className="nav-indicator" />
              <span className="nav-label">{label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-stats">
          {STATS.map(({ value, label }) => (
            <div key={label} className="stat-tile">
              <span className="stat-value">{value}</span>
              <span className="stat-label">{label}</span>
            </div>
          ))}
        </div>

        <div className="sidebar-ctas">
          <button className="cta-btn cta-primary" onClick={onShowResume}>
            <FileText size={15} />
            View Resume
          </button>
          <button className="cta-btn cta-secondary" onClick={onLaunchStudio}>
            <Cpu size={15} />
            Graph Studio
          </button>
        </div>

        <div className="sidebar-socials">
          <a href="https://github.com/jaiswalbuilds" target="_blank" rel="noopener noreferrer" className="social-link">
            <FaGithub size={18} />
          </a>
          <a href="https://www.linkedin.com/in/manish-kumar-74ab6210a/" target="_blank" rel="noopener noreferrer" className="social-link">
            <FaLinkedin size={18} />
          </a>
          <a href="mailto:jaiswalmanish060@gmail.com" className="social-link">
            <Mail size={18} />
          </a>
          <a href="https://calendly.com/jaiswalmanish060/book-a-call-with-manish" target="_blank" rel="noopener noreferrer" className="social-link social-calendly">
            <Calendar size={18} />
            <span>Book a Call</span>
          </a>
        </div>
      </div>
    </div>
  );
}
