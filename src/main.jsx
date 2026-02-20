import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Tools from './Tools.jsx'
import Onboarding from './Onboarding.jsx'
import Dashboard from './Dashboard.jsx'
import Security from './Security.jsx'
import SmallBusiness from './SmallBusiness.jsx'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/setup" element={<Onboarding />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/security" element={<Security />} />
        <Route path="/small-business" element={<SmallBusiness />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
