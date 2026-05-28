import React from 'react';
import { motion } from 'framer-motion';
import './Skills.css';

const skillColumns = [
  {
    label: '02.1 // LANGUAGES',
    items: ['JavaScript', 'TypeScript', 'C++', 'Python'],
  },
  {
    label: '02.2 // WEB ENGINE & ARCHITECTURE',
    items: ['React.js', 'Node.js', 'Express.js', 'Tailwind CSS', 'HTML5 / CSS3', 'REST APIs'],
  },
  {
    label: '02.3 // SYSTEMS THEORY & SECURE DATA',
    items: ['Computer Networking', 'Cyber Theory', 'PostgreSQL', 'NeonDB', 'MongoDB (Learning)'],
  },
  {
    label: '02.4 // INFRASTRUCTURE & TOOLS',
    items: ['Full-Stack Development', 'Git / GitHub', 'Postman', 'Vercel', 'API Integration', 'Responsive Design'],
  },
];

const gridVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.12,
    },
  },
};

const headerRuleVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const dividerVariants = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const columnVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

const itemListVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
};

const Skills = () => {
  return (
    <motion.section
      className="skills-section"
      id="skills"
      aria-labelledby="skills-heading"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={gridVariants}
    >
      <div className="skills-shell">
        <motion.div className="skills-header" variants={columnVariants}>
          <p className="skills-eyebrow">02. EXPERTISE</p>
          <h2 id="skills-heading" className="skills-title">
            CORE <span>CAPABILITIES</span>
          </h2>
          <motion.span className="skills-header__rule" aria-hidden="true" variants={headerRuleVariants} />
        </motion.div>

        <div className="skills-grid">
          {skillColumns.map((column, columnIndex) => (
            <motion.article
              key={column.label}
              className={`skills-column ${columnIndex === skillColumns.length - 1 ? 'skills-column--last' : ''}`}
              variants={columnVariants}
            >
              <div className="skills-column__label">{column.label}</div>
              <motion.span
                className="skills-column__rule"
                aria-hidden="true"
                variants={headerRuleVariants}
              />

              <motion.ul className="skills-list" variants={itemListVariants}>
                {column.items.map((item) => (
                  <motion.li key={item} className="skills-list__item" variants={itemVariants}>
                    <span className="skills-list__text">{item}</span>
                  </motion.li>
                ))}
              </motion.ul>

              {columnIndex < skillColumns.length - 1 ? (
                <motion.span
                  className="skills-column__divider"
                  aria-hidden="true"
                  variants={dividerVariants}
                />
              ) : null}
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Skills;