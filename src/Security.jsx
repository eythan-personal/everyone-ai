import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ProfileDropdown from './ProfileDropdown'
import './Security.css'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
}

function FadeUp({ children, className, delay = 0 }) {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default function Security() {
  const [navInverted, setNavInverted] = useState(false)
  const footerRef = useRef(null)

  useEffect(() => {
    document.title = 'Security — Everyone AI'
    return () => { document.title = 'Everyone AI' }
  }, [])

  useEffect(() => {
    const footer = footerRef.current
    if (!footer) return
    const observer = new IntersectionObserver(
      ([entry]) => setNavInverted(entry.isIntersecting),
      { rootMargin: '-0px 0px -95% 0px', threshold: 0 }
    )
    observer.observe(footer)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="security-page">
      <a href="#main" className="skip-link">Skip to content</a>

      <motion.nav
        className={`security-nav${navInverted ? ' security-nav--inverted' : ''}`}
        aria-label="Main navigation"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="security-nav-left">
          <Link to="/" className="security-nav-brand">Everyone AI</Link>
        </div>
        <div className="security-nav-right">
          <ProfileDropdown />
        </div>
      </motion.nav>

      <main id="main">
        {/* Hero */}
        <motion.section
          className="security-hero"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <span className="security-hero-label">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            Security
          </span>
          <h1 className="security-hero-title">Your data never leaves your server.</h1>
          <p className="security-hero-subtitle">
            Everyone AI is built from the ground up with privacy and security at its core.
            Self-hosted, open source, and completely under your control.
          </p>
        </motion.section>

        {/* Feature rows */}
        <section className="security-features">
          {/* Self-hosted */}
          <motion.div
            className="security-row"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={stagger}
          >
            <FadeUp className="security-row-text">
              <div className="security-row-icon-wrap security-icon-server">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>
              </div>
              <h3>Self-hosted by design</h3>
              <p>
                Your AI assistant runs entirely on your own hardware. There's no cloud relay, no
                third-party server, and no middleman between you and your data. You own the
                infrastructure — full stop.
              </p>
            </FadeUp>
            <FadeUp className="security-row-visual" delay={0.15}>
              <div className="security-mockup">
                <div className="security-mockup-item">
                  <div className="security-check">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                  </div>
                  <div>
                    <span className="security-mockup-title">Runs on your machine</span>
                    <span className="security-mockup-desc">No external servers involved</span>
                  </div>
                </div>
                <div className="security-mockup-item">
                  <div className="security-check">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                  </div>
                  <div>
                    <span className="security-mockup-title">Local database</span>
                    <span className="security-mockup-desc">All data stored on your server</span>
                  </div>
                </div>
                <div className="security-mockup-item">
                  <div className="security-check">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                  </div>
                  <div>
                    <span className="security-mockup-title">No cloud dependency</span>
                    <span className="security-mockup-desc">Works offline, always available</span>
                  </div>
                </div>
              </div>
            </FadeUp>
          </motion.div>

          {/* Encryption */}
          <motion.div
            className="security-row security-row-reverse"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={stagger}
          >
            <FadeUp className="security-row-text">
              <div className="security-row-icon-wrap security-icon-lock">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
              </div>
              <h3>End-to-end encryption</h3>
              <p>
                Every message, every credential, every piece of data your agent handles is
                encrypted in transit and at rest. TLS 1.3 for communications, AES-256 for
                storage. No exceptions.
              </p>
            </FadeUp>
            <FadeUp className="security-row-visual" delay={0.15}>
              <div className="security-mockup security-mockup-encrypt">
                <div className="security-encrypt-visual">
                  <div className="security-encrypt-block">
                    <span className="security-encrypt-label">Your message</span>
                    <span className="security-encrypt-plain">Book dinner for 2 tonight</span>
                  </div>
                  <div className="security-encrypt-arrow">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>
                  </div>
                  <div className="security-encrypt-block security-encrypt-cipher">
                    <span className="security-encrypt-label">Encrypted (AES-256)</span>
                    <span className="security-encrypt-code">a7f2•••e9b1•••3c4d•••8f0a</span>
                  </div>
                  <div className="security-encrypt-badge">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
                    TLS 1.3 · AES-256
                  </div>
                </div>
              </div>
            </FadeUp>
          </motion.div>

          {/* No data collection */}
          <motion.div
            className="security-row"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={stagger}
          >
            <FadeUp className="security-row-text">
              <div className="security-row-icon-wrap security-icon-eye">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
              </div>
              <h3>Zero data collection</h3>
              <p>
                We never see, store, or sell your data. There's no telemetry, no analytics
                phoning home, no usage tracking. Your conversations and actions stay between
                you and your server.
              </p>
            </FadeUp>
            <FadeUp className="security-row-visual" delay={0.15}>
              <div className="security-mockup">
                <div className="security-zero-grid">
                  <div className="security-zero-item">
                    <span className="security-zero-x">✕</span>
                    <span>No telemetry</span>
                  </div>
                  <div className="security-zero-item">
                    <span className="security-zero-x">✕</span>
                    <span>No analytics</span>
                  </div>
                  <div className="security-zero-item">
                    <span className="security-zero-x">✕</span>
                    <span>No tracking</span>
                  </div>
                  <div className="security-zero-item">
                    <span className="security-zero-x">✕</span>
                    <span>No data sales</span>
                  </div>
                </div>
              </div>
            </FadeUp>
          </motion.div>

          {/* Open source */}
          <motion.div
            className="security-row security-row-reverse"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={stagger}
          >
            <FadeUp className="security-row-text">
              <div className="security-row-icon-wrap security-icon-code">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
              </div>
              <h3>Open source & auditable</h3>
              <p>
                The entire codebase is open source. Security researchers, developers, and
                anyone can inspect every line. No black boxes, no hidden endpoints, no
                trust-us promises.
              </p>
            </FadeUp>
            <FadeUp className="security-row-visual" delay={0.15}>
              <div className="security-mockup security-mockup-code">
                <div className="security-code-header">
                  <span className="security-code-dot" style={{ background: '#ff5f57' }} />
                  <span className="security-code-dot" style={{ background: '#febc2e' }} />
                  <span className="security-code-dot" style={{ background: '#28c840' }} />
                  <span className="security-code-file">openclaw/agent.py</span>
                </div>
                <pre className="security-code-block">
{`# All requests stay local
def process_request(msg):
    encrypted = encrypt(msg, AES_256)
    result = agent.execute(encrypted)
    return decrypt(result)

# Zero external calls
assert no_outbound_connections()`}
                </pre>
              </div>
            </FadeUp>
          </motion.div>
        </section>

        {/* Trust pills */}
        <motion.section
          className="security-trust"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
        >
          <FadeUp>
            <h2 className="security-trust-title">Built on principles, not promises.</h2>
          </FadeUp>
          <motion.div className="security-trust-pills" variants={stagger}>
            {[
              'Self-hosted infrastructure',
              'AES-256 encryption',
              'Zero telemetry',
              'Open source codebase',
              'No third-party access',
              'GDPR compliant',
              'SOC 2 ready',
              'Regular security audits',
            ].map((label) => (
              <motion.span
                key={label}
                className="security-pill"
                variants={fadeUp}
                transition={{ duration: 0.5 }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                {label}
              </motion.span>
            ))}
          </motion.div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer ref={footerRef} className="footer">
        <div className="footer-bg" />
        <div className="footer-content">
          <div className="footer-cta" id="cta">
            <h2 className="footer-cta-title">Try Everyone AI today</h2>
            <p className="footer-cta-subtitle">Built on OpenClaw. Self-hosted, open source, and private by default.</p>
            <Link to="/setup" className="footer-cta-btn">Get Started</Link>
          </div>
          <div className="footer-nav">
            <div className="footer-top">
              <div className="footer-brand">
                <img src="/agentbay.svg" alt="" className="footer-logo" />
                <span className="footer-brand-name">Everyone AI</span>
                <p className="footer-tagline">Your personal AI assistant, running on your server.</p>
              </div>
              <div className="footer-columns">
                <div className="footer-col">
                  <h4 className="footer-col-title">Product</h4>
                  <Link to="/tools" className="footer-link">Tools</Link>
                  <Link to="/small-business" className="footer-link">Small Business</Link>
                  <Link to="/security" className="footer-link">Security</Link>
                </div>
                <div className="footer-col">
                  <h4 className="footer-col-title">Company</h4>
                  <a href="/about" className="footer-link">About</a>
                  <a href="/blog" className="footer-link">Blog</a>
                  <a href="/privacy" className="footer-link">Privacy</a>
                  <a href="/terms" className="footer-link">Terms</a>
                </div>
                <div className="footer-col">
                  <h4 className="footer-col-title">Connect</h4>
                  <div className="footer-socials">
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="footer-social" aria-label="GitHub">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                    </a>
                    <a href="https://discord.gg" target="_blank" rel="noopener noreferrer" className="footer-social" aria-label="Discord">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
                    </a>
                    <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="footer-social" aria-label="X">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="footer-bottom">
              <span>&copy; {new Date().getFullYear()} Everyone AI. All rights reserved.</span>
              <span className="footer-powered">Powered by <a href="https://openclaw.ai" target="_blank" rel="noopener noreferrer">OpenClaw</a></span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
