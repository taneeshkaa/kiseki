import React, { useMemo, useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });

  // IMPORTANT: Replace these placeholders with your real professional URLs/email.
  const links = useMemo(
    () => ({
      email: 'atanishka014@gmail.com',
      github: 'https://github.com/taneeshkaa',
      linkedin: 'https://www.linkedin.com/in/tanishkaag',
      leetcode: 'https://leetcode.com/u/tanishkaa14/'
    }),
    []
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formState.name || !formState.email || !formState.message) return;

    const subject = 'Contact inquiry';
    const body = `Name: ${formState.name}\nEmail: ${formState.email}\n\n${formState.message}`;

    const mailto = `mailto:${encodeURIComponent(links.email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-quote">
        <h2 className="contact-title">CONTACT</h2>
      </div>

      <div className="contact-split" role="region" aria-label="Architectural Split Layout">
        <aside className="contact-left" aria-label="Direct utilities">
          <div className="contact-left-label">DIRECT UTILITIES //</div>

          <ul className="contact-links" aria-label="Professional links">
            <li>
              <a className="contact-link" href={`mailto:${links.email}`}>
                {links.email}
              </a>
            </li>
            <li>
              <a className="contact-link" href={links.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
            </li>
            <li>
              <a className="contact-link" href={links.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </li>
          </ul>
        </aside>

        <div className="contact-right" aria-label="Contact form">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <input
                type="text"
                className="contact-input"
                placeholder="YOUR NAME"
                value={formState.name}
                onChange={(e) => setFormState((prev) => ({ ...prev, name: e.target.value }))}
                required
                aria-label="Name"
              />
            </div>

            <div className="form-row">
              <input
                type="email"
                className="contact-input"
                placeholder="YOUR EMAIL ADDRESS"
                value={formState.email}
                onChange={(e) => setFormState((prev) => ({ ...prev, email: e.target.value }))}
                required
                aria-label="Email"
              />
            </div>

            <div className="form-row">
              <input
                type="text"
                className="contact-input"
                placeholder="YOUR INQUIRY..."
                value={formState.message}
                onChange={(e) => setFormState((prev) => ({ ...prev, message: e.target.value }))}
                required
                aria-label="Message"
              />
            </div>

            <button type="submit" className="contact-submit">
              [ DISPATCH MESSAGE ]
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;

