import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import './Hero.css';

/** Phrase groups (never break inside a phrase) */
const TITLES = [
  { phrases: ['FULLSTACK', 'ENGINEER'] },
  { phrases: ['CYBERSECURITY', 'STUDENT'] },
];

const ROTATION_MS = 4200;
const FLIP_EASE = [0.16, 1, 0.3, 1];

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return reduced;
}

function KineticChar({ char, index, reducedMotion }) {
  const display = char === ' ' ? '\u00A0' : char;

  if (reducedMotion) return <span className="kinetic-char-inner">{display}</span>;

  return (
    <motion.span
      className="kinetic-char-inner"
      initial={{ rotateX: -88, y: '42%', opacity: 0 }}
      animate={{ rotateX: 0, y: 0, opacity: 1 }}
      transition={{
        duration: 0.52,
        delay: index * 0.028,
        ease: FLIP_EASE,
      }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {display}
    </motion.span>
  );
}

function KineticHeadline({ phrases, reducedMotion }) {
  const phraseKey = phrases.join('|');
  let charOffset = 0;

  return (
    <span className="kinetic-headline" style={{ perspective: 1200 }}>
      {phrases.map((phrase, pi) => (
        <span className="kinetic-phrase" key={`${phraseKey}-p-${pi}`}>
          {phrase.split('').map((char, ci) => {
            const index = charOffset;
            charOffset += 1;
            return (
              <span className="kinetic-char-cell" key={`${phraseKey}-${pi}-${ci}`}>
                <KineticChar char={char} index={index} reducedMotion={reducedMotion} />
              </span>
            );
          })}
        </span>
      ))}
    </span>
  );
}

const Hero = () => {
  const [titleIndex, setTitleIndex] = useState(0);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const id = setInterval(() => {
      setTitleIndex((i) => (i + 1) % TITLES.length);
    }, ROTATION_MS);
    return () => clearInterval(id);
  }, []);

  const currentTitle = TITLES[titleIndex];
  const titleKey = currentTitle.phrases.join('-');

  const handlePointerMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    setParallax({ x: -nx * 14, y: -ny * 10 });
  }, []);

  const handlePointerLeave = useCallback(() => {
    setParallax({ x: 0, y: 0 });
  }, []);

  const leftBracket = { rest: { x: 0, scale: 1 }, hover: { x: -4, scale: 1.08 } };
  const rightBracket = { rest: { x: 0, scale: 1 }, hover: { x: 4, scale: 1.08 } };
  const labelVariants = { rest: { x: 0 }, hover: { x: 8 } };
  const containerVariants = { rest: { scaleX: 1 }, hover: { scaleX: 1.08 } };

  return (
    <section
      className="hero-section hero-luxury"
      id="home"
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
    >
      {/* Background watermark */}
      <div className="hero-bg-layer" aria-hidden="true">
        <motion.p
          className="hero-watermark"
          animate={{ x: parallax.x, y: parallax.y }}
          transition={{ type: 'spring', stiffness: 120, damping: 22, mass: 0.8 }}
        >
          TANISHKA AGARWAL
        </motion.p>
      </div>

      {/* Editorial spine (hidden) */}
      <div className="hero-spine" aria-hidden="true" />

      {/* Corner targets */}
      <span className="hero-crosshair hero-crosshair--tl" aria-hidden="true">
        +
      </span>
      <span className="hero-crosshair hero-crosshair--tr" aria-hidden="true">
        +
      </span>
      <span className="hero-crosshair hero-crosshair--bl" aria-hidden="true">
        +
      </span>
      <span className="hero-crosshair hero-crosshair--br" aria-hidden="true">
        +
      </span>

      {/* System header + intent index removed to simplify header */}

      {/* Main layout: left narrative / right portal */}
      <div className="hero-layout">
        <div className="hero-copy">
          <motion.div
            className="hero-copy-inner"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
          >
            <p className="hero-eyebrow">I AM A</p>

            <h1 className="hero-title" aria-live="polite">
              <KineticHeadline key={titleKey} phrases={currentTitle.phrases} reducedMotion={reducedMotion} />
            </h1>
          </motion.div>
        </div>

        <aside className="hero-portal" aria-label="Reserved for interactive AI chat module" />
      </div>
    </section>
  );
};

export default Hero;
