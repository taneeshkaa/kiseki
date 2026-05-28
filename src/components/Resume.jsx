import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, FileText, CheckCircle2 } from 'lucide-react';
import resumeFile from '../assets/TANISHKA AGARWALL.docx';
import './Resume.css';

const Resume = () => {
  const [activeTab, setActiveTab] = useState('highlights');

  const highlights = [
    "Proficient in designing robust RESTful APIs using Node.js and Express.js backend architectures.",
    "Expertise in crafting interactive, high-performance user interfaces using React.js and modern state management.",
    "Deep implementation of secure identity flows, including JWT Authentication and protected relational data schemas.",
    "Dedicated to writing clean, maintainable systems code with structured optimization and seamless API integrations."
  ];

  const techStack = [
    { category: "Languages", items: ["JavaScript", "TypeScript", "C++", "Python"] },
    { category: "Web Stack & Engines", items: ["React", "Node.js", "Express", "Tailwind CSS"] },
    { category: "Systems & Architecture", items: ["Computer Networking", "Cyber Theory", "PostgreSQL", "NeonDB"] },
  ];

  return (
    <section className="resume-section" id="resume">
      <div className="section-header">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="section-subtitle"
        >
          06. ARCHIVE
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="section-title"
        >
          RESUME
        </motion.h2>
      </div>

      <div className="resume-container">
        <div className="resume-sidebar">
          <div className="resume-tabs">
            <button 
              className={`resume-tab-btn interactive ${activeTab === 'highlights' ? 'active' : ''}`}
              onClick={() => setActiveTab('highlights')}
            >
              HIGHLIGHTS
            </button>
            <button 
              className={`resume-tab-btn interactive ${activeTab === 'skills' ? 'active' : ''}`}
              onClick={() => setActiveTab('skills')}
            >
              TECH PROFILE
            </button>
          </div>

          <motion.div 
            className="resume-download-box liquid-glass"
            whileHover={{ scale: 1.02 }}
          >
            <FileText size={40} className="doc-icon" />
            <h3>PORTFOLIO_RESUME.pdf</h3>
            <a href={resumeFile} download="TANISHKA AGARWALL.docx" className="download-btn interactive">
              DOWNLOAD RESUME (.PDF)
              <Download size={18} />
            </a>
          </motion.div>
        </div>

        <div className="resume-main-panel liquid-glass">
          <div className="tab-content-area">
            <AnimatePresence mode="wait">
              {activeTab === 'highlights' && (
                <motion.div
                  key="highlights"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="highlights-tab"
                >
                  <h3>Core Frameworks & Architecture</h3>
                  <ul>
                    {highlights.map((h, idx) => (
                      <li key={idx}>
                        <CheckCircle2 size={18} className="list-check" />
                        <p>{h}</p>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {activeTab === 'skills' && (
                <motion.div
                  key="skills"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="skills-tab"
                >
                  <h3>Core Competencies Matrix</h3>
                  <div className="matrix-groups">
                    {techStack.map((stack, idx) => (
                      <div key={idx} className="matrix-group">
                        <h4>{stack.category}</h4>
                        <div className="matrix-tags">
                          {stack.items.map((item, iIdx) => (
                            <span key={iIdx} className="matrix-tag">{item}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;
