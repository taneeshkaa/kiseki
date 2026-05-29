import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, X } from 'lucide-react';
import './CommandPalette.css';

const CommandPalette = ({ isOpen, onClose }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [githubData, setGithubData] = useState(null);
  const [leetcodeData, setLeetcodeData] = useState(null);
  const [loading, setLoading] = useState({ github: true, leetcode: true });
  
  const inputRef = useRef(null);

  const activeTab = selectedIndex === 0 ? 'github' : 'leetcode';

  // Keep focus and reset selected tab index on open
  useEffect(() => {
    if (!isOpen) return;
    const raf = window.requestAnimationFrame(() => {
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    });
    return () => window.cancelAnimationFrame(raf);
  }, [isOpen]);

  // Fetch Live API Data for profiles
  useEffect(() => {
    if (!isOpen) return;

    const fetchGithub = async () => {
      try {
        setLoading(prev => ({ ...prev, github: true }));
        const [profileRes, contribRes] = await Promise.all([
          fetch('https://api.github.com/users/taneeshkaa'),
          fetch('https://github-contributions-api.deno.dev/taneeshkaa.json')
        ]);

        let repos = 18; // base fallback
        if (profileRes.ok) {
          const profile = await profileRes.json();
          repos = profile.public_repos ?? repos;
        }

        if (contribRes.ok) {
          const contrib = await contribRes.json();
          const weeks = contrib.contributions || [];

          // Calculate stats
          let totalContributions = 0;
          const flatDays = weeks.flatMap(week => week);
          
          flatDays.forEach(day => {
            totalContributions += day.contributionCount || 0;
          });

          // Calculate streak backwards from today
          let currentStreak = 0;
          for (let i = flatDays.length - 1; i >= 0; i--) {
            if (flatDays[i].contributionCount > 0) {
              currentStreak++;
            } else if (currentStreak > 0) {
              break;
            }
          }

          setGithubData({
            weeks,
            repos,
            totalContributions,
            currentStreak
          });
        }
      } catch (err) {
        console.error('Error fetching GitHub live data', err);
      } finally {
        setLoading(prev => ({ ...prev, github: false }));
      }
    };

    const fetchLeetcode = async () => {
      try {
        setLoading(prev => ({ ...prev, leetcode: true }));
        const res = await fetch('https://alfa-leetcode-api.onrender.com/tanishkaa14/solved');
        if (res.ok) {
          const data = await res.json();
          setLeetcodeData({
            easy: data.easySolved ?? 6,
            medium: data.mediumSolved ?? 8,
            hard: data.hardSolved ?? 1,
            total: data.solvedProblem ?? 15
          });
        }
      } catch (err) {
        console.error('Error fetching LeetCode live data', err);
      } finally {
        setLoading(prev => ({ ...prev, leetcode: false }));
      }
    };

    fetchGithub();
    fetchLeetcode();
  }, [isOpen]);

  // Handle keyboard navigation (Arrow keys, Escape, Enter)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev === 0 ? 1 : 0));
      } else if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Map levels for GitHub Contribution Graph
  const getLevelFromContribution = (level) => {
    switch (level) {
      case 'NONE': return 0;
      case 'FIRST_QUARTILE': return 1;
      case 'SECOND_QUARTILE': return 2;
      case 'THIRD_QUARTILE': return 3;
      case 'FOURTH_QUARTILE': return 4;
      default: return 0;
    }
  };

  // Generate display weeks (live or mock fallback)
  const displayGithubWeeks = useMemo(() => {
    if (githubData?.weeks && githubData.weeks.length > 0) {
      return githubData.weeks.slice(-40);
    }
    
    // Fallback: build 40 columns of mock week cells
    const cols = [];
    for (let w = 0; w < 40; w++) {
      const week = [];
      for (let d = 0; d < 7; d++) {
        const i = w * 7 + d;
        const val = (i * 1664525 + 1013904223) % 4294967296;
        const r = val / 4294967296;
        let level = 'NONE';
        if (r > 0.85) level = 'FOURTH_QUARTILE';
        else if (r > 0.70) level = 'THIRD_QUARTILE';
        else if (r > 0.50) level = 'SECOND_QUARTILE';
        else if (r > 0.25) level = 'FIRST_QUARTILE';
        
        week.push({
          contributionLevel: level,
          contributionCount: level === 'NONE' ? 0 : Math.floor(r * 5) + 1,
          date: `2026-05-${w}-${d}`
        });
      }
      cols.push(week);
    }
    return cols;
  }, [githubData]);

  // LeetCode calculations
  const displayLeetcode = useMemo(() => {
    if (leetcodeData) return leetcodeData;
    return {
      easy: 6,
      medium: 8,
      hard: 1,
      total: 15
    };
  }, [leetcodeData]);

  const radius = 38;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius; // ~238.76

  const easyRatio = displayLeetcode.easy / (displayLeetcode.total || 1);
  const mediumRatio = displayLeetcode.medium / (displayLeetcode.total || 1);
  const hardRatio = displayLeetcode.hard / (displayLeetcode.total || 1);

  const easyStroke = circumference * easyRatio;
  const mediumStroke = circumference * mediumRatio;
  const hardStroke = circumference * hardRatio;

  const easyOffset = 0;
  const mediumOffset = -easyStroke;
  const hardOffset = -(easyStroke + mediumStroke);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="cmd-palette-overlay" onClick={onClose}>
          <motion.div 
            className="cmd-palette-box liquid-glass"
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="cmd-content">
              {/* Left Column */}
              <div className="cmd-left">
                {/* Console prompt line replacing old search bar */}
                <div className="cmd-input-container">
                  <Terminal size={18} className="cmd-input-icon" />
                  <div className="cmd-prompt-line">
                    <span className="cmd-prompt-user">visitor@kiseki:~$</span>
                    <span className="cmd-prompt-cmd">
                      {activeTab === 'github' ? 'fetch --github_analytics' : 'fetch --leetcode_metrics'}
                    </span>
                    <span className="cmd-prompt-cursor" />
                  </div>
                  {/* Invisible input just for capturing focus & keyboard events */}
                  <input
                    ref={inputRef}
                    type="text"
                    className="cmd-hidden-input"
                    aria-label="Command Input"
                  />
                  <button className="cmd-close-btn" onClick={onClose} aria-label="Close palette">
                    <X size={16} />
                  </button>
                </div>

                {/* Master Tab Controllers */}
                <div className="cmd-list-tabs">
                  <div 
                    className={`cmd-tab-controller ${activeTab === 'github' ? 'active' : ''}`}
                    onClick={() => setSelectedIndex(0)}
                    onMouseEnter={() => setSelectedIndex(0)}
                  >
                    <div className="cmd-controller-title">[01] PROFILE // GITHUB_ANALYTICS</div>
                    <div className="cmd-controller-subtitle">Contribution Heatmap & Operational Stats</div>
                  </div>
                  
                  <div 
                    className={`cmd-tab-controller ${activeTab === 'leetcode' ? 'active' : ''}`}
                    onClick={() => setSelectedIndex(1)}
                    onMouseEnter={() => setSelectedIndex(1)}
                  >
                    <div className="cmd-controller-title">[02] PROFILE // LEETCODE_METRICS</div>
                    <div className="cmd-controller-subtitle">Algorithm Graph & Problem Metrics</div>
                  </div>
                </div>

                <div className="cmd-footer">
                  <span>Use <kbd>↑</kbd> <kbd>↓</kbd> to navigate, <kbd>Enter</kbd> to select, <kbd>Esc</kbd> to close.</span>
                </div>
              </div>

              {/* Right Column */}
              <div className="cmd-right">
                {/* Slider Header Framework */}
                <div className="cmd-right-header">
                  <div className="cmd-header-labels">
                    <button 
                      className={`cmd-header-label ${activeTab === 'github' ? 'active' : ''}`}
                      onClick={() => setSelectedIndex(0)}
                    >
                      GITHUB INDEX
                      {activeTab === 'github' && (
                        <motion.div 
                          className="cmd-slider-underline" 
                          layoutId="activeUnderline"
                          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                        />
                      )}
                    </button>
                    <button 
                      className={`cmd-header-label ${activeTab === 'leetcode' ? 'active' : ''}`}
                      onClick={() => setSelectedIndex(1)}
                    >
                      LEETCODE MATRIX
                      {activeTab === 'leetcode' && (
                        <motion.div 
                          className="cmd-slider-underline" 
                          layoutId="activeUnderline"
                          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                        />
                      )}
                    </button>
                  </div>
                </div>

                {/* Main View Area */}
                <div className="cmd-right-stage">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      className="cmd-right-inner"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                    >
                      {activeTab === 'github' ? (
                        <div className="cmd-github-stage">
                          <div className="cmd-github-title">CONTRIBUTION CHART // PROFILES</div>
                          
                          {/* Horizontally scrolling matrix */}
                          <div className="cmd-github-matrix-container">
                            <div className="cmd-github-months">
                              <span>Jan</span>
                              <span>Feb</span>
                              <span>Mar</span>
                              <span>Apr</span>
                              <span>May</span>
                              <span>Jun</span>
                              <span>Jul</span>
                              <span>Aug</span>
                              <span>Sep</span>
                              <span>Oct</span>
                              <span>Nov</span>
                              <span>Dec</span>
                            </div>
                            <div className="cmd-github-grid-body">
                              <div className="cmd-github-days">
                                <span>Mon</span>
                                <span>Wed</span>
                                <span>Fri</span>
                              </div>
                              <div className="cmd-github-grid">
                                {displayGithubWeeks.map((week, wIdx) => (
                                  <div key={wIdx} className="cmd-github-column">
                                    {week.map((day, dIdx) => (
                                      <div 
                                        key={dIdx} 
                                        className={`cmd-github-cell level-${getLevelFromContribution(day.contributionLevel)} ${loading.github ? 'loading' : ''}`}
                                        title={`${day.contributionCount} contributions on ${day.date}`}
                                      />
                                    ))}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Monospace Statistics Row */}
                          <div className="cmd-github-stats-row">
                            <div className="cmd-vector-item">
                              REPOSITORIES // {loading.github ? '...' : (githubData?.repos ?? 18)}
                            </div>
                            <div className="cmd-vector-divider">//</div>
                            <div className="cmd-vector-item">
                              CONTRIB_STREAK // {loading.github ? '...' : `${githubData?.currentStreak ?? 0} DAYS`}
                            </div>
                            <div className="cmd-vector-divider">//</div>
                            <div className="cmd-vector-item">
                              SYSTEM_STATUS // {loading.github ? 'SYNCING' : (githubData ? 'LIVE' : 'OFFLINE')}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="cmd-leetcode-stage">
                          {loading.leetcode ? (
                            <>
                              <div className="cmd-leetcode-left">
                                <div className="cmd-leetcode-skeleton-circle cmd-skeleton" />
                              </div>
                              <div className="cmd-leetcode-right">
                                <div className="cmd-leetcode-skeleton-bar cmd-skeleton" style={{ width: '80%' }} />
                                <div className="cmd-leetcode-skeleton-bar cmd-skeleton" style={{ width: '90%' }} />
                                <div className="cmd-leetcode-skeleton-bar cmd-skeleton" style={{ width: '75%' }} />
                                <div className="cmd-leetcode-skeleton-bar cmd-skeleton" style={{ width: '100%' }} />
                              </div>
                            </>
                          ) : (
                            <>
                              {/* SVG Donut Chart */}
                              <div className="cmd-leetcode-left">
                                <svg width="150" height="150" viewBox="0 0 100 100" className="cmd-leetcode-svg">
                                  <circle
                                    cx="50"
                                    cy="50"
                                    r={radius}
                                    fill="transparent"
                                    stroke="var(--border-color)"
                                    strokeWidth={strokeWidth}
                                  />
                                  {/* Easy */}
                                  <motion.circle
                                    cx="50"
                                    cy="50"
                                    r={radius}
                                    fill="transparent"
                                    stroke="#00b8a3"
                                    strokeWidth={strokeWidth}
                                    strokeDasharray={`${easyStroke} ${circumference}`}
                                    strokeDashoffset={easyOffset}
                                    strokeLinecap="round"
                                    transform="rotate(-90 50 50)"
                                    initial={{ strokeDashoffset: circumference }}
                                    animate={{ strokeDashoffset: easyOffset }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                  />
                                  {/* Medium */}
                                  <motion.circle
                                    cx="50"
                                    cy="50"
                                    r={radius}
                                    fill="transparent"
                                    stroke="#ffc01e"
                                    strokeWidth={strokeWidth}
                                    strokeDasharray={`${mediumStroke} ${circumference}`}
                                    strokeDashoffset={mediumOffset}
                                    strokeLinecap="round"
                                    transform="rotate(-90 50 50)"
                                    initial={{ strokeDashoffset: circumference }}
                                    animate={{ strokeDashoffset: mediumOffset }}
                                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
                                  />
                                  {/* Hard */}
                                  <motion.circle
                                    cx="50"
                                    cy="50"
                                    r={radius}
                                    fill="transparent"
                                    stroke="#ff375f"
                                    strokeWidth={strokeWidth}
                                    strokeDasharray={`${hardStroke} ${circumference}`}
                                    strokeDashoffset={hardOffset}
                                    strokeLinecap="round"
                                    transform="rotate(-90 50 50)"
                                    initial={{ strokeDashoffset: circumference }}
                                    animate={{ strokeDashoffset: hardOffset }}
                                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                                  />
                                  
                                  <text x="50" y="48" textAnchor="middle" className="cmd-leetcode-svg-total" fill="var(--text-primary)">
                                    {displayLeetcode.total}
                                  </text>
                                  <text x="50" y="62" textAnchor="middle" className="cmd-leetcode-svg-label" fill="var(--text-secondary)">
                                    SOLVED
                                  </text>
                                </svg>
                              </div>

                              {/* Problem Metrics List */}
                              <div className="cmd-leetcode-right">
                                <div className="cmd-leetcode-metric-item easy">
                                  <span className="cmd-metric-label">EASY</span>
                                  <span className="cmd-metric-count">{displayLeetcode.easy}</span>
                                </div>
                                <div className="cmd-leetcode-metric-item medium">
                                  <span className="cmd-metric-label">MEDIUM</span>
                                  <span className="cmd-metric-count">{displayLeetcode.medium}</span>
                                </div>
                                <div className="cmd-leetcode-metric-item hard">
                                  <span className="cmd-metric-label">HARD</span>
                                  <span className="cmd-metric-count">{displayLeetcode.hard}</span>
                                </div>
                                <div className="cmd-leetcode-metric-item total">
                                  <span className="cmd-metric-label">TOTAL PROBLEMS SOLVED</span>
                                  <span className="cmd-metric-count">{displayLeetcode.total}</span>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
