import React, { useState, useEffect } from 'react';
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
