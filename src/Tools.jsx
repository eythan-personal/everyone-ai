import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ProfileDropdown from './ProfileDropdown'
import './Tools.css'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
}

/* Grid layout plan (12-col):
   Row 1: Google(8) + Dining(4) = 12
   Row 2: Shopping(4) + Travel(8) = 12
   Row 3: Finance(4) + Productivity(4) + Health(4) = 12
   Row 4: Home(6) + Entertainment(6) = 12
*/
const categories = [
  // Row 1
  {
    name: 'Google',
    span: 8,
    video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    color: '#4285F4',
    tools: [
      { title: 'Google Maps', desc: 'Navigate, find places & directions' },
      { title: 'Google Calendar', desc: 'Schedule & manage your events' },
      { title: 'Gmail', desc: 'Read, draft & send emails' },
      { title: 'Google Search', desc: 'Find answers to anything' },
      { title: 'Google Flights', desc: 'Search & compare flights' },
      { title: 'Google Docs', desc: 'Create & edit documents' },
    ],
  },
  {
    name: 'Dining & Food',
    span: 4,
    video: 'https://www.w3schools.com/html/movie.mp4',
    color: '#DA3743',
    tools: [
      { title: 'OpenTable', desc: 'Book restaurant reservations' },
      { title: 'DoorDash', desc: 'Order food delivery' },
      { title: 'Uber Eats', desc: 'Delivery from local restaurants' },
      { title: 'Instacart', desc: 'Grocery shopping & delivery' },
    ],
  },
  // Row 2
  {
    name: 'Shopping',
    span: 4,
    video: null,
    color: '#FF9900',
    tools: [
      { title: 'Amazon', desc: 'Search, compare & purchase products' },
      { title: 'eBay', desc: 'Find deals & bid on items' },
      { title: 'Walmart', desc: 'Everyday essentials & delivery' },
      { title: 'Target', desc: 'Same-day delivery & pickup' },
    ],
  },
  {
    name: 'Travel',
    span: 8,
    video: null,
    color: '#003580',
    tools: [
      { title: 'Booking.com', desc: 'Hotels & accommodation worldwide' },
      { title: 'Airbnb', desc: 'Unique stays & experiences' },
      { title: 'Uber', desc: 'Rides on demand, anywhere' },
      { title: 'Lyft', desc: 'Get a ride in minutes' },
      { title: 'Kayak', desc: 'Compare flights, hotels & cars' },
      { title: 'Expedia', desc: 'Bundle & save on travel' },
    ],
  },
  // Row 3
  {
    name: 'Finance',
    span: 4,
    video: null,
    color: '#00C805',
    tools: [
      { title: 'Venmo', desc: 'Send & request money instantly' },
      { title: 'PayPal', desc: 'Secure payments & transfers' },
      { title: 'Mint', desc: 'Track spending & budgets' },
      { title: 'Robinhood', desc: 'Check stocks & portfolios' },
    ],
  },
  {
    name: 'Productivity',
    span: 4,
    video: null,
    color: '#7C3AED',
    tools: [
      { title: 'Notion', desc: 'Notes, docs & project management' },
      { title: 'Todoist', desc: 'Task management & to-do lists' },
      { title: 'Trello', desc: 'Visual boards for any project' },
      { title: 'Slack', desc: 'Team messaging & workflows' },
    ],
  },
  {
    name: 'Health & Fitness',
    span: 4,
    video: null,
    color: '#FB5607',
    tools: [
      { title: 'MyFitnessPal', desc: 'Calorie tracking & nutrition' },
      { title: 'Apple Health', desc: 'Sync health data & metrics' },
      { title: 'Peloton', desc: 'Book & track workout classes' },
      { title: 'Headspace', desc: 'Guided meditation & sleep' },
    ],
  },
  // Row 4
  {
    name: 'Home & Utilities',
    span: 6,
    video: null,
    color: '#06B6D4',
    tools: [
      { title: 'HomeKit', desc: 'Smart home device control' },
      { title: 'Ring', desc: 'Doorbell & security cameras' },
      { title: 'Nest', desc: 'Thermostat & energy management' },
      { title: 'iRobot', desc: 'Schedule & control vacuums' },
    ],
  },
  {
    name: 'Entertainment',
    span: 6,
    video: null,
    color: '#E50914',
    tools: [
      { title: 'Spotify', desc: 'Music, playlists & podcasts' },
      { title: 'YouTube', desc: 'Search & save videos' },
      { title: 'Ticketmaster', desc: 'Find & buy event tickets' },
      { title: 'Fandango', desc: 'Movie times & ticket booking' },
    ],
  },
]

const pricingPlans = [
  {
    name: 'All-Inclusive',
    tagline: 'We handle everything',
    price: '$29.99',
    period: '/mo',
    badge: 'Most Popular',
    features: [
      'All 6 messaging channels',
      'Unlimited actions',
      'All 50+ tool integrations',
      'Persistent memory & context',
      'AI usage included — no API key needed',
      'Managed hosting & updates',
    ],
    channels: ['whatsapp', 'telegram', 'slack', 'imessage', 'discord', 'signal'],
  },
  {
    name: 'Bring Your Own Key',
    tagline: 'Use your own API key & save',
    price: '$13.99',
    period: '/mo',
    badge: null,
    features: [
      'All 6 messaging channels',
      'Unlimited actions',
      'All 50+ tool integrations',
      'Persistent memory & context',
      'Bring your own API key',
      'Self-hosted on your server',
    ],
    channels: ['whatsapp', 'telegram', 'slack', 'imessage', 'discord', 'signal'],
  },
]

function LazyVideo({ src }) {
  const ref = useRef(null)

  useEffect(() => {
    const video = ref.current
    if (!video) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play()
        else video.pause()
      },
      { threshold: 0.1 }
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return <video ref={ref} muted loop playsInline src={src} aria-hidden="true" />
}

function ToolCard({ category, index }) {
  return (
    <motion.div
      className="tool-card"
      style={{ gridColumn: `span ${category.span}` }}
      variants={fadeUp}
      transition={{ duration: 0.6, delay: index * 0.05 }}
    >
      {/* Video or gradient background */}
      <div className="tool-card-bg">
        {category.video ? (
          <LazyVideo src={category.video} />
        ) : (
          <div
            className="tool-card-gradient"
            style={{
              background: `radial-gradient(ellipse at 30% 20%, ${category.color}22 0%, transparent 60%),
                           radial-gradient(ellipse at 70% 80%, ${category.color}15 0%, transparent 50%),
                           linear-gradient(135deg, #edece7 0%, #f7f7f5 100%)`,
            }}
          />
        )}
        <div className="tool-card-overlay" />
      </div>

      {/* Content */}
      <div className="tool-card-content">
        <h3 className="tool-card-name" style={{ color: category.color }}>
          {category.name}
        </h3>
        <div className="tool-card-tools">
          {category.tools.map((tool) => (
            <div key={tool.title} className="tool-item">
              <span className="tool-item-title">{tool.title}</span>
              <span className="tool-item-desc">{tool.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Tools() {
  const [navInverted, setNavInverted] = useState(false)
  const footerRef = useRef(null)

  useEffect(() => {
    document.title = 'Tools & Pricing — Everyone AI'
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
    <div className="tools-page">
      <a href="#main" className="skip-link">Skip to content</a>

      {/* Navbar — matches main page */}
      <motion.nav
        className={`tools-nav${navInverted ? ' tools-nav--inverted' : ''}`}
        aria-label="Main navigation"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="tools-nav-left">
          <Link to="/" className="tools-nav-brand">Everyone AI</Link>
        </div>
        <div className="tools-nav-right">
          <Link to="/" className="tools-nav-link">Home</Link>
          <Link to="/tools" className="tools-nav-link active">Tools</Link>
          <a href="/#pricing" className="tools-nav-link">Pricing</a>
          <ProfileDropdown />
        </div>
      </motion.nav>

      <main id="main">
      {/* Hero */}
      <motion.div
        className="tools-hero"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <h1 className="tools-title">One AI. Every tool you need.</h1>
        <p className="tools-subtitle">
          Your self-hosted agent connects to 50+ services to handle real tasks —
          booking, buying, scheduling, and more. All from a single conversation, all on your server.
        </p>
      </motion.div>

      {/* Bento grid */}
      <motion.div
        className="tools-grid"
        initial="hidden"
        animate="visible"
        variants={stagger}
      >
        {categories.map((cat, i) => (
          <ToolCard key={cat.name} category={cat} index={i} />
        ))}
      </motion.div>

      {/* Pricing */}
      <motion.section
        className="tools-pricing"
        id="pricing"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={stagger}
      >
        <motion.div variants={fadeUp} transition={{ duration: 0.6 }}>
          <h2 className="tools-pricing-title">Simple, transparent pricing</h2>
        </motion.div>

        <motion.div
          className="tools-pricing-grid"
          variants={stagger}
        >
          {pricingPlans.map((plan, i) => (
            <motion.div
              key={plan.name}
              className="tools-pricing-card"
              variants={fadeUp}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              {plan.badge && <div className="tools-pricing-badge">{plan.badge}</div>}
              <div className="tools-pricing-card-body">
                <div className="tools-pricing-name">{plan.name}</div>
                <div className="tools-pricing-tagline">{plan.tagline}</div>
                <div className="tools-pricing-price">
                  <span className="tools-price-amount">{plan.price}</span>
                  {plan.period && <span className="tools-price-period">{plan.period}</span>}
                </div>
                <ul className="tools-pricing-features">
                  {plan.features.map((f) => (
                    <li key={f}>
                      <span className="tools-feature-check">›</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="tools-pricing-channels">
                  <span className="tools-pricing-channels-label">Channels</span>
                  <div className="tools-pricing-channels-icons">
                    {plan.channels.map((ch) => (
                      <img key={ch} src={`/${ch}.svg`} alt={ch.charAt(0).toUpperCase() + ch.slice(1)} />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={fadeUp} transition={{ duration: 0.5, delay: 0.3 }} className="tools-pricing-footer">
          <div className="tools-powered-badge">
            Powered by <strong>OpenClaw</strong> — open-source AI agent framework
          </div>
          <p className="tools-byok-note">BYOK = you provide your own API key and pay only for the tokens you use</p>
        </motion.div>
      </motion.section>

      {/* Bottom CTA */}
      <motion.div
        className="tools-bottom"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="tools-bottom-text">
          And this is just the beginning. New integrations are added every week.
        </p>
        <Link to="/setup" className="tools-bottom-cta">
          Launch Agent →
        </Link>
      </motion.div>
      </main>

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
      </footer>
    </div>
  )
}
