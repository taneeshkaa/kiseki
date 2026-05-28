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
                        <motion.img
                          src={project.image}
                          alt={project.title}
                          className="project-image"
                          initial={{ scale: 1.02, x: 0 }}
                          animate={{ scale: 1.05, x: 12 }}
                          exit={{ scale: 1.02, x: 0 }}
                          transition={revealTransition}
                        />

                        <div className="project-actions">
                          <motion.a
                            href={project.github}
                            className="project-action-link"
                            whileHover={{ y: -2 }}
                            transition={{ duration: 0.2, ease: 'easeOut' }}
                          >
                            [ GITHUB URL ]
                          </motion.a>
                          <motion.a
                            href={project.live}
                            className="project-action-link"
                            whileHover={{ y: -2 }}
                            transition={{ duration: 0.2, ease: 'easeOut' }}
                          >
                            [ LIVE DEPLOYMENT ]
                          </motion.a>
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
