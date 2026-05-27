import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, Terminal, Mail, Phone, MapPin } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const logsEndRef = useRef(null);

  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalLogs]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setIsSubmitting(true);
    setTerminalLogs([]);

    const logs = [
      "Initializing connection to remote endpoint...",
      "Resolving COMMS_PORT_443 via encrypted DNS...",
      "Negotiating SSL/TLS handshake (TLSv1.3)...",
      "Cipher suite: TLS_AES_256_GCM_SHA384 (256-bit key)",
      "Secure channel successfully established.",
      "Parsing contact transmission packets...",
      `Sender identity: "${formState.name}" <${formState.email}>`,
      "Encrypting message payload with AES-256...",
      "Streaming payload buffers to database host...",
      "Transmission fully broadcasted!",
      `Verification digest: SHA256-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
      "Closing connection... [STATUS: SUCCESS]"
    ];

    logs.forEach((log, index) => {
      setTimeout(() => {
        setTerminalLogs(prev => [...prev, log]);
        if (index === logs.length - 1) {
          setIsSubmitting(false);
          setSubmitted(true);
          setFormState({ name: '', email: '', message: '' });
        }
      }, (index + 1) * 450);
    });
  };

  return (
    <section className="contact-section" id="contact">
      <div className="section-header">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="section-subtitle"
        >
          05. CONNECTION
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="section-title"
        >
          INITIATE <span className="text-reveal">PROTOCOL</span>
        </motion.h2>
      </div>

      <div className="contact-grid">
        <motion.div 
          className="contact-info-panel liquid-glass"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
        >
          <div className="info-header">
            <h3>DIRECT CHANNELS</h3>
            <p>Ready to collaborate on your next groundbreaking project?</p>
          </div>
          
          <div className="info-items">
            <div className="info-item">
              <Mail className="info-icon" />
              <div>
                <span>EMAIL</span>
                <p>contact@sys.terminal</p>
              </div>
            </div>
            <div className="info-item">
              <Phone className="info-icon" />
              <div>
                <span>SECURE LINE</span>
                <p>+1 (555) 010-0110</p>
              </div>
            </div>
            <div className="info-item">
              <MapPin className="info-icon" />
              <div>
                <span>LOCATION</span>
                <p>Digital Frontier / Global</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="contact-terminal liquid-glass"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
        >
          <div className="terminal-header">
            <div className="terminal-dots">
              <span></span><span></span><span></span>
            </div>
            <div className="terminal-title">
              <Terminal size={14} />
              <span>SSH: COMMS_PORT_443</span>
            </div>
          </div>
          
          {isSubmitting || submitted ? (
            <div className="terminal-logs-container">
              <div className="terminal-logs">
                {terminalLogs.map((log, idx) => (
                  <div key={idx} className="terminal-log-line">
                    <span className="terminal-prompt">system@local:~$</span> {log}
                  </div>
                ))}
                {isSubmitting && (
                  <div className="terminal-log-line">
                    <span className="terminal-prompt">system@local:~$</span>
                    <span className="terminal-log-cursor"></span>
                  </div>
                )}
                <div ref={logsEndRef} />
              </div>
              {submitted && (
                <button
                  type="button"
                  className="terminal-submit interactive"
                  onClick={() => setSubmitted(false)}
                >
                  NEW_TRANSMISSION
                  <Terminal size={16} />
                </button>
              )}
            </div>
          ) : (
            <form className="terminal-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>root@user:~$ NAME</label>
                <input 
                  type="text" 
                  placeholder="Enter your name..." 
                  className="terminal-input" 
                  value={formState.name}
                  onChange={(e) => setFormState(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>
              <div className="form-group">
                <label>root@user:~$ EMAIL</label>
                <input 
                  type="email" 
                  placeholder="Enter your email..." 
                  className="terminal-input" 
                  value={formState.email}
                  onChange={(e) => setFormState(prev => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>
              <div className="form-group">
                <label>root@user:~$ MESSAGE</label>
                <textarea 
                  placeholder="Type your transmission..." 
                  className="terminal-textarea"
                  value={formState.message}
                  onChange={(e) => setFormState(prev => ({ ...prev, message: e.target.value }))}
                  required
                ></textarea>
              </div>
              
              <button type="submit" className="terminal-submit interactive">
                SEND_TRANSMISSION
                <Send size={16} />
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
