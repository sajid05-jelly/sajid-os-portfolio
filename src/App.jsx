import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import CRTContainer from './components/Layout/CRTContainer';
import OSInterface from './components/Layout/OSInterface';
import BootSequence from './components/Loader/BootSequence';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Artwork from './pages/Artwork';
import Photography from './pages/Photography';
import About from './pages/About';
import Skills from './pages/Skills';
import Certifications from './pages/Certifications';
import ContentCreator from './pages/ContentCreator';
import Contact from './pages/Contact';
import Terminal from './components/Navigation/Terminal';
import PageTransition from './components/Layout/PageTransition';

const AppContent = () => {
  const [booting, setBooting] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Keyboard shortcuts
    const handleKeyDown = (e) => {
      if (e.key === 'h' || e.key === 'H') window.location.href = '/';
      if (e.key === 'p' || e.key === 'P') window.location.href = '/projects';
      if (e.key === 'a' || e.key === 'A') window.location.href = '/artwork';
      if (e.key === 'o' || e.key === 'O') window.location.href = '/about';
      if (e.key === 's' || e.key === 'S') window.location.href = '/skills';
      if (e.key === 'c' || e.key === 'C') window.location.href = '/certifications';
      if (e.key === 'r' || e.key === 'R') window.location.href = '/content-creator';
      if (e.key === 'g' || e.key === 'G') window.location.href = '/contact';
      // Terminal is handled locally or via context, but we can toggle a state here
      if (e.key === 't' || e.key === 'T') {
        const term = document.getElementById('hidden-terminal');
        if (term) term.classList.toggle('hidden');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <CRTContainer>
      {booting ? (
        <BootSequence onComplete={() => setBooting(false)} />
      ) : (
        <>
          <OSInterface currentPath={location.pathname} />
          <div className="relative z-10 w-full h-full overflow-hidden pt-0 pb-0 px-0">
            <PageTransition>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/artwork" element={<Photography />} />
                <Route path="/about" element={<About />} />
                <Route path="/skills" element={<Skills />} />
                <Route path="/certifications" element={<Certifications />} />
                <Route path="/content-creator" element={<ContentCreator />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </PageTransition>
          </div>
          <Terminal />
        </>
      )}
    </CRTContainer>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
