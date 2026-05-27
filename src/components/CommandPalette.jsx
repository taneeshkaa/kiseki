import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Shield, Eye, Sun, Moon, CornerDownLeft, X } from 'lucide-react';
import './CommandPalette.css';

const CommandPalette = ({ isOpen, onClose, onThemeChange }) => {
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  const commands = [
    { id: 'about', label: 'Go to: About Me', desc: 'Navigate to discovery section', icon: <Eye size={16} />, action: () => scrollToSection('about') },
    { id: 'skills', label: 'Go to: Tech Arsenal', desc: 'Navigate to skills section', icon: <Terminal size={16} />, action: () => scrollToSection('skills') },
    { id: 'projects', label: 'Go to: Creations', desc: 'Navigate to projects gallery', icon: <Terminal size={16} />, action: () => scrollToSection('projects') },
    { id: 'experience', label: 'Go to: Journey', desc: 'Navigate to career timeline', icon: <Terminal size={16} />, action: () => scrollToSection('experience') },
    { id: 'certifications', label: 'Go to: Credentials', desc: 'Navigate to certifications list', icon: <Shield size={16} />, action: () => scrollToSection('certifications') },
    { id: 'resume', label: 'Go to: Resume', desc: 'Navigate to resume download', icon: <Shield size={16} />, action: () => scrollToSection('resume') },
    { id: 'testimonials', label: 'Go to: Reviews', desc: 'Navigate to recommendations', icon: <Eye size={16} />, action: () => scrollToSection('testimonials') },
    { id: 'contact', label: 'Go to: Initiate Protocol', desc: 'Navigate to contact form', icon: <Terminal size={16} />, action: () => scrollToSection('contact') },
    
    { id: 'theme-dark', label: 'System Theme: Dark Mode', desc: 'Switch interface to dark mode', icon: <Moon size={16} />, action: () => onThemeChange('dark') },
    { id: 'theme-light', label: 'System Theme: Light Mode', desc: 'Switch interface to light mode', icon: <Sun size={16} />, action: () => onThemeChange('light') },
  ];

  const filteredCommands = commands.filter(cmd => 
    cmd.label.toLowerCase().includes(search.toLowerCase()) ||
    cmd.desc.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setSearch('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % filteredCommands.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
          onClose();
        }
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, filteredCommands]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="cmd-palette-overlay" onClick={onClose}>
          <motion.div 
            className="cmd-palette-box liquid-glass"
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="cmd-input-container">
              <Terminal size={18} className="cmd-input-icon" />
              <input 
                ref={inputRef}
                type="text" 
                placeholder="Type a command or search..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setSelectedIndex(0);
                }}
                className="cmd-input"
              />
              <button className="cmd-close-btn" onClick={onClose}>
                <X size={16} />
              </button>
            </div>

            <div className="cmd-list">
              {filteredCommands.length > 0 ? (
                filteredCommands.map((cmd, idx) => (
                  <div 
                    key={cmd.id}
                    className={`cmd-item ${idx === selectedIndex ? 'active' : ''}`}
                    onClick={() => {
                      cmd.action();
                      onClose();
                    }}
                    onMouseEnter={() => setSelectedIndex(idx)}
                  >
                    <div className="cmd-item-left">
                      <span className="cmd-icon">{cmd.icon}</span>
                      <div>
                        <span className="cmd-label">{cmd.label}</span>
                        <span className="cmd-desc">{cmd.desc}</span>
                      </div>
                    </div>
                    {idx === selectedIndex && (
                      <span className="cmd-enter-hint">
                        <span>ENTER</span>
                        <CornerDownLeft size={10} />
                      </span>
                    )}
                  </div>
                ))
              ) : (
                <div className="cmd-no-results">No matching transmissions found.</div>
              )}
            </div>

            <div className="cmd-footer">
              <span>Use <kbd>↑</kbd> <kbd>↓</kbd> to navigate, <kbd>Enter</kbd> to select, <kbd>Esc</kbd> to close.</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
