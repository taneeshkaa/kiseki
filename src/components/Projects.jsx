import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './Projects.css';

const Projects = () => {
  const [activeProject, setActiveProject] = useState(null);

  const projects = [
    {
      title: "NovaOS Dashboard",
      description: "A real-time orchestration surface for product intelligence and operational control.",
      tech: ["React", "Three.js", "Node.js", "Redis"],
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1600",
      github: "#",
      live: "#"
    },
    {
      title: "CipherShield Pro",
      description: "A secure delivery layer for encryption, policy enforcement, and protected cloud workflows.",
      tech: ["Rust", "Python", "WebAssembly", "Cloudflare"],
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc48?auto=format&fit=crop&q=80&w=1600",
      github: "#",
      live: "#"
    }
  ];

  const revealTransition = {
    ease: [0.16, 1, 0.3, 1],
    duration: 0.5
  };

  return (
    <section className="projects-section" id="projects">
      <div className="projects-shell">
        <div className="projects-heading">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="section-subtitle"
          >
            03. PROJECTS
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="section-title"
          >
            SELECTED CREATIONS
          </motion.h2>
        </div>

        <div className="projects-track" role="list">
          {projects.map((project, idx) => {
            const isActive = activeProject === idx;

            return (
              <motion.article
                key={project.title}
                role="listitem"
                className="project-block"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ delay: idx * 0.08, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setActiveProject(idx)}
                onMouseLeave={() => setActiveProject(null)}
                onFocusCapture={() => setActiveProject(idx)}
                onBlurCapture={() => setActiveProject(null)}
              >
                <motion.button
                  type="button"
                  className="project-trigger text-2xl md:text-3xl font-black tracking-tight cursor-pointer relative group"
                  onMouseEnter={() => setActiveProject(idx)}
                  onFocus={() => setActiveProject(idx)}
                >
                  <motion.span
                    animate={{ x: isActive ? 12 : 0 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="project-title"
                  >
                    {project.title}
                  </motion.span>
                </motion.button>

                <p className="project-description">{project.description}</p>

                <div className="project-tags" aria-label={`${project.title} tech stack`}>
                  {project.tech.join(' // ')}
                </div>

                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      className="project-reveal"
                      initial={{ opacity: 0, scale: 0.98, height: 0 }}
                      animate={{ opacity: 1, scale: 1, height: 'auto' }}
                      exit={{ opacity: 0, scale: 0.98, height: 0 }}
                      transition={revealTransition}
                    >
                      <div className="project-reveal-inner">
                        <div className="image-container">
                          <motion.img
                            src={project.image}
                            alt={project.title}
                            className="project-image"
                            initial={{ scale: 1.02, x: 0 }}
                            animate={{ scale: 1.05, x: 12 }}
                            exit={{ scale: 1.02, x: 0 }}
                            transition={revealTransition}
                          />

                          <div className="image-overlay" aria-hidden={false}>
                            <a
                              href={project.github}
                              className="overlay-link"
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`${project.title} GitHub`}
                            >
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1.01.07 1.54 1.04 1.54 1.04.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.6 9.6 0 0112 6.8c.85.004 1.71.115 2.51.337 1.9-1.29 2.74-1.02 2.74-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.6 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85 0 1.33-.01 2.4-.01 2.73 0 .27.18.58.69.48A10.02 10.02 0 0022 12c0-5.52-4.48-10-10-10z" fill="currentColor"/>
                              </svg>
                            </a>

                            <a
                              href={project.live}
                              className="overlay-link"
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`${project.title} Live demo`}
                            >
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path d="M14 3v2h3.59L10 12.59 11.41 14 19 6.41V10h2V3h-7zM5 5h6v2H7v10h10v-4h2v6H5V5z" fill="currentColor"/>
                              </svg>
                            </a>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
