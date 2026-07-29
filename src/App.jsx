import React, { useState } from 'react';
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

  if (showResume) {
    return <Resume onBack={() => setShowResume(false)} />;
  }

  if (showStudio) {
    return <GraphStudio onBack={() => setShowStudio(false)} />;
  }

  return (
    <div className="app-container">
      <Navbar onLaunchStudio={() => setShowStudio(true)} />
      <main>
        {/* data-section tells AIAssistant which hover context to load */}
        <div data-section="hero">
          <Hero
            onShowResume={() => setShowResume(true)}
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
