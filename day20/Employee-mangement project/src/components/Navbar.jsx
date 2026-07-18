import { useState, useEffect } from 'react'
import './Navbar.css'

const Navbar = ({ currentPage, onNavigate }) => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'employees', label: 'Employees', icon: '👥' },
    { id: 'about', label: 'About', icon: '💡' },
    { id: 'contact', label: 'Contact', icon: '✉️' },
  ]

  const handleNav = (id) => {
    onNavigate(id)
    setMobileOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`} id="main-navbar">
      <div className="navbar-inner">
        <button className="navbar-brand" onClick={() => handleNav('home')} id="nav-brand">
          <div className="brand-icon">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <rect x="2" y="2" width="24" height="24" rx="7" fill="url(#brandGrad)" />
              <path d="M9 10h10M9 14h7M9 18h10" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <defs>
                <linearGradient id="brandGrad" x1="2" y1="2" x2="26" y2="26">
                  <stop stopColor="#ff6b3d" />
                  <stop offset="1" stopColor="#7c5cfc" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className="brand-text">
            <span className="brand-tech">TECH</span>
            <span className="brand-ems">EMS</span>
          </span>
        </button>

        <div className={`navbar-links ${mobileOpen ? 'open' : ''}`}>
          {navItems.map((item) => (
            <button
              key={item.id}
              id={`nav-${item.id}`}
              className={`nav-link ${currentPage === item.id ? 'active' : ''}`}
              onClick={() => handleNav(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
              {currentPage === item.id && <span className="nav-indicator" />}
            </button>
          ))}
        </div>

        <div className="navbar-actions">
          <button className="notification-btn" id="notification-btn" title="Notifications">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 2a6 6 0 00-6 6v3l-1.5 2.5h15L16 11V8a6 6 0 00-6-6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              <path d="M8 16a2 2 0 004 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span className="notification-dot"></span>
          </button>
          <button className="avatar-btn" id="user-avatar-btn" title="Profile">
            <div className="avatar-circle">
              <span>A</span>
            </div>
          </button>
        </div>

        <button
          className={`hamburger ${mobileOpen ? 'open' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          id="hamburger-btn"
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {mobileOpen && <div className="mobile-overlay" onClick={() => setMobileOpen(false)} />}
    </nav>
  )
}

export default Navbar
