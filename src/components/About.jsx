import React from 'react';
import { motion } from 'framer-motion';
import { User, Target, Zap, Heart } from 'lucide-react';
import './About.css';

const About = () => {
  const cards = [
    {
      title: "The Vision",
      icon: <Target size={32} />,
      desc: "Creating digital ecosystems that are as secure as they are stunning.",
      color: "var(--accent-primary)"
    },
    {
      title: "My Philosophy",
      icon: <Zap size={32} />,
      desc: "Code is poetry, security is the rhythm. I build for the future.",
      color: "var(--accent-secondary)"
    },
    {
      title: "Interests",
      icon: <Heart size={32} />,
      desc: "Cybersecurity, AI, and minimal architectural design.",
      color: "#ff00d4"
    },
    {
      title: "Expertise",
      icon: <User size={32} />,
      desc: "Full stack development with a surgical focus on security.",
      color: "#00ff41"
    }
  ];

  return (
    <section className="about-section" id="about">
      <div className="section-header">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="section-subtitle"
        >
          01. DISCOVERY
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="section-title"
        >
          THE ARCHITECT <span className="text-reveal">BEHIND</span> THE CODE
        </motion.h2>
      </div>

      <div className="about-grid">
        <motion.div 
          className="about-main-card liquid-glass"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="main-content">
            <h3>I'm a Creative Technologist based in the digital frontier.</h3>
            <p>
              I'm a Creative Technologist based in the digital frontier. I specialize in building what you require. I push the boundaries of ai agents, my mind and what's possible on the web. With a strong foundation in full-stack development and an obsessive focus on cybersecurity, I craft solutions that are not only visually stunning but also architecturally strong. My work represents me and my curiosity to be more than what I am.
            </p>
            <p>
              My journey started at the intersection of design and logic, where I 
              discovered that the most impactful tools are those that blend 
              seamless aesthetics with robust functionality.
            </p>
          </div>
        </motion.div>

        <div className="about-side-grid">
          {cards.map((card, index) => (
            <motion.div 
              key={index}
              className="about-mini-card liquid-glass interactive"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, borderColor: card.color }}
            >
              <div className="card-icon" style={{ color: card.color }}>{card.icon}</div>
              <h4>{card.title}</h4>
              <p>{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
