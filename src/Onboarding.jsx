import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import ProfileDropdown from './ProfileDropdown'
import './Onboarding.css'

/* ── Data ── */
const channels = [
  { id: 'whatsapp', name: 'WhatsApp', icon: '/whatsapp.svg', tokenLabel: 'WhatsApp Business API Token', placeholder: 'Enter your WhatsApp API token', deeplink: 'whatsapp://', weblink: 'https://wa.me/' },
  { id: 'telegram', name: 'Telegram', icon: '/telegram.svg', tokenLabel: 'Telegram Bot Token', placeholder: 'Paste your @BotFather token', deeplink: 'tg://', weblink: 'https://t.me/', needsUsername: true },
  { id: 'slack', name: 'Slack', icon: '/slack.svg', tokenLabel: 'Slack Bot Token', placeholder: 'xoxb-your-slack-bot-token', deeplink: 'slack://', weblink: 'https://slack.com/app' },
  { id: 'imessage', name: 'iMessage', icon: '/imessage.svg', tokenLabel: 'iMessage Relay Token', placeholder: 'Enter your iMessage relay token', deeplink: 'imessage://', weblink: 'imessage://' },
  { id: 'discord', name: 'Discord', icon: '/discord.svg', tokenLabel: 'Discord Bot Token', placeholder: 'Paste your Discord bot token', deeplink: 'discord://', weblink: 'https://discord.com/app' },
  { id: 'signal', name: 'Signal', icon: '/signal.svg', tokenLabel: 'Signal API Token', placeholder: 'Enter your Signal API token', deeplink: 'sgnl://', weblink: 'https://signal.org' },
]

const providers = [
  { id: 'anthropic', name: 'Anthropic', model: 'Claude Sonnet 4', icon: '/claude.svg' },
  { id: 'openai', name: 'OpenAI', model: 'GPT-4o', icon: '/openai.svg' },
  { id: 'deepseek', name: 'DeepSeek', model: 'DeepSeek V3', icon: '/deepseek.svg' },
  { id: 'gemini', name: 'Google Gemini', model: 'Gemini 2.5 Pro', icon: '/gemini.svg' },
  { id: 'grok', name: 'xAI', model: 'Grok 3', icon: '/grok.svg' },
]

const plans = [
  {
    id: 'inclusive',
    name: 'All-Inclusive',
    price: '$29.99',
    period: '/mo',
    tagline: 'We handle everything',
    features: [
      'All 6 messaging channels',
      'Unlimited actions',
      'All 50+ tool integrations',
      'Persistent memory & context',
      'AI usage included — no API key needed',
      'Managed hosting & updates',
    ],
  },
  {
    id: 'byok',
    name: 'Bring Your Own Key',
    price: '$13.99',
    period: '/mo',
    tagline: 'Use your own API key & save',
    features: [
      'All 6 messaging channels',
      'Unlimited actions',
      'All 50+ tool integrations',
      'Persistent memory & context',
      'Bring your own API key',
      'Self-hosted on your server',
    ],
  },
]

const steps = [
  { label: 'Account' },
  { label: 'Channel' },
  { label: 'Provider' },
  { label: 'Plan' },
  { label: 'Launch' },
]

const stepVariants = {
  enter: { opacity: 0, y: 40 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 },
}

/* ══════════════════════════════════════ */
export default function Onboarding() {
  const [step, setStep] = useState(0)
  const [selectedChannel, setSelectedChannel] = useState(null)
  const [botToken, setBotToken] = useState('')
  const [selectedProvider, setSelectedProvider] = useState(null)
  const [botUsername, setBotUsername] = useState('')
  const [byok, setByok] = useState(false)
  const [apiKey, setApiKey] = useState('')
  const [accountName, setAccountName] = useState('')
  const [accountEmail, setAccountEmail] = useState('')
  const [accountPassword, setAccountPassword] = useState('')

  const channelData = channels.find(c => c.id === selectedChannel)

  const canContinue = () => {
    if (step === 0) return accountName.trim().length > 0 && accountEmail.trim().length > 0 && accountPassword.trim().length > 0
    if (step === 1) return selectedChannel && botToken.trim().length > 0
    if (step === 2) return !!selectedProvider && (!byok || apiKey.trim().length > 0)
    if (step === 3) return true
    return true
  }

  useEffect(() => {
    document.title = 'Setup — Everyone AI'
    return () => { document.title = 'Everyone AI' }
  }, [])

  useEffect(() => {
    if (step > 0) {
      sessionStorage.setItem('everyoneai_account', JSON.stringify({
        name: accountName,
        email: accountEmail,
        channel: selectedChannel,
        provider: selectedProvider,
        byok,
        plan: byok ? 'BYOK — $13.99/mo' : 'All-Inclusive — $29.99/mo',
      }))
    }
  }, [step, accountName, accountEmail, selectedChannel, selectedProvider, byok])

  return (
    <div className="onboarding-page">
      <a href="#main" className="skip-link">Skip to content</a>

      {/* Navbar */}
      <motion.nav
        className="onboarding-nav"
        aria-label="Main navigation"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Link to="/" className="onboarding-nav-brand">Everyone AI</Link>
        <div className="onboarding-nav-right">
          <ProfileDropdown />
        </div>
      </motion.nav>

      <main id="main">
      {/* Step indicators */}
      <nav aria-label="Setup progress" className="onboarding-steps">
        {steps.map((s, i) => (
          <div key={s.label} className={`onboarding-step-item ${i <= step ? 'active' : ''} ${i < step ? 'done' : ''}`} aria-current={i === step ? 'step' : undefined}>
            <div className="onboarding-step-dot">
              <AnimatePresence mode="wait">
                <motion.span
                  key={i < step ? 'done' : 'num'}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.2 }}
                >
                  {i < step ? '✓' : i + 1}
                </motion.span>
              </AnimatePresence>
            </div>
            <span className="onboarding-step-label">{s.label}</span>
          </div>
        ))}
      </nav>

      {/* Content */}
      <div className="onboarding-content">
        <AnimatePresence mode="wait">

          {/* Step 0: Create Account */}
          {step === 0 && (
            <motion.div key="step0" className="onboarding-step-content" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.4 }}>
              <h2 className="onboarding-title">Create your account</h2>
              <p className="onboarding-subtitle">Get started with Everyone AI in seconds.</p>

              <div className="onboarding-social-buttons">
                <button className="onboarding-social-btn" onClick={() => { setAccountName('Demo User'); setAccountEmail('demo@everyoneai.com'); setAccountPassword('password'); }}>
                  <svg className="onboarding-social-icon" viewBox="0 0 24 24" width="20" height="20">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Sign up with Google
                </button>
                <button className="onboarding-social-btn" onClick={() => { setAccountName('Demo User'); setAccountEmail('demo@everyoneai.com'); setAccountPassword('password'); }}>
                  <svg className="onboarding-social-icon" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                  </svg>
                  Sign up with Apple
                </button>
              </div>

              <div className="onboarding-divider-row">
                <div className="onboarding-divider-line" />
                <span className="onboarding-divider-text">or</span>
                <div className="onboarding-divider-line" />
              </div>

              <div className="onboarding-signup-form">
                <label htmlFor="signup-name" className="onboarding-label">Name</label>
                <input id="signup-name" type="text" className="onboarding-signup-input" placeholder="Your full name" value={accountName} onChange={e => setAccountName(e.target.value)} autoComplete="name" />

                <label htmlFor="signup-email" className="onboarding-label">Email</label>
                <input id="signup-email" type="email" className="onboarding-signup-input" placeholder="you@example.com" value={accountEmail} onChange={e => setAccountEmail(e.target.value)} autoComplete="email" />

                <label htmlFor="signup-password" className="onboarding-label">Password</label>
                <input id="signup-password" type="password" className="onboarding-signup-input" placeholder="Create a password" value={accountPassword} onChange={e => setAccountPassword(e.target.value)} autoComplete="new-password" />
              </div>

              <button
                className={`onboarding-btn-continue ${canContinue() ? '' : 'disabled'}`}
                onClick={() => canContinue() && setStep(1)}
                disabled={!canContinue()}
              >
                Create account
              </button>
            </motion.div>
          )}

          {/* Step 1: Select Channel + Bot Token */}
          {step === 1 && (
            <motion.div key="step1" className="onboarding-step-content" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.4 }}>
              <h2 className="onboarding-title">Connect your channel</h2>
              <p className="onboarding-subtitle">Pick where your AI agent will live. It runs on your server — your data never leaves.</p>

              <div className="onboarding-channel-grid">
                {channels.map(ch => (
                  <button
                    key={ch.id}
                    className={`onboarding-channel-card ${selectedChannel === ch.id ? 'selected' : ''}`}
                    onClick={() => { setSelectedChannel(ch.id); setBotToken('') }}
                    aria-pressed={selectedChannel === ch.id}
                  >
                    <img src={ch.icon} alt="" className="onboarding-channel-icon" />
                    <span className="onboarding-channel-name">{ch.name}</span>
                    <AnimatePresence>
                      {selectedChannel === ch.id && (
                        <motion.span
                          className="onboarding-channel-check"
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.5 }}
                          transition={{ duration: 0.2 }}
                        >
                          ✓
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>
                ))}
              </div>

              {selectedChannel && (
                <motion.div
                  className="onboarding-token-section"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                >
                  <label htmlFor="bot-token" className="onboarding-label">{channelData.tokenLabel}</label>
                  <div className="onboarding-token-input-wrap">
                    <input
                      id="bot-token"
                      type="password"
                      className="onboarding-token-input"
                      placeholder={channelData.placeholder}
                      value={botToken}
                      onChange={e => setBotToken(e.target.value)}
                      autoComplete="off"
                    />
                    <div className="onboarding-token-lock">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
                    </div>
                  </div>
                  {channelData.needsUsername && (
                    <>
                      <label htmlFor="bot-username" className="onboarding-label" style={{ marginTop: 16 }}>Bot Username</label>
                      <input
                        id="bot-username"
                        type="text"
                        className="onboarding-token-input"
                        placeholder="@YourBotName"
                        value={botUsername}
                        onChange={e => setBotUsername(e.target.value)}
                        autoComplete="off"
                      />
                    </>
                  )}
                  <p className="onboarding-token-hint">Your token is encrypted and never stored in plain text.</p>
                </motion.div>
              )}

              <button
                className={`onboarding-btn-continue ${canContinue() ? '' : 'disabled'}`}
                onClick={() => canContinue() && setStep(2)}
                disabled={!canContinue()}
              >
                Continue
              </button>
            </motion.div>
          )}

          {/* Step 2: Select AI Provider + optional BYOK */}
          {step === 2 && (
            <motion.div key="step2" className="onboarding-step-content" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.4 }}>
              <h2 className="onboarding-title">Choose your AI provider</h2>
              <p className="onboarding-subtitle">Pick the model that powers your agent. You can change this anytime.</p>

              <div className="onboarding-provider-grid">
                {providers.map(p => (
                  <button
                    key={p.id}
                    className={`onboarding-provider-card ${selectedProvider === p.id ? 'selected' : ''}`}
                    onClick={() => setSelectedProvider(p.id)}
                    aria-pressed={selectedProvider === p.id}
                  >
                    <img src={p.icon} alt="" className="onboarding-provider-icon" />
                    <div className="onboarding-provider-info">
                      <div className="onboarding-provider-name">{p.name}</div>
                      <div className="onboarding-provider-model">{p.model}</div>
                    </div>
                    <AnimatePresence>
                      {selectedProvider === p.id && (
                        <motion.span
                          className="onboarding-provider-check"
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.5 }}
                          transition={{ duration: 0.2 }}
                        >
                          ✓
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>
                ))}
              </div>

              <div className="onboarding-byok-section">
                <div className="onboarding-byok-row">
                  <div className="onboarding-byok-text">
                    <span className="onboarding-byok-label">Bring your own API key</span>
                    <span className="onboarding-byok-desc">Use your own key and pay $13.99/mo instead of $29.99/mo</span>
                  </div>
                  <button
                    className={`onboarding-toggle ${byok ? 'on' : ''}`}
                    onClick={() => { setByok(!byok); setApiKey('') }}
                    role="switch"
                    aria-checked={byok}
                    aria-label="Bring your own API key"
                  >
                    <div className="onboarding-toggle-knob" />
                  </button>
                </div>
                {byok && selectedProvider && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                    className="onboarding-byok-input-section"
                  >
                    <label htmlFor="api-key" className="onboarding-label">
                      {providers.find(p => p.id === selectedProvider)?.name} API Key
                    </label>
                    <div className="onboarding-token-input-wrap">
                      <input
                        id="api-key"
                        type="password"
                        className="onboarding-token-input"
                        placeholder={`sk-... your ${providers.find(p => p.id === selectedProvider)?.name} API key`}
                        value={apiKey}
                        onChange={e => setApiKey(e.target.value)}
                        autoComplete="off"
                      />
                      <div className="onboarding-token-lock">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
                      </div>
                    </div>
                    <p className="onboarding-token-hint">Your API key is encrypted end-to-end. We never see your usage.</p>
                  </motion.div>
                )}
              </div>

              <div className="onboarding-btn-row">
                <button className="onboarding-btn-back" onClick={() => setStep(1)}>Back</button>
                <button
                  className={`onboarding-btn-continue ${canContinue() ? '' : 'disabled'}`}
                  onClick={() => canContinue() && setStep(3)}
                  disabled={!canContinue()}
                >
                  Continue
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Plan confirmation — price reflects BYOK choice */}
          {step === 3 && (
            <motion.div key="step3" className="onboarding-step-content" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.4 }}>
              <h2 className="onboarding-title">{byok ? 'Your keys, your limits.' : 'Everything included.'}</h2>
              <p className="onboarding-subtitle">{byok ? 'Full control over your AI usage and costs.' : 'No tiers, no limits, no surprises.'}</p>

              <div className="onboarding-pricing-card">
                <div className="onboarding-pricing-header">
                  <div className="onboarding-pricing-badge">{byok ? 'Everyone AI — BYOK' : 'Everyone AI — All-Inclusive'}</div>
                  <div className="onboarding-pricing-price">
                    {byok && <span className="onboarding-price-original">$29.99</span>}
                    <span className="onboarding-price-amount">{byok ? '$13.99' : '$29.99'}</span>
                    <span className="onboarding-price-period">/month</span>
                  </div>
                  <p className="onboarding-pricing-note">
                    {byok
                      ? 'You pay your own API costs directly to ' + providers.find(p => p.id === selectedProvider)?.name
                      : 'AI usage included — no extra API costs'}
                  </p>
                </div>

                <div className="onboarding-pricing-divider" />

                <ul className="onboarding-plan-features-list">
                  {(byok ? plans[1] : plans[0]).features.map(f => (
                    <li key={f}>
                      <span className="onboarding-feature-check">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="onboarding-pricing-summary">
                  <div className="onboarding-summary-row">
                    <span>Channel</span>
                    <span className="onboarding-summary-value">
                      <img src={channelData?.icon} alt="" className="onboarding-summary-icon" />
                      {channelData?.name}
                    </span>
                  </div>
                  <div className="onboarding-summary-row">
                    <span>Provider</span>
                    <span className="onboarding-summary-value">
                      <img src={providers.find(p => p.id === selectedProvider)?.icon} alt="" className="onboarding-summary-icon" />
                      {providers.find(p => p.id === selectedProvider)?.name}
                    </span>
                  </div>
                </div>
              </div>

              <div className="onboarding-btn-row">
                <button className="onboarding-btn-back" onClick={() => setStep(2)}>Back</button>
                <button className="onboarding-btn-continue" onClick={() => setStep(4)}>
                  Subscribe & Continue
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 4: Launch */}
          {step === 4 && (
            <motion.div key="step4" className="onboarding-step-content" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.4 }}>
              <motion.div
                className="onboarding-launch-icon"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', damping: 15, stiffness: 200, delay: 0.2 }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
              </motion.div>
              <h2 className="onboarding-title">You're all set!</h2>
              <p className="onboarding-subtitle">
                Your agent is running on your server and live on <strong>{channelData?.name}</strong>. Open the app and start chatting.
              </p>

              <div className="onboarding-launch-summary">
                {[
                  ['Channel', channelData?.name, channelData?.icon],
                  ['AI Provider', providers.find(p => p.id === selectedProvider)?.name, null],
                  ['Plan', byok ? 'BYOK — $13.99/mo' : 'All-Inclusive — $29.99/mo', null],
                ].map(([label, value, icon]) => (
                  <div key={label} className="onboarding-launch-row">
                    <span className="onboarding-launch-label">{label}</span>
                    <span className="onboarding-launch-value">
                      {icon && <img src={icon} alt="" className="onboarding-launch-icon-img" />}
                      {value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="onboarding-launch-actions">
                <a
                  href={
                    selectedChannel === 'telegram' && botUsername
                      ? `tg://resolve?domain=${botUsername.replace('@', '')}`
                      : channelData?.deeplink
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="onboarding-btn-launch"
                >
                  Open {channelData?.name} →
                </a>
                <Link to="/dashboard" className="onboarding-btn-manage">
                  Manage
                </Link>
              </div>

              <p className="onboarding-launch-hint">
                Just send any message to start a conversation with your AI.
              </p>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
      </main>
    </div>
  )
}
