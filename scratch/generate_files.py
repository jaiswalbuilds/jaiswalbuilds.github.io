import os

workspace_dir = r"C:\Users\jaisw\OneDrive\GitHub\jaiswalbuilds.github.io"
src_dir = os.path.join(workspace_dir, "src")
components_dir = os.path.join(src_dir, "components")

# 1. index.html
index_html_path = os.path.join(workspace_dir, "index.html")
with open(index_html_path, "r", encoding="utf-8") as f:
    index_content = f.read()

fonts = """    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
"""
if "fonts.googleapis.com" not in index_content:
    index_content = index_content.replace("<head>", f"<head>\n{fonts}")
    with open(index_html_path, "w", encoding="utf-8") as f:
        f.write(index_content)

# 2. src/index.css
index_css_content = """@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

:root {
  --bg-canvas: #07090E;
  --bg-card: #0E131F;
  --bg-sidebar: #090C16;
  --bg-elevated: #111827;
  --border-subtle: rgba(255,255,255,0.07);
  --border-hover: rgba(99,102,241,0.4);
  --text-primary: #F1F5F9;
  --text-secondary: #94A3B8;
  --text-muted: #475569;
  --accent-violet: #6366F1;
  --accent-cyan: #06B6D4;
  --accent-emerald: #10B981;
  --accent-amber: #F59E0B;
  --accent-purple: #8B5CF6;
  --glow-violet: rgba(99,102,241,0.15);
  --glow-cyan: rgba(6,182,212,0.12);
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}

html, body {
  margin: 0;
  padding: 0;
  background: var(--bg-canvas);
  color: var(--text-primary);
  font-family: var(--font-sans);
  overflow-x: hidden;
}

* {
  box-sizing: border-box;
}

.spotlight {
  position: fixed;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
  transform: translate(-50%, -50%);
  transition: opacity 0.3s ease;
  z-index: 0;
}

.glass-panel {
  background: rgba(14, 19, 31, 0.6);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--border-subtle);
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-family: var(--font-sans);
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  text-decoration: none;
}

.btn-primary {
  background: var(--accent-violet);
  color: white;
}
.btn-primary:hover {
  background: #4F46E5;
}

.btn-outline {
  background: transparent;
  border: 1px solid var(--accent-cyan);
  color: var(--accent-cyan);
}
.btn-outline:hover {
  background: rgba(6,182,212,0.1);
}

.text-gradient {
  background: linear-gradient(135deg, var(--text-primary), var(--text-secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.container {
  width: 100%;
  padding: 0 2rem;
}

section {
  padding: 5rem 0;
}

.section-label {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--accent-cyan);
  margin-bottom: 0.5rem;
  display: block;
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  margin-top: 0;
  margin-bottom: 2rem;
}

@keyframes blink { 50% { opacity: 0; } }
@keyframes pulse-status {
  0%, 100% { box-shadow: 0 0 0 0 rgba(16,185,129,0.6); }
  50% { box-shadow: 0 0 0 6px rgba(16,185,129,0); }
}
"""
with open(os.path.join(src_dir, "index.css"), "w", encoding="utf-8") as f:
    f.write(index_css_content)

# 3. src/App.jsx
app_jsx_content = """import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Footer from './components/Footer';
import Resume from './components/Resume';
import GraphStudio from './components/GraphStudio';
import AIAssistant from './components/AIAssistant';
import './App.css';

function App() {
  const [showResume, setShowResume] = useState(false);
  const [showStudio, setShowStudio] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const sections = ['hero', 'experience', 'projects', 'skills'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  if (showResume) return <Resume onBack={() => setShowResume(false)} />;
  if (showStudio) return <GraphStudio onBack={() => setShowStudio(false)} />;

  return (
    <div className="app-root">
      <div
        className="spotlight"
        style={{ left: mousePos.x, top: mousePos.y }}
      />
      <Navbar onLaunchStudio={() => setShowStudio(true)} />
      <div className="layout-shell">
        <aside className="layout-sidebar">
          <Sidebar
            activeSection={activeSection}
            onShowResume={() => window.open('https://drive.google.com/file/d/1I5X8MmdWmbdW7c6QikuV-0RwRc0JrG-A/view?usp=sharing', '_blank')}
            onLaunchStudio={() => setShowStudio(true)}
          />
        </aside>
        <main className="layout-main">
          <section id="hero" data-section="hero" style={{padding:0}}>
            <Hero onLaunchStudio={() => setShowStudio(true)} />
          </section>
          <section id="experience" data-section="experience" style={{padding:0}}>
            <Experience />
          </section>
          <section id="projects" data-section="projects" style={{padding:0}}>
            <Projects />
          </section>
          <section id="skills" data-section="skills" style={{padding:0}}>
            <Skills />
          </section>
          <Footer />
        </main>
      </div>
      <AIAssistant />
    </div>
  );
}

export default App;
"""
with open(os.path.join(src_dir, "App.jsx"), "w", encoding="utf-8") as f:
    f.write(app_jsx_content)

# 4. src/App.css
app_css_content = """.app-root {
  min-height: 100vh;
  background: var(--bg-canvas);
  position: relative;
}

.layout-shell {
  display: flex;
  min-height: 100vh;
  padding-top: 0;
}

.layout-sidebar {
  width: 38%;
  max-width: 480px;
  min-width: 280px;
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
  background: var(--bg-sidebar);
  border-right: 1px solid var(--border-subtle);
  flex-shrink: 0;
  scrollbar-width: none;
}
.layout-sidebar::-webkit-scrollbar { display: none; }

.layout-main {
  flex: 1;
  overflow-y: auto;
  min-width: 0;
  padding-top: 0;
}

.card-group:has(.project-card:hover) .project-card:not(:hover) {
  opacity: 0.5;
  transition: opacity 0.3s ease;
}

@media (max-width: 1024px) {
  .layout-shell { flex-direction: column; }
  .layout-sidebar {
    width: 100%;
    max-width: 100%;
    position: static;
    height: auto;
    overflow: visible;
    border-right: none;
    border-bottom: 1px solid var(--border-subtle);
  }
  .layout-main { overflow: visible; }
}
"""
with open(os.path.join(src_dir, "App.css"), "w", encoding="utf-8") as f:
    f.write(app_css_content)

# 5. src/components/Sidebar.jsx
sidebar_jsx_content = """import React, { useState, useEffect } from 'react';
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
"""
with open(os.path.join(components_dir, "Sidebar.jsx"), "w", encoding="utf-8") as f:
    f.write(sidebar_jsx_content)

# 6. src/components/Sidebar.css
sidebar_css_content = """.sidebar {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.sidebar-inner {
  padding: 2.5rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  min-height: 100vh;
}
.sidebar-profile {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.sidebar-avatar-ring {
  position: relative;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  padding: 2px;
  background: linear-gradient(135deg, var(--accent-violet), var(--accent-cyan));
  flex-shrink: 0;
}
.sidebar-avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--bg-sidebar);
}
.sidebar-status-dot {
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 12px;
  height: 12px;
  background: var(--accent-emerald);
  border-radius: 50%;
  border: 2px solid var(--bg-sidebar);
  animation: pulse-status 2s infinite;
}
.sidebar-identity { flex: 1; min-width: 0; }
.sidebar-name {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 0.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.sidebar-title-wrap {
  display: flex;
  align-items: center;
  min-height: 1.4em;
}
.sidebar-title {
  font-size: 0.8rem;
  color: var(--accent-cyan);
  font-family: var(--font-mono);
  font-weight: 500;
}
.sidebar-cursor {
  color: var(--accent-violet);
  animation: blink 1s step-end infinite;
  font-family: var(--font-mono);
  margin-left: 1px;
}
.availability-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(16,185,129,0.08);
  border: 1px solid rgba(16,185,129,0.25);
  border-radius: 100px;
  padding: 0.35rem 0.85rem;
  font-size: 0.78rem;
  color: var(--accent-emerald);
  font-weight: 500;
  width: fit-content;
}
.avail-dot {
  width: 7px;
  height: 7px;
  background: var(--accent-emerald);
  border-radius: 50%;
  animation: pulse-status 2s infinite;
}
.sidebar-pitch {
  font-size: 0.88rem;
  color: var(--text-secondary);
  line-height: 1.65;
  margin: 0;
}
.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}
.sidebar-nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem 0;
  color: var(--text-muted);
  font-family: var(--font-sans);
  font-size: 0.88rem;
  font-weight: 500;
  transition: color 0.2s ease;
  text-align: left;
}
.sidebar-nav-item:hover { color: var(--text-primary); }
.sidebar-nav-item.active { color: var(--text-primary); }
.nav-indicator {
  width: 28px;
  height: 1px;
  background: var(--text-muted);
  transition: width 0.3s ease, background 0.3s ease;
  flex-shrink: 0;
}
.sidebar-nav-item.active .nav-indicator {
  width: 48px;
  background: var(--accent-cyan);
}
.sidebar-nav-item:hover .nav-indicator {
  width: 40px;
  background: var(--text-secondary);
}
.nav-label { letter-spacing: 0.08em; text-transform: uppercase; font-size: 0.75rem; }
.sidebar-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}
.stat-tile {
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: 10px;
  padding: 0.85rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  transition: border-color 0.2s ease;
}
.stat-tile:hover { border-color: var(--border-hover); }
.stat-value {
  font-family: var(--font-mono);
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1;
}
.stat-label {
  font-size: 0.72rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
.sidebar-ctas {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}
.cta-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.7rem 1.25rem;
  border-radius: 8px;
  font-family: var(--font-sans);
  font-size: 0.88rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  min-height: 44px;
}
.cta-primary {
  background: linear-gradient(135deg, var(--accent-violet), #4F46E5);
  color: white;
  box-shadow: 0 4px 20px rgba(99,102,241,0.25);
}
.cta-primary:hover {
  box-shadow: 0 6px 28px rgba(99,102,241,0.4);
  transform: translateY(-1px);
}
.cta-secondary {
  background: transparent;
  border: 1px solid var(--border-subtle);
  color: var(--text-secondary);
}
.cta-secondary:hover {
  border-color: var(--accent-cyan);
  color: var(--accent-cyan);
  background: rgba(6,182,212,0.05);
}
.sidebar-socials {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid var(--border-subtle);
}
.social-link {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  color: var(--text-muted);
  transition: color 0.2s ease;
  min-height: 44px;
  padding: 0 0.25rem;
  font-size: 0.82rem;
  text-decoration: none;
}
.social-link:hover { color: var(--accent-cyan); }
.social-calendly {
  background: rgba(99,102,241,0.08);
  border: 1px solid rgba(99,102,241,0.2);
  border-radius: 6px;
  padding: 0.3rem 0.75rem;
  color: var(--accent-violet);
  font-weight: 500;
  margin-left: auto;
}
.social-calendly:hover {
  background: rgba(99,102,241,0.15);
  color: var(--accent-violet);
}
@media (max-width: 1024px) {
  .sidebar-inner { padding: 2rem 1.5rem; min-height: auto; }
  .sidebar-nav { flex-direction: row; flex-wrap: wrap; gap: 0.5rem; }
  .sidebar-nav-item { padding: 0.4rem 0.8rem; border: 1px solid var(--border-subtle); border-radius: 6px; }
  .sidebar-nav-item.active { border-color: var(--accent-cyan); color: var(--accent-cyan); }
  .nav-indicator { display: none; }
  .sidebar-stats { grid-template-columns: repeat(4,1fr); }
  .sidebar-ctas { flex-direction: row; }
  .cta-btn { flex: 1; }
  .sidebar-socials { margin-top: 0; }
}
@media (max-width: 600px) {
  .sidebar-stats { grid-template-columns: repeat(2,1fr); }
  .sidebar-ctas { flex-direction: column; }
}
"""
with open(os.path.join(components_dir, "Sidebar.css"), "w", encoding="utf-8") as f:
    f.write(sidebar_css_content)

# 7. src/components/Navbar.jsx
navbar_jsx_content = """import React, { useState, useEffect } from 'react';
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
"""
with open(os.path.join(components_dir, "Navbar.jsx"), "w", encoding="utf-8") as f:
    f.write(navbar_jsx_content)

# 8. src/components/Navbar.css
navbar_css_content = """.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 200;
  padding: 0;
  transition: all 0.3s ease;
}
.navbar.scrolled {
  background: rgba(7,9,14,0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow: 0 1px 0 var(--border-subtle);
}
.nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
}
.nav-logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-primary);
  text-decoration: none;
  min-height: 44px;
}
.nav-logo-icon { color: var(--accent-violet); }
.nav-studio-btn {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 1rem;
  background: rgba(99,102,241,0.1);
  border: 1px solid rgba(99,102,241,0.3);
  border-radius: 8px;
  color: var(--accent-violet);
  font-family: var(--font-sans);
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 44px;
}
.nav-studio-btn:hover {
  background: rgba(99,102,241,0.2);
  border-color: var(--accent-violet);
}
.nav-hamburger {
  display: none;
  background: none;
  border: none;
  color: var(--text-primary);
  cursor: pointer;
  padding: 0.5rem;
  min-height: 44px;
}
.nav-mobile-menu {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem 2rem 1.5rem;
  background: var(--bg-canvas);
  border-top: 1px solid var(--border-subtle);
}
.nav-mobile-link {
  background: none;
  border: none;
  color: var(--text-secondary);
  font-family: var(--font-sans);
  font-size: 1rem;
  font-weight: 500;
  text-align: left;
  padding: 0.65rem 0;
  cursor: pointer;
  border-bottom: 1px solid var(--border-subtle);
  transition: color 0.2s ease;
}
.nav-mobile-link:hover { color: var(--text-primary); }
@media (max-width: 1024px) {
  .nav-desktop-cta { display: none; }
  .nav-hamburger { display: block; }
}
"""
with open(os.path.join(components_dir, "Navbar.css"), "w", encoding="utf-8") as f:
    f.write(navbar_css_content)

print("First batch of files generated.")
