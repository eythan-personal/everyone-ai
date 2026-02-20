import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ProfileDropdown from './ProfileDropdown'
import './Dashboard.css'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
}

export default function Dashboard() {
  const [account, setAccount] = useState({
    name: 'Demo User',
    email: 'demo@example.com',
    channel: 'telegram',
    provider: 'anthropic',
    byok: false,
    plan: 'All-Inclusive — $29.99/mo',
  })

  const [notifications, setNotifications] = useState({
    agentErrors: true,
    weeklyReport: true,
    billingAlerts: true,
    productUpdates: false,
  })

  useEffect(() => {
    document.title = 'Dashboard — Everyone AI'
    const stored = sessionStorage.getItem('everyoneai_account')
    if (stored) {
      try { setAccount(JSON.parse(stored)) } catch {}
    }
    return () => { document.title = 'Everyone AI' }
  }, [])

  const toggleNotif = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const stats = [
    { label: 'Messages sent', value: '1,247' },
    { label: 'Actions taken', value: '384' },
    { label: 'Uptime', value: '99.9%' },
    { label: 'Avg response', value: '1.2s' },
  ]

  const providerNames = { anthropic: 'Anthropic', openai: 'OpenAI', deepseek: 'DeepSeek', gemini: 'Google Gemini', grok: 'xAI' }
  const channelNames = { whatsapp: 'WhatsApp', telegram: 'Telegram', slack: 'Slack', imessage: 'iMessage', discord: 'Discord', signal: 'Signal' }

  return (
    <div className="dashboard-page">
      <a href="#main" className="skip-link">Skip to content</a>
      <nav className="dashboard-nav" aria-label="Main navigation">
        <Link to="/" className="dashboard-nav-brand">Everyone AI</Link>
        <div className="dashboard-nav-right">
          <ProfileDropdown />
        </div>
      </nav>

      <main id="main" className="dashboard-main">
        <motion.div initial="hidden" animate="visible" variants={stagger}>

          <motion.h1 className="dashboard-heading" variants={fadeUp} transition={{ duration: 0.6 }}>
            Dashboard
          </motion.h1>

          <div className="dashboard-grid">
            {/* Account Info */}
            <motion.div className="dashboard-card" variants={fadeUp} transition={{ duration: 0.5 }}>
              <h2 className="dashboard-card-title">Account</h2>
              <div className="dashboard-field">
                <span className="dashboard-field-label">Name</span>
                <span className="dashboard-field-value">{account.name}</span>
              </div>
              <div className="dashboard-field">
                <span className="dashboard-field-label">Email</span>
                <span className="dashboard-field-value">{account.email}</span>
              </div>
            </motion.div>

            {/* Active Agent */}
            <motion.div className="dashboard-card" variants={fadeUp} transition={{ duration: 0.5 }}>
              <h2 className="dashboard-card-title">Active Agent</h2>
              <div className="dashboard-field">
                <span className="dashboard-field-label">Channel</span>
                <span className="dashboard-field-value">{channelNames[account.channel] || account.channel}</span>
              </div>
              <div className="dashboard-field">
                <span className="dashboard-field-label">Provider</span>
                <span className="dashboard-field-value">{providerNames[account.provider] || account.provider}</span>
              </div>
              <div className="dashboard-field">
                <span className="dashboard-field-label">Plan</span>
                <span className="dashboard-field-value">{account.plan}</span>
              </div>
            </motion.div>

            {/* Usage Stats */}
            <motion.div className="dashboard-card" variants={fadeUp} transition={{ duration: 0.5 }}>
              <h2 className="dashboard-card-title">Usage</h2>
              <div className="dashboard-stats-grid">
                {stats.map(s => (
                  <div key={s.label} className="dashboard-stat">
                    <span className="dashboard-stat-value">{s.value}</span>
                    <span className="dashboard-stat-label">{s.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Notification Preferences */}
            <motion.div className="dashboard-card" variants={fadeUp} transition={{ duration: 0.5 }}>
              <h2 className="dashboard-card-title">Notifications</h2>
              {Object.entries(notifications).map(([key, val]) => (
                <div key={key} className="dashboard-notif-row">
                  <span className="dashboard-notif-label">
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())}
                  </span>
                  <button
                    className={`dashboard-toggle ${val ? 'on' : ''}`}
                    onClick={() => toggleNotif(key)}
                    role="switch"
                    aria-checked={val}
                    aria-label={key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())}
                  >
                    <div className="dashboard-toggle-knob" />
                  </button>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Quick Actions */}
          <motion.div className="dashboard-card dashboard-card-wide" variants={fadeUp} transition={{ duration: 0.5 }}>
            <h2 className="dashboard-card-title">Quick Actions</h2>
            <div className="dashboard-actions-row">
              <button className="dashboard-action-btn">Change Provider</button>
              <button className="dashboard-action-btn">Change Plan</button>
              <button className="dashboard-action-btn">Add Channel</button>
            </div>
          </motion.div>

        </motion.div>
      </main>
    </div>
  )
}
