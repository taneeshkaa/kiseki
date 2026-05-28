import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { Github, Linkedin, Twitter } from './Icons';
import './Footer.css';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <span className="logo-text">TANISHKA<span className="dot"> </span>AGARWAL</span>
            <p>Sharp logic on the back. Raw texture on the front.</p>
          </div>
          
          <div className="footer-links">
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="#experience">Experience</a>
            <a href="#contact">Contact</a>
          </div>
          
          <div className="footer-social">
            <a href="#" className="interactive"><Github size={20} /></a>
            <a href="#" className="interactive"><Linkedin size={20} /></a>
            <a href="#" className="interactive"><Twitter size={20} /></a>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>© 2026 Built by a Creative Technologist.</p>
          <button className="back-to-top interactive" onClick={scrollToTop}>
            BACK TO TOP
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
