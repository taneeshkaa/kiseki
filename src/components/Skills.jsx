import React from 'react';
import { motion } from 'framer-motion';
import { Code2, ShieldCheck, Cpu, Layout, Database, Globe } from 'lucide-react';
import './Skills.css';

const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend Development",
      icon: <Layout size={24} />,
      skills: ["React", "Next.js", "Vue", "Framer Motion", "Three.js", "Tailwind"],
      color: "#00f2ff"
    },
    {
      title: "Backend & Systems",
      icon: <Database size={24} />,
      skills: ["Node.js", "Python", "Go", "PostgreSQL", "Redis", "Docker"],
      color: "#7000ff"
    },
    {
      title: "Cybersecurity",
      icon: <ShieldCheck size={24} />,
      skills: ["Penetration Testing", "Encryption", "Auth Architectures", "Network Security", "OWASP", "Zero Trust"],
      color: "#00ff41"
    },
    {
      title: "Core Technologies",
      icon: <Cpu size={24} />,
      skills: ["JavaScript", "TypeScript", "C++", "Rust", "WebAssembly", "Cloud Native"],
      color: "#ff00d4"
    }
  ];

  return (
    <section className="skills-section" id="skills">
      <div className="section-header">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="section-subtitle"
        >
          02. EXPERTISE
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="section-title"
        >
          TECHNICAL <span className="text-reveal">ARSENAL</span>
        </motion.h2>
      </div>

      <div className="skills-container">
        {skillCategories.map((cat, idx) => (
          <motion.div 
            key={idx}
            className="skill-category liquid-glass"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <div className="category-header" style={{ borderBottomColor: cat.color }}>
              <div className="cat-icon" style={{ color: cat.color }}>{cat.icon}</div>
              <h3>{cat.title}</h3>
            </div>
            <div className="skill-nodes">
              {cat.skills.map((skill, sIdx) => (
                <motion.div 
                  key={sIdx}
                  className="skill-node interactive"
                  whileHover={{ 
                    scale: 1.1, 
                    backgroundColor: cat.color + "22",
                    borderColor: cat.color,
                    color: cat.color,
                    boxShadow: `0 0 15px ${cat.color}66`
                  }}
                >
                  {skill}
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
