import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, FileText, CheckCircle2, ShieldCheck, Terminal, Cpu } from 'lucide-react';
import './Resume.css';

const Resume = () => {
  const [activeTab, setActiveTab] = useState('highlights');

  const stats = [
    { label: "COMMITS PUSHED", value: "2,450+", icon: <Terminal size={16} /> },
    { label: "THREATS ANALYZED", value: "140+", icon: <ShieldCheck size={16} /> },
    { label: "SERVICES DEPLOYED", value: "32", icon: <Cpu size={16} /> },
  ];

  const highlights = [
    "Expertise in secure coding guidelines and OWASP Top 10 mitigations.",
    "Proven track record of designing scalable microservice architectures.",
    "Proficient in modern infrastructure setup (Kubernetes, Terraform, AWS).",
    "Continuous open-source contributor and security researcher."
  ];

  const techStack = [
    { category: "Languages", items: ["Rust", "TypeScript", "Go", "Python", "C++"] },
    { category: "Web Frameworks", items: ["React", "Next.js", "Express", "FastAPI"] },
    { category: "Security Tools", items: ["Burp Suite", "Wireshark", "Metasploit", "Nmap"] },
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
          SECURE <span className="text-reveal">RESUME</span> TRANSMISSION
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
            <p>Verification Checksum: MD5_3A9F2E78...</p>
            <a href="#" className="download-btn interactive">
              DOWNLOAD DECRYPTED COPY
              <Download size={18} />
            </a>
          </motion.div>
        </div>

        <div className="resume-main-panel liquid-glass">
          <div className="stats-row">
            {stats.map((stat, idx) => (
              <div key={idx} className="stat-card">
                <div className="stat-icon">{stat.icon}</div>
                <div>
                  <span className="stat-value">{stat.value}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              </div>
            ))}
          </div>

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
                  <h3>Key Focus Areas & Impact</h3>
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
