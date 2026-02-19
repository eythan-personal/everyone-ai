import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import ProfileDropdown from './ProfileDropdown'
import './App.css'

/* ── Animation helpers ── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

const scaleUp = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1 },
}

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
}

const staggerSlow = {
  visible: { transition: { staggerChildren: 0.18 } },
}

const spring = { type: 'spring', damping: 25, stiffness: 120 }

function Section({ children, className, id, delay = 0 }) {
  return (
    <motion.section
      className={className}
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={stagger}
    >
      {children}
    </motion.section>
  )
}

function FadeUp({ children, className, delay = 0, duration = 0.7 }) {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
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

/* ── Typing Rotation ── */
const rotatingPhrases = [
  'Clean inbox',
  'Send follow-ups',
  'Update calendar',
  'Set reminders',
  'Book appointments',
  'Reschedule meetings',
  'Cancel subscriptions',
  'Reorder essentials',
  'Track packages',
  'Draft emails',
  'Fill out forms',
  'Make reservations',
  'Compare prices',
  'Research best options',
  'Renew memberships',
  'Organize files',
  'Plan trips',
]

const accentColors = ['var(--accent-green)', 'var(--accent-purple)', 'var(--accent-orange)']

function RotatingTyper() {
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  const phrase = rotatingPhrases[phraseIndex]
  const colorIndex = phraseIndex % accentColors.length

  useEffect(() => {
    const typeSpeed = isDeleting ? 35 : 65
    const pauseAtEnd = 1800
    const pauseAtStart = 300

    if (!isDeleting && charIndex === phrase.length) {
      const timeout = setTimeout(() => setIsDeleting(true), pauseAtEnd)
      return () => clearTimeout(timeout)
    }

    if (isDeleting && charIndex === 0) {
      const timeout = setTimeout(() => {
        setIsDeleting(false)
        setPhraseIndex((phraseIndex + 1) % rotatingPhrases.length)
      }, pauseAtStart)
      return () => clearTimeout(timeout)
    }

    const timeout = setTimeout(() => {
      setCharIndex(prev => prev + (isDeleting ? -1 : 1))
    }, typeSpeed)

    return () => clearTimeout(timeout)
  }, [charIndex, isDeleting, phrase, phraseIndex])

  return (
    <span className="typing-wrapper">
      <span className="typing-text" style={{ color: accentColors[colorIndex] }}>
        {phrase.slice(0, charIndex)}
      </span>
      <span className="typing-cursor" style={{ backgroundColor: accentColors[colorIndex] }} />
    </span>
  )
}

/* ── Icons ── */
function AppIcon() {
  return (
    <img src="/agentbay.svg" alt="Everyone AI logo" width="36" height="36" />
  )
}

/* ── Bubbles Data ── */
const bubbles = [
  { initials: 'SM', color: '#7c3aed', x: 8, y: 15, size: 56, delay: 0, duration: 6, message: 'Find me a romantic restaurant and book a table for tonight' },
  { initials: 'JK', color: '#3b82f6', x: 78, y: 20, size: 48, delay: 1.5, duration: 7, message: 'Cancel my gym membership and confirm via email' },
  { initials: 'AL', color: '#06b6d4', x: 25, y: 65, size: 52, delay: 3, duration: 5.5, message: 'Order groceries for the week — same list as last time' },
  { initials: 'RD', color: '#f59e0b', x: 65, y: 70, size: 44, delay: 4.5, duration: 6.5, message: 'Book the cheapest flight to Rome next Friday' },
  { initials: 'KW', color: '#ec4899', x: 45, y: 10, size: 50, delay: 2, duration: 7.5, message: 'Set a reminder to call Mom every Sunday at 10am' },
  { initials: 'TP', color: '#10b981', x: 88, y: 55, size: 46, delay: 5, duration: 6, message: 'Track my package and let me know when it arrives' },
  { initials: 'MN', color: '#8b5cf6', x: 15, y: 42, size: 42, delay: 6, duration: 5, message: 'Summarize my unread emails and draft replies' },
  { initials: 'CF', color: '#f97316', x: 55, y: 45, size: 54, delay: 3.5, duration: 7, message: 'Find a dog walker near me for this Saturday' },
  { initials: 'LB', color: '#6366f1', x: 35, y: 82, size: 40, delay: 7, duration: 6.5, message: 'Pay my electricity bill before the deadline' },
  { initials: 'YZ', color: '#14b8a6', x: 72, y: 85, size: 48, delay: 1, duration: 5.5, message: 'Compare prices on the new AirPods and buy the best deal' },
]

function FloatingBubble({ bubble }) {
  const [showMessage, setShowMessage] = useState(false)

  useEffect(() => {
    const showDelay = bubble.delay * 1000 + 2000
    const cycle = (bubble.duration + 4) * 1000
    const ids = []

    const initial = setTimeout(() => {
      setShowMessage(true)
      ids.push(setTimeout(() => setShowMessage(false), 3500))

      const loop = setInterval(() => {
        setShowMessage(true)
        ids.push(setTimeout(() => setShowMessage(false), 3500))
      }, cycle)
      ids.push(loop)
    }, showDelay)

    return () => {
      clearTimeout(initial)
      ids.forEach(id => { clearTimeout(id); clearInterval(id) })
    }
  }, [bubble.delay, bubble.duration])

  return (
    <div
      className="floating-bubble"
      style={{
        left: `${bubble.x}%`,
        top: `${bubble.y}%`,
        animationDelay: `${bubble.delay}s`,
        animationDuration: `${bubble.duration}s`,
      }}
    >
      <div
        className="bubble-avatar"
        style={{
          width: bubble.size,
          height: bubble.size,
          background: `linear-gradient(135deg, ${bubble.color}, ${bubble.color}99)`,
        }}
      >
        {bubble.initials}
      </div>
      <AnimatePresence>
        {showMessage && (
          <motion.div
            className="bubble-speech"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25 }}
          >
            <span>{bubble.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ── Data ── */

const channels = [
  { name: 'WhatsApp', src: '/whatsapp.svg' },
  { name: 'Telegram', src: '/telegram.svg' },
  { name: 'Slack', src: '/slack.svg' },
  { name: 'iMessage', src: '/imessage.svg' },
  { name: 'Discord', src: '/discord.svg' },
  { name: 'Signal', src: '/signal.svg' },
]

const testimonials = [
  {
    quote: 'I told it to find a romantic restaurant near me and book a table for two. Five minutes later I had a confirmation at a place I never would have found on my own.',
    name: 'Sarah Mitchell',
    role: 'Marketing Director',
    photo: '/testimonials/sarah.png',
    problem: 'Spent 40 min browsing restaurants every date night',
  },
  {
    quote: 'My AI monitors prices on three items I want and bought my son\'s headphones the moment they dropped below my budget. Saved me $60 without lifting a finger.',
    name: 'James Kowalski',
    role: 'Father of two',
    photo: '/testimonials/james.png',
    problem: 'Missed flash sales because life got in the way',
  },
  {
    quote: 'Every morning I wake up to a clean inbox. Spam archived, receipts filed, and draft replies waiting for me. It gave me back an hour a day.',
    name: 'Amara Lee',
    role: 'Freelance Designer',
    photo: '/testimonials/amara.png',
    problem: '200+ unread emails every week',
  },
  {
    quote: 'I asked it to find flights to Rome under $400 and book the best option. It tracked prices for three days and grabbed a $312 fare at 2 AM. I was asleep.',
    name: 'Rafael Dominguez',
    role: 'Software Engineer',
    photo: '/testimonials/rafael.png',
    problem: 'Never had time to hunt for deals',
  },
]

/* ══════════════════════════════════════ */
function App() {
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [testimonialPaused, setTestimonialPaused] = useState(false)
  const [navInverted, setNavInverted] = useState(false)
  const footerRef = useRef(null)
  const t = testimonials[activeTestimonial]

  useEffect(() => {
    document.title = 'Everyone AI — Your Personal AI Assistant'
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

  useEffect(() => {
    if (testimonialPaused) return
    const interval = setInterval(() => {
      setActiveTestimonial(i => (i + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [testimonialPaused])

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>

      {/* Navbar */}
      <motion.nav
        className={`navbar${navInverted ? ' navbar--inverted' : ''}`}
        aria-label="Main navigation"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="navbar-left">
          <Link to="/" className="navbar-brand">Everyone AI</Link>
        </div>
        <div className="navbar-right">
          <a href="#features" className="navbar-link">Features</a>
          <Link to="/tools" className="navbar-link">Tools</Link>
          <Link to="/tools#pricing" className="navbar-link">Pricing</Link>
          <a href="#cta" className="navbar-link">Deploy</a>
          <ProfileDropdown />
        </div>
      </motion.nav>

      <main id="main">
      {/* Hero */}
      <section className="hero">
        <motion.div
          className="hero-icon"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3, ...spring }}
        >
          <AppIcon />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
        >
          The agent that can
          <span className="typing-line"><RotatingTyper /></span>
        </motion.h1>

        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          Your own AI. Your own server. It just handles it.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.75 }}
        >
          <Link to="/setup" className="btn-fancy" style={{ textDecoration: 'none' }}>
            <div className="points_wrapper" aria-hidden="true">
              <i className="point" /><i className="point" /><i className="point" />
              <i className="point" /><i className="point" /><i className="point" />
              <i className="point" /><i className="point" /><i className="point" />
              <i className="point" />
            </div>
            <span className="btn-fancy-inner">
              Launch Agent
              <svg className="btn-fancy-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </span>
          </Link>
        </motion.div>

        <motion.div
          className="hero-channels"
          initial="hidden"
          animate="visible"
          variants={staggerSlow}
        >
          <motion.span
            className="hero-channels-label"
            variants={fadeIn}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            Works with
          </motion.span>
          <div className="hero-channels-icons">
            {channels.map((ch, i) => (
              <motion.span
                key={ch.name}
                className="channel-tip"
                data-tip={ch.name}
                variants={fadeUp}
                transition={{ duration: 0.5, delay: 1.0 + i * 0.08 }}
              >
                <img src={ch.src} alt={ch.name} />
              </motion.span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Action intro */}
      <section className="action-hero" id="actions">
        <div className="action-hero-text">
          <motion.h2
            className="action-hero-title"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          >
            Beyond conversation.
          </motion.h2>
          <motion.p
            className="action-hero-subtitle"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            Powered by OpenClaw — an open-source AI agent framework that runs on your
            hardware, connects to your favorite apps, and takes real action. Not ideas. Execution.
          </motion.p>
        </div>
        <div className="action-hero-image">
          <img src="/test_2.png" alt="Illustrated mountain landscape" />
        </div>
      </section>

      {/* Feature rows */}
      <section className="section" id="features">
        {/* Book it — OpenTable-style reservation card */}
        <motion.div
          className="feature-row"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={stagger}
        >
          <FadeUp className="feature-text">
            <h3>Don't just plan dinner. <span className="gradient-accent">Book it.</span></h3>
            <p>
              Your agent logs in, finds the open table at 7 PM, and secures the
              reservation. No apps to juggle, no hold music, no back-and-forth.
              Just tell it where and when — it handles the rest.
            </p>
          </FadeUp>
          <ScaleIn className="feature-mockup" delay={0.15}>
            <motion.div className="feature-mockup-inner fm-booking" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } } }}>
              {/* Agent chat bubble */}
              <motion.div variants={fadeUp} transition={{ duration: 0.4 }} className="fm-chat-bubble fm-chat-user">
                Book dinner for 2 at Osteria tonight around 7
              </motion.div>
              <motion.div variants={fadeUp} transition={{ duration: 0.4 }} className="fm-chat-bubble fm-chat-agent">
                <span className="fm-agent-label">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a4 4 0 014 4v2a4 4 0 01-8 0V6a4 4 0 014-4z"/><path d="M18 14a6 6 0 00-12 0v4a2 2 0 002 2h8a2 2 0 002-2v-4z"/></svg>
                  Searching OpenTable...
                </span>
              </motion.div>
              {/* OpenTable-style confirmation card */}
              <motion.div variants={fadeUp} transition={{ duration: 0.5 }} className="fm-app-card">
                <div className="fm-app-card-header">
                  <img src="/opentable.svg" alt="" className="fm-app-logo" />
                  <span className="fm-app-card-brand">OpenTable</span>
                  <span className="fm-app-card-badge fm-badge-confirmed">Confirmed</span>
                </div>
                <div className="fm-app-card-body">
                  <div className="fm-restaurant-name">Osteria Francescana</div>
                  <div className="fm-restaurant-meta">
                    <span>★ 4.8</span>
                    <span className="fm-meta-dot">·</span>
                    <span>Italian Fine Dining</span>
                    <span className="fm-meta-dot">·</span>
                    <span>$$$$</span>
                  </div>
                  <div className="fm-reservation-details">
                    <div className="fm-detail-item">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                      Tonight, 7:00 PM
                    </div>
                    <div className="fm-detail-item">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
                      2 guests
                    </div>
                  </div>
                </div>
                <div className="fm-app-card-footer">
                  <span className="fm-conf-number">Conf #OT-28491</span>
                  <span className="fm-conf-sent">Sent to WhatsApp ✓</span>
                </div>
              </motion.div>
            </motion.div>
          </ScaleIn>
        </motion.div>

        {/* Buy them — Amazon-style product + price tracker */}
        <motion.div
          className="feature-row reverse"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={stagger}
        >
          <FadeUp className="feature-text">
            <h3>Don't just browse deals. <span className="gradient-accent">Buy them.</span></h3>
            <p>
              Your agent monitors the price drop, fills the cart, and handles
              checkout securely. Set a target price and walk away — you'll get a
              notification when it's done, not when it's time to do more work.
            </p>
          </FadeUp>
          <ScaleIn className="feature-mockup fm-mockup-shopping" delay={0.15}>
            <motion.div className="feature-mockup-inner fm-shopping" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } } }}>
              {/* Amazon-style product card */}
              <motion.div variants={fadeUp} transition={{ duration: 0.5 }} className="fm-product-card">
                <div className="fm-product-top">
                  <div className="fm-product-image">
                    <div className="fm-headphones-icon">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#232f3e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 18v-6a9 9 0 0118 0v6"/><path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z"/></svg>
                    </div>
                  </div>
                  <div className="fm-product-info">
                    <div className="fm-product-brand">
                        <img src="/amazon.svg" alt="" className="fm-brand-icon" />
                      amazon
                    </div>
                    <div className="fm-product-title">Sony WH-1000XM5</div>
                    <div className="fm-product-subtitle">Wireless Noise Cancelling Headphones</div>
                    <div className="fm-product-rating">
                      <span className="fm-stars">★★★★★</span>
                      <span className="fm-rating-count">24,891</span>
                    </div>
                  </div>
                </div>
              </motion.div>
              {/* Price tracker */}
              <motion.div variants={fadeUp} transition={{ duration: 0.5 }} className="fm-price-tracker">
                <div className="fm-tracker-header">
                  <span className="fm-tracker-label">Price Tracker</span>
                  <span className="fm-tracker-target">Target: $250</span>
                </div>
                <div className="fm-price-chart">
                  <svg viewBox="0 0 280 60" className="fm-chart-svg">
                    <defs>
                      <linearGradient id="priceGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#ca8a04" stopOpacity="0.15"/>
                        <stop offset="100%" stopColor="#ca8a04" stopOpacity="0"/>
                      </linearGradient>
                    </defs>
                    <line x1="0" y1="42" x2="280" y2="42" stroke="#16a34a" strokeWidth="1" strokeDasharray="4 3" opacity="0.5"/>
                    <text x="264" y="39" fill="#16a34a" fontSize="7" fontWeight="600">$250</text>
                    <path d="M0,15 Q30,18 56,12 T112,20 T168,8 T224,25 T260,48 L280,52" fill="none" stroke="#ca8a04" strokeWidth="2"/>
                    <path d="M0,15 Q30,18 56,12 T112,20 T168,8 T224,25 T260,48 L280,52 L280,60 L0,60 Z" fill="url(#priceGrad)"/>
                    <circle cx="260" cy="48" r="4" fill="#16a34a" stroke="white" strokeWidth="2"/>
                  </svg>
                  <div className="fm-chart-labels">
                    <span>Jan 12</span><span>Jan 19</span><span>Jan 26</span><span>Feb 2</span>
                  </div>
                </div>
                <div className="fm-tracker-result">
                  <div className="fm-tracker-result-left">
                    <span className="fm-tracker-purchased">Purchased at <strong>$241</strong></span>
                    <span className="fm-tracker-saved">You saved $38</span>
                  </div>
                  <span className="fm-tracker-check">✓</span>
                </div>
              </motion.div>
            </motion.div>
          </ScaleIn>
        </motion.div>

        {/* Resolve it — Gmail-style inbox view */}
        <motion.div
          className="feature-row"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={stagger}
        >
          <FadeUp className="feature-text">
            <h3>Don't just read email. <span className="gradient-accent">Resolve it.</span></h3>
            <p>
              Your agent archives the spam, files the receipts, and drafts the
              replies for you to approve. Inbox zero isn't a dream anymore — it's
              a standing instruction your AI follows every morning.
            </p>
          </FadeUp>
          <ScaleIn className="feature-mockup fm-mockup-email" delay={0.15}>
            <motion.div className="feature-mockup-inner fm-email" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } } }}>
              {/* Gmail-style header */}
              <motion.div variants={fadeUp} transition={{ duration: 0.4 }} className="fm-email-header">
                <div className="fm-email-header-left">
                  <img src="/gmail.svg" alt="" className="fm-app-logo" />
                  <span className="fm-email-title">Gmail</span>
                </div>
                <div className="fm-email-header-right">
                  <span className="fm-inbox-count">47 unread</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                </div>
              </motion.div>
              {/* Email action rows */}
              <div className="fm-email-actions">
                <motion.div variants={fadeUp} transition={{ duration: 0.35 }} className="fm-email-action-row">
                  <div className="fm-email-action-icon fm-action-archive">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="21 8 21 21 3 21 3 8"/><rect x="1" y="3" width="22" height="5"/><line x1="10" y1="12" x2="14" y2="12"/></svg>
                  </div>
                  <div className="fm-email-action-content">
                    <div className="fm-email-action-title">Archived spam</div>
                    <div className="fm-email-action-preview">Promotions, newsletters, junk mail</div>
                  </div>
                  <span className="fm-email-action-count">31</span>
                </motion.div>
                <motion.div variants={fadeUp} transition={{ duration: 0.35 }} className="fm-email-action-row">
                  <div className="fm-email-action-icon fm-action-receipt">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                  </div>
                  <div className="fm-email-action-content">
                    <div className="fm-email-action-title">Filed receipts</div>
                    <div className="fm-email-action-preview">Amazon, Uber, Netflix, Spotify...</div>
                  </div>
                  <span className="fm-email-action-count">8</span>
                </motion.div>
                <motion.div variants={fadeUp} transition={{ duration: 0.35 }} className="fm-email-action-row fm-action-highlight">
                  <div className="fm-email-action-icon fm-action-draft">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                  </div>
                  <div className="fm-email-action-content">
                    <div className="fm-email-action-title">Drafted replies</div>
                    <div className="fm-email-action-preview">
                      <span className="fm-draft-preview">"Hi Sarah, thanks for reaching out..."</span>
                    </div>
                  </div>
                  <span className="fm-email-action-badge">5 to review</span>
                </motion.div>
                <motion.div variants={fadeUp} transition={{ duration: 0.35 }} className="fm-email-action-row fm-action-urgent">
                  <div className="fm-email-action-icon fm-action-flag">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>
                  </div>
                  <div className="fm-email-action-content">
                    <div className="fm-email-action-title">Flagged urgent</div>
                    <div className="fm-email-action-preview">
                      <span className="fm-urgent-sender">Landlord</span>
                      <span className="fm-urgent-sender">Doctor's office</span>
                      <span className="fm-urgent-sender">Bank</span>
                    </div>
                  </div>
                  <span className="fm-email-action-badge fm-badge-urgent">3 urgent</span>
                </motion.div>
              </div>
              {/* Summary footer */}
              <motion.div variants={fadeUp} transition={{ duration: 0.4 }} className="fm-email-summary">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                <span>Inbox zero · Processed in 12 seconds</span>
              </motion.div>
            </motion.div>
          </ScaleIn>
        </motion.div>
      </section>

      {/* Testimonials */}
      <motion.section
        className="testimonials-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={stagger}
      >
        <FadeUp>
          <h2 className="testimonials-heading">Real people. Real results.</h2>
          <p className="testimonials-subheading">
            See how Everyone AI is saving time and solving everyday problems.
          </p>
        </FadeUp>

        <FadeUp delay={0.15}>
          <div
            className="testimonial-card"
            onMouseEnter={() => setTestimonialPaused(true)}
            onMouseLeave={() => setTestimonialPaused(false)}
            onFocus={() => setTestimonialPaused(true)}
            onBlur={() => setTestimonialPaused(false)}
          >
            <div className="testimonial-quote-side">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
                  className="testimonial-quote-inner"
                >
                  <div className="testimonial-problem">
                    <span className="testimonial-problem-label">The problem</span>
                    <span className="testimonial-problem-text">{t.problem}</span>
                  </div>
                  <blockquote className="testimonial-quote">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <div className="testimonial-author">
                    <div className="testimonial-author-name">{t.name}</div>
                    <div className="testimonial-author-role">{t.role}</div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="testimonial-avatar-side">
              <AnimatePresence mode="wait">
                <motion.img
                  key={t.photo}
                  className="testimonial-photo"
                  src={t.photo}
                  alt={t.name}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                />
              </AnimatePresence>
            </div>
          </div>
        </FadeUp>

      </motion.section>

      {/* Value prop */}
      <Section className="section" id="about">
        <FadeUp>
          <div className="value-prop">
            <h2 className="value-prop-title">
              Your AI, your server — always yours.
            </h2>
            <p className="value-prop-body">
              Powered by OpenClaw, your assistant runs entirely on your own machine.
              Your data never leaves your server. It remembers your preferences, learns
              how to help you better, and works around the clock — with no third party
              in between.
            </p>
          </div>
        </FadeUp>
        <motion.div
          className="value-prop-pills"
          variants={stagger}
          style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10, marginTop: 32 }}
        >
          {['Runs on your server', 'Persistent memory', 'Gets smarter over time', 'Fully open source'].map((label) => (
            <motion.span
              key={label}
              className="pill"
              variants={fadeUp}
              transition={{ duration: 0.5 }}
            >
              {label}
            </motion.span>
          ))}
        </motion.div>
      </Section>

      </main>

      {/* Footer */}
      <motion.footer
        ref={footerRef}
        className="footer"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
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
                  <Link to="/tools#pricing" className="footer-link">Pricing</Link>
                  <Link to="/setup" className="footer-link">Get Started</Link>
                  <a href="/docs" className="footer-link">Documentation</a>
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
      </motion.footer>
    </>
  )
}

export default App
