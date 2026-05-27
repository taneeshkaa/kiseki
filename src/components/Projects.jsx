import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Layers } from 'lucide-react';
import { Github } from './Icons';
import './Projects.css';

const Projects = () => {
  const projects = [
    {
      title: "NovaOS Dashboard",
      category: "Full Stack / UI",
      desc: "A futuristic operating system dashboard with real-time data visualization and secure kernel communications.",
      tech: ["React", "Three.js", "Node.js", "Redis"],
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800", // Futuristic tech image
      github: "#",
      demo: "#"
    },
    {
      title: "CipherShield Pro",
      category: "Cybersecurity",
      desc: "An advanced encryption suite providing military-grade protection for distributed cloud environments.",
      tech: ["Rust", "Python", "WebAssembly", "Cloudflare"],
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc48?auto=format&fit=crop&q=80&w=800",
      github: "#",
      demo: "#"
    },
    {
      title: "Aetherial Labs",
      category: "Creative Tech",
      desc: "An interactive immersive experience exploring the intersection of generative art and neural networks.",
      tech: ["Next.js", "PyTorch", "GLSL", "Firebase"],
      image: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=800",
      github: "#",
      demo: "#"
    }
  ];

  return (
    <section className="projects-section" id="projects">
      <div className="section-header">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="section-subtitle"
        >
          03. PORTFOLIO
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="section-title"
        >
          FEATURED <span className="text-reveal">CREATIONS</span>
        </motion.h2>
      </div>

      <div className="projects-grid">
        {projects.map((project, idx) => (
          <motion.div 
            key={idx}
            className="project-card liquid-glass interactive"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -15 }}
          >
            <div className="project-image-container">
              <img src={project.image} alt={project.title} className="project-image" />
              <div className="project-overlay">
                <div className="overlay-content">
                  <div className="project-links">
                    <a href={project.github} className="interactive"><Github size={20} /></a>
                    <a href={project.demo} className="interactive"><ExternalLink size={20} /></a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="project-info">
              <span className="project-category">{project.category}</span>
              <h3>{project.title}</h3>
              <p>{project.desc}</p>
              
              <div className="project-tech">
                {project.tech.map((t, tIdx) => (
                  <span key={tIdx} className="tech-tag">{t}</span>
                ))}
              </div>
            </div>

            <div className="card-spotlight"></div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
