import React from 'react';
import { motion } from 'framer-motion';
import './About.css';

const About = () => {
  return (
    <section className="about-section" id="about" aria-labelledby="about-title">
      <span className="about-crosshair about-crosshair--tl" aria-hidden="true">+</span>
      <span className="about-crosshair about-crosshair--tr" aria-hidden="true">+</span>
      <span className="about-crosshair about-crosshair--bl" aria-hidden="true">+</span>
      <span className="about-crosshair about-crosshair--br" aria-hidden="true">+</span>

      <div className="about-shell">
        <div className="about-column about-column--left">
          <motion.p
            className="about-token"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            viewport={{ once: true, amount: 0.5 }}
          >
            01 // THE FOCUS
          </motion.p>

          <motion.h2
            id="about-title"
            className="about-manifesto"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.35 }}
          >
            I&apos;m a Creative Technologist based in the digital frontier. I specialize in building what you require.
          </motion.h2>
        </div>

        <div className="about-divider" aria-hidden="true" />

        <div className="about-column about-column--right">
          <motion.article
            className="about-dossier"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <p className="about-dossier__label">[ CORE ARCHITECTURE &amp; LOGIC ]</p>
            <p className="about-dossier__text">
              I push the boundaries of ai agents, my mind and what&apos;s possible on the web. With a strong foundation in full-stack development and an obsessive focus on cybersecurity, I craft solutions that are not only visually stunning but also architecturally strong. My work represents me and my curiosity to be more than what I am.
            </p>
          </motion.article>

          <motion.article
            className="about-dossier"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <p className="about-dossier__label">[ THE INTERSECTION ]</p>
            <p className="about-dossier__text">
              My journey started at the intersection of design and logic, where I discovered that the most impactful tools are those that blend seamless aesthetics with robust functionality.
            </p>
          </motion.article>
        </div>
      </div>
    </section>
  );
};

export default About;
