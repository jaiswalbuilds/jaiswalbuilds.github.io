import React, { useState, useEffect } from 'react';
import { Menu, X, BrainCircuit } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
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

// Refactored update: 2025-10-03 check

// Refactored update: 2025-10-04 check

// Refactored update: 2025-10-07 check

// Refactored update: 2025-10-17 check

// Refactored update: 2025-10-17 check

// Refactored update: 2025-10-21 check

// Refactored update: 2025-12-01 check

// Refactored update: 2026-01-04 check

// Refactored update: 2026-01-05 check

// Refactored update: 2026-01-08 check
