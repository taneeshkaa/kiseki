import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Resume from './components/Resume';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CommandPalette from './components/CommandPalette';
import { Terminal } from 'lucide-react';
import './index.css';

function App() {
  const [isCmdOpen, setIsCmdOpen] = useState(false);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light');

    // Spotlight effect in project cards
    const handleMouseMove = (e) => {
      const projectCards = document.querySelectorAll('.project-card');
      projectCards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    };

    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCmdOpen(prev => !prev);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <div className="app-container">
      <div className="page-watermark" aria-hidden="true">
        <span className="page-watermark__text">TANISHKA AGARWAL</span>
      </div>
      <Navbar theme={theme} onThemeChange={handleThemeChange} />
      
      <main>
        <div className="editorial-canvas">
          <Hero />
          <About />
        </div>
        <Skills />
        <Projects />
        <Resume />
        <Contact />
      </main>

      <Footer />

      {/* Floating HUD Command Palette Button */}
      <button 
        className="hud-trigger-btn interactive" 
        onClick={() => setIsCmdOpen(true)}
        aria-label="Open Command Palette"
      >
        <Terminal size={20} />
        <span className="hud-tooltip">CMD + K</span>
      </button>

      <CommandPalette 
        isOpen={isCmdOpen} 
        onClose={() => setIsCmdOpen(false)} 
        onThemeChange={handleThemeChange}
      />
    </div>
  );
}

export default App;
