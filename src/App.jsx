import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Footer from './components/Footer';
import Resume from './components/Resume';

function App() {
  const [showResume, setShowResume] = useState(false);

  if (showResume) {
    return <Resume onBack={() => setShowResume(false)} />;
  }

  return (
    <div className="app-container">
      <Navbar />
      <main>
        <Hero onShowResume={() => setShowResume(true)} />
        <Experience />
        <Projects />
        <Skills />
      </main>
      <Footer />
    </div>
  );
}

export default App;


// Refactored update: 2025-08-14 check

// Refactored update: 2025-08-18 check

// Refactored update: 2025-08-27 check

// Refactored update: 2025-08-29 check

// Refactored update: 2025-09-01 check

// Refactored update: 2025-09-11 check

// Refactored update: 2025-09-29 check

// Refactored update: 2025-10-02 check

// Refactored update: 2025-10-03 check
