import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Footer from './components/Footer';
import Resume from './components/Resume';
import GraphStudio from './components/GraphStudio';
import AIAssistant from './components/AIAssistant';

function App() {
  const [showResume, setShowResume] = useState(false);
  const [showStudio, setShowStudio] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -9999, y: -9999 });

  useEffect(() => {
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (showResume) {
    return <Resume onBack={() => setShowResume(false)} />;
  }

  if (showStudio) {
    return <GraphStudio onBack={() => setShowStudio(false)} />;
  }

  return (
    <div className="app-container">
      <div className="spotlight" style={{ left: mousePos.x, top: mousePos.y }} />
      <Navbar onLaunchStudio={() => setShowStudio(true)} />
      <main>
        {/* data-section tells AIAssistant which hover context to load */}
        <div data-section="hero">
          <Hero
            onShowResume={() => window.open('https://drive.google.com/file/d/1I5X8MmdWmbdW7c6QikuV-0RwRc0JrG-A/view?usp=sharing', '_blank')}
            onLaunchStudio={() => setShowStudio(true)}
          />
        </div>
        <div data-section="experience">
          <Experience />
        </div>
        <div data-section="projects">
          <Projects />
        </div>
        <div data-section="skills">
          <Skills />
        </div>
      </main>
      <Footer />

      {/* Persistent AI Assistant — hover tooltips + floating chatbot */}
      <AIAssistant />
    </div>
  );
}

export default App;
