import { useState, useEffect, useRef, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import './ProfileDropdown.css'

export default function ProfileDropdown() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [account, setAccount] = useState({ name: 'Eythan', email: '', plan: 'Ultimate Plan' })
  const [open, setOpen] = useState(false)
  const [focusIndex, setFocusIndex] = useState(-1)
  const ref = useRef(null)
  const menuRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    const stored = sessionStorage.getItem('everyoneai_account')
    if (stored) {
      try {
        const data = JSON.parse(stored)
        setAccount({
          name: data.name || 'Eythan',
          email: data.email || '',
          plan: data.plan || 'Ultimate Plan',
        })
        setLoggedIn(true)
      } catch {}
    }
  }, [])

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  // Focus menu items on arrow key navigation
  useEffect(() => {
    if (!open || focusIndex < 0) return
    const items = menuRef.current?.querySelectorAll('[role="menuitem"]')
    items?.[focusIndex]?.focus()
  }, [focusIndex, open])

  // Reset focus index when dropdown closes
  useEffect(() => {
    if (!open) setFocusIndex(-1)
  }, [open])

  const getMenuItems = useCallback(() => {
    return menuRef.current?.querySelectorAll('[role="menuitem"]') || []
  }, [])

  const handleKeyDown = (e) => {
    if (!open) return
    const items = getMenuItems()
    const count = items.length

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setFocusIndex(prev => (prev + 1) % count)
        break
      case 'ArrowUp':
        e.preventDefault()
        setFocusIndex(prev => (prev - 1 + count) % count)
        break
      case 'Escape':
        e.preventDefault()
        setOpen(false)
        ref.current?.querySelector('.profile-avatar-btn')?.focus()
        break
      case 'Tab':
        setOpen(false)
        break
      case 'Home':
        e.preventDefault()
        setFocusIndex(0)
        break
      case 'End':
        e.preventDefault()
        setFocusIndex(count - 1)
        break
    }
  }

  const handleLogin = () => {
    sessionStorage.setItem('everyoneai_account', JSON.stringify({
      name: 'Eythan',
      email: 'eythan@everyoneai.com',
      channel: 'telegram',
      provider: 'anthropic',
      byok: false,
      plan: 'Ultimate Plan',
    }))
    setAccount({ name: 'Eythan', email: 'eythan@everyoneai.com', plan: 'Ultimate Plan' })
    setLoggedIn(true)
  }

  const handleSignOut = () => {
    sessionStorage.removeItem('everyoneai_account')
    setLoggedIn(false)
    setOpen(false)
  }

  const handleToggle = () => {
    const willOpen = !open
    setOpen(willOpen)
    if (willOpen) setFocusIndex(0)
  }

  const initials = account.name
    ? account.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
    : 'U'

  if (!loggedIn) {
    return (
      <>
        <button className="profile-login-btn" onClick={handleLogin}>Log in</button>
        <button className="profile-signup-btn" onClick={() => navigate('/setup')}>Sign up</button>
      </>
    )
  }

  return (
    <div className="profile-dropdown-wrap" ref={ref} onKeyDown={handleKeyDown}>
      <button
        className="profile-avatar-btn"
        onClick={handleToggle}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label="Account menu"
      >
        <div className="profile-avatar">{initials}</div>
      </button>

      <AnimatePresence>
        {open && (
        <motion.div
          className="profile-dropdown"
          role="menu"
          ref={menuRef}
          initial={{ opacity: 0, y: -8, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -6, scale: 0.97 }}
          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="profile-dropdown-header">
            <div className="profile-dropdown-user">
              <span className="profile-dropdown-name">{account.name}</span>
              <span className="profile-dropdown-plan">{account.plan.split('—')[0].trim()}</span>
            </div>
            <button className="profile-dropdown-switch" aria-label="Switch account" tabIndex={-1}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 014-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 01-4 4H3"/></svg>
            </button>
          </div>

          <div className="profile-dropdown-divider" />

          <Link to="/dashboard" className="profile-dropdown-item" role="menuitem" tabIndex={-1} onClick={() => setOpen(false)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09a1.65 1.65 0 00-1.08-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09a1.65 1.65 0 001.51-1.08 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001.08 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9c.26.6.77 1.05 1.51 1.08H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1.08z"/></svg>
            Manage account
          </Link>
          <a href="https://discord.gg" target="_blank" rel="noopener noreferrer" className="profile-dropdown-item" role="menuitem" tabIndex={-1} onClick={() => setOpen(false)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg"><path d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 00-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 00-4.8 0c-.14-.34-.36-.76-.54-1.09-.01-.02-.04-.03-.07-.03-1.5.26-2.93.71-4.27 1.33-.01 0-.02.01-.03.02-2.72 4.07-3.47 8.03-3.1 11.95 0 .02.01.04.03.05 1.8 1.32 3.53 2.12 5.24 2.65.03.01.06 0 .07-.02.4-.55.76-1.13 1.07-1.74.02-.04 0-.08-.04-.09-.57-.22-1.11-.48-1.64-.78-.04-.02-.04-.08-.01-.11.11-.08.22-.17.33-.25.02-.02.05-.02.07-.01 3.44 1.57 7.15 1.57 10.55 0 .02-.01.05-.01.07.01.11.09.22.17.33.26.04.03.04.09-.01.11-.52.31-1.07.56-1.64.78-.04.01-.05.06-.04.09.32.61.68 1.19 1.07 1.74.02.03.05.03.07.02 1.72-.53 3.45-1.33 5.24-2.65.02-.01.03-.03.03-.05.44-4.53-.73-8.46-3.1-11.95-.01-.01-.02-.02-.04-.02zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12 0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12 0 1.17-.83 2.12-1.89 2.12z"/></svg>
            Join our community
          </a>

          <div className="profile-dropdown-divider" />

          <button className="profile-dropdown-item" role="menuitem" tabIndex={-1} onClick={handleSignOut}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            Sign out
          </button>
        </motion.div>
      )}
      </AnimatePresence>
    </div>
  )
}
