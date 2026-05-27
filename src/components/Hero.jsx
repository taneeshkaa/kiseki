import React, { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import './Hero.css';

const TITLES = ['FULLSTACK', 'CREATIVE TECHNOLOGIST'];
const ROTATION_MS = 4200;

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();

    if (mq.addEventListener) {
      mq.addEventListener('change', update);
      return () => mq.removeEventListener('change', update);
    }

    mq.addListener(update);
    return () => mq.removeListener(update);
  }, []);

  return reduced;
}

const Hero = () => {
  const [titleIndex, setTitleIndex] = useState(0);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTitleIndex((index) => (index + 1) % TITLES.length);
    }, ROTATION_MS);

    return () => window.clearInterval(timer);
  }, []);

  const handlePointerMove = useCallback((event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const nx = (event.clientX - rect.left) / rect.width - 0.5;
    const ny = (event.clientY - rect.top) / rect.height - 0.5;
    setParallax({ x: -nx * 14, y: -ny * 10 });
  }, []);

  const handlePointerLeave = useCallback(() => {
    setParallax({ x: 0, y: 0 });
  }, []);

  const currentTitle = TITLES[titleIndex];

  return (
    <section
      className="hero-shell"
      id="home"
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
    >
      <div className="hero-watermark-layer" aria-hidden="true">
        <motion.p
          className="hero-watermark"
          animate={reducedMotion ? { x: 0, y: 0 } : { x: parallax.x, y: parallax.y }}
          transition={{ type: 'spring', stiffness: 120, damping: 22, mass: 0.8 }}
        >
          TANISHKA AGARWAL
        </motion.p>
      </div>

      <div className="hero-grid">
        <div className="hero-column hero-column--left">
          <div className="hero-column-inner hero-column-inner--left">
            <div className="hero-status-block">
              <p className="hero-status-line">LOC // GREATER NOIDA, IN</p>
              <p className="hero-status-line hero-status-line--accent">
                <span className="hero-status-dot" aria-hidden="true">
                  •
                </span>
                <span>STATUS // OPEN FOR SYSTEM ARCHITECTURE</span>
              </p>
            </div>

            <div className="hero-intent-block" role="navigation" aria-label="Hero intent index">
              <button type="button" className="hero-intent-row interactive">
                <span className="hero-intent-copy">→ [ ENGAGE AI CHAT ]</span>
              </button>

              <button type="button" className="hero-intent-row interactive">
                <span className="hero-intent-copy">→ [ INDEX OF PROJECTS ]</span>
              </button>
            </div>
          </div>
        </div>

        <div className="hero-column hero-column--right">
          <div className="hero-column-inner hero-column-inner--right">
            <p className="hero-kicker">I AM A</p>

            <h1 className="hero-headline" aria-live="polite">
              {currentTitle}
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
