import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Footer from './components/Footer';
import Resume from './components/Resume';
import GraphStudio from './components/GraphStudio';

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
        <Hero 
          onShowResume={() => setShowResume(true)} 
          onLaunchStudio={() => setShowStudio(true)} 
        />
        <Experience />
        <Projects />
        <Skills />
      </main>
      <Footer />
    </div>
  );
}

export default App;

