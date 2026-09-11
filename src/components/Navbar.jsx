import React, { useState, useEffect } from 'react';
import { Cpu, Menu, X } from 'lucide-react';
import './Navbar.css';

export default function Navbar({ onLaunchStudio }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner">
        <a href="/" className="nav-logo">
          <Cpu size={20} className="nav-logo-icon" />
          <span>JaiswalBuilds</span>
        </a>

        <div className="nav-desktop-cta">
          <button className="nav-studio-btn" onClick={onLaunchStudio}>
            <Cpu size={15} /> Graph Studio
          </button>
        </div>

        <button className="nav-hamburger" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="nav-mobile-menu">
          {['hero','experience','projects','skills'].map(id => (
            <button key={id} className="nav-mobile-link" onClick={() => scrollTo(id)}>
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </button>
          ))}
          <button className="nav-studio-btn" onClick={() => { onLaunchStudio(); setMobileOpen(false); }}>
            <Cpu size={15} /> Graph Studio
          </button>
        </div>
      )}
    </nav>
  );
}
