import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ProfileDropdown from './ProfileDropdown'
import './SmallBusiness.css'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
}

const scaleUp = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1 },
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

function ScaleIn({ children, className, delay = 0 }) {
  return (
    <motion.div
      className={className}
      variants={scaleUp}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  )
}

const integrations = [
  { name: 'QuickBooks', src: '/integrations/quickbooks.svg', bg: '#2CA01C' },
  { name: 'Stripe', src: '/integrations/stripe.svg', bg: '#635BFF' },
  { name: 'Shopify', src: '/integrations/shopify.svg', bg: '#ffffff', outline: true },
  { name: 'Google Calendar', src: '/integrations/google-calendar.svg', bg: '#ffffff', outline: true },
  { name: 'Mailchimp', src: '/integrations/mailchimp.svg', bg: '#FFE01B' },
  { name: 'Notion', src: '/integrations/notion.svg', bg: '#ffffff', outline: true },
  { name: 'HubSpot', src: '/integrations/hubspot.svg', bg: '#FF7A59' },
  { name: 'Zapier', src: '/integrations/zapier.svg', bg: '#FF4F00' },
]

export default function SmallBusiness() {
  const [navInverted, setNavInverted] = useState(false)
  const footerRef = useRef(null)

  useEffect(() => {
    document.title = 'Small Business — Everyone AI'
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
    <div className="smb-page">
      <a href="#main" className="skip-link">Skip to content</a>

      <motion.nav
        className={`smb-nav${navInverted ? ' smb-nav--inverted' : ''}`}
        aria-label="Main navigation"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="smb-nav-left">
          <Link to="/" className="smb-nav-brand">Everyone AI</Link>
        </div>
        <div className="smb-nav-right">
          <ProfileDropdown />
        </div>
      </motion.nav>

      <main id="main">
        {/* Hero */}
        <motion.section
          className="smb-hero"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <span className="smb-hero-label">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            Small Business
          </span>
          <h1 className="smb-hero-title">Your AI employee that never clocks out.</h1>
          <p className="smb-hero-subtitle">
            Automate invoicing, scheduling, follow-ups, and more — while keeping
            all your business data secure on your own server.
          </p>
          <Link to="/setup" className="smb-hero-btn">Get Started</Link>
        </motion.section>

        {/* Automation Card */}
        <section className="smb-auto-section">
          <motion.div
            className="smb-auto-card"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
          >
            <FadeUp className="smb-auto-text">
              <h2>Automate the busywork. Focus on growth.</h2>
              <p>
                From invoicing and appointment scheduling to inventory alerts and customer
                follow-ups — your AI handles the repetitive tasks that eat up your day.
                Everything runs on your own server, so sensitive business data never leaves
                your control.
              </p>
              <Link to="/security" className="smb-auto-link">
                Learn about our security <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </Link>
            </FadeUp>
            <ScaleIn className="smb-auto-visual" delay={0.15}>
              <div className="smb-auto-mockup">
                <div className="smb-auto-mockup-header">
                  <span className="smb-auto-dot" />
                  <span className="smb-auto-mockup-title">Daily Automations</span>
                  <span className="smb-auto-badge">3 running</span>
                </div>
                <div className="smb-auto-rows">
                  <div className="smb-auto-row">
                    <div className="smb-auto-icon smb-auto-icon-invoice">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                    </div>
                    <div className="smb-auto-row-content">
                      <span className="smb-auto-row-title">Send overdue invoices</span>
                      <span className="smb-auto-row-meta">3 reminders sent this morning</span>
                    </div>
                    <span className="smb-auto-status smb-auto-done">Done</span>
                  </div>
                  <div className="smb-auto-row">
                    <div className="smb-auto-icon smb-auto-icon-calendar">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    </div>
                    <div className="smb-auto-row-content">
                      <span className="smb-auto-row-title">Confirm tomorrow's appointments</span>
                      <span className="smb-auto-row-meta">8 clients notified via SMS</span>
                    </div>
                    <span className="smb-auto-status smb-auto-done">Done</span>
                  </div>
                  <div className="smb-auto-row">
                    <div className="smb-auto-icon smb-auto-icon-inventory">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="21 8 21 21 3 21 3 8"/><rect x="1" y="3" width="22" height="5"/><line x1="10" y1="12" x2="14" y2="12"/></svg>
                    </div>
                    <div className="smb-auto-row-content">
                      <span className="smb-auto-row-title">Restock low inventory</span>
                      <span className="smb-auto-row-meta">2 orders placed automatically</span>
                    </div>
                    <span className="smb-auto-status smb-auto-active">Running</span>
                  </div>
                  <div className="smb-auto-row">
                    <div className="smb-auto-icon smb-auto-icon-followup">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    </div>
                    <div className="smb-auto-row-content">
                      <span className="smb-auto-row-title">Follow up with new leads</span>
                      <span className="smb-auto-row-meta">5 personalized emails queued</span>
                    </div>
                    <span className="smb-auto-status smb-auto-queued">Queued</span>
                  </div>
                </div>
                <div className="smb-auto-footer">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
                  <span>All data stays on your server</span>
                </div>
              </div>
            </ScaleIn>
          </motion.div>
        </section>

        {/* Use Cases */}
        <motion.section
          className="smb-cases"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
        >
          <FadeUp>
            <h2 className="smb-cases-title">Built for how you actually work</h2>
            <p className="smb-cases-subtitle">
              Whether you're a solo founder or a growing team, Everyone AI adapts to your workflows.
            </p>
          </FadeUp>
          <motion.div className="smb-cases-grid" variants={stagger}>
            <FadeUp className="smb-case-card">
              <div className="smb-case-icon smb-case-icon-money">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              </div>
              <h3>Invoicing & Payments</h3>
              <p>Automatically send invoices, chase overdue payments, and reconcile transactions with your accounting software.</p>
            </FadeUp>
            <FadeUp className="smb-case-card" delay={0.1}>
              <div className="smb-case-icon smb-case-icon-cal">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              </div>
              <h3>Scheduling & Appointments</h3>
              <p>Manage bookings, send confirmations and reminders, and handle rescheduling — all without lifting a finger.</p>
            </FadeUp>
            <FadeUp className="smb-case-card" delay={0.2}>
              <div className="smb-case-icon smb-case-icon-box">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="21 8 21 21 3 21 3 8"/><rect x="1" y="3" width="22" height="5"/><line x1="10" y1="12" x2="14" y2="12"/></svg>
              </div>
              <h3>Inventory & Ordering</h3>
              <p>Track stock levels, get low-inventory alerts, and auto-reorder from suppliers before you run out.</p>
            </FadeUp>
          </motion.div>
        </motion.section>

        {/* Integrations */}
        <motion.section
          className="smb-integrations"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={stagger}
        >
          <FadeUp>
            <h2 className="smb-integrations-title">Connect the tools that run your business</h2>
            <p className="smb-integrations-subtitle">
              Integrate with the platforms you already use — from accounting and CRM to
              scheduling and e-commerce.
            </p>
          </FadeUp>
          <FadeUp delay={0.15}>
            <div className="smb-integrations-grid">
              {integrations.map((tool) => (
                <div key={tool.name} className="smb-integration-icon" title={tool.name}>
                  <div className="smb-integration-img" style={{ background: tool.bg, border: tool.outline ? '1px solid #e0e0e0' : 'none' }}>
                    <img src={tool.src} alt={tool.name} />
                  </div>
                  <span className="smb-integration-name">{tool.name}</span>
                </div>
              ))}
            </div>
          </FadeUp>
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
