import React, { useState, useEffect } from 'react';
import { Menu, X, BrainCircuit } from 'lucide-react';
import './Navbar.css';

const Navbar = ({ onLaunchStudio }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled((prev) => {
        if (!prev && window.scrollY > 60) return true;
        if (prev && window.scrollY < 20) return false;
        return prev;
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Experience', href: '#experience' },
    { name: 'Masterpieces', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Neurals.in', href: 'https://neurals.in', external: true }
  ];

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <a href="#" className="logo">
          <BrainCircuit className="logo-icon" />
          <span className="logo-text text-gradient">JaiswalBuilds</span>
        </a>

        <nav className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className={`nav-link ${link.external ? 'external-link' : ''}`}
              target={link.external ? '_blank' : '_self'}
              rel={link.external ? 'noopener noreferrer' : ''}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <button 
            className="btn btn-outline" 
            style={{ 
              padding: '0.4rem 0.8rem', 
              fontSize: '0.8rem', 
              cursor: 'pointer', 
              borderColor: 'rgba(0, 255, 255, 0.4)', 
              color: 'var(--text-accent)',
              marginLeft: '0.5rem'
            }}
            onClick={() => {
              onLaunchStudio();
              setMobileMenuOpen(false);
            }}
            title="Open the interactive Neural Graph Studio workspace"
          >
            Launch Studio
          </button>
        </nav>

        <button 
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
};

export default Navbar;
