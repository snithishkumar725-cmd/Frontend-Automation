import { useState } from 'react'
import { useApp } from '../context/AppContext'
import './LoginPage.css'

const LoginPage = () => {
  const { login } = useApp()
  const [portal, setPortal] = useState(null) // 'admin' | 'employee'
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    await new Promise(r => setTimeout(r, 600))
    const result = login(username, password, portal)
    if (!result.success) setError(result.message)
    setLoading(false)
  }

  const fillCredentials = (u, p) => {
    setUsername(u)
    setPassword(p)
    setError('')
  }

  return (
    <div className="login-wrapper">
      {/* Visual left panel for branding and status indicators */}
      <div className="login-visual-panel">
        <div className="panel-overlay" />
        <div className="panel-glow-1" />
        <div className="panel-glow-2" />
        
        <div className="visual-content">
          <div className="visual-logo-container">
            <div className="visual-logo">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="logo-svg">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="visual-title-box">
              <span className="visual-title">TechEMS</span>
              <span className="visual-subtitle">Enterprise Suite</span>
            </div>
          </div>

          <div className="visual-hero">
            <h1>Manage your workspace efficiently.</h1>
            <p>A unified, secure environment for managing employee information, attendance tracking, salaries, and real-time operations.</p>
          </div>

          {/* Interactive stats / features list */}
          <div className="visual-stats-grid">
            <div className="visual-stat-card">
              <span className="stat-icon">🛡️</span>
              <div className="stat-details">
                <h4>Secure Login</h4>
                <p>Role-based access & verification</p>
              </div>
            </div>
            <div className="visual-stat-card">
              <span className="stat-icon">⚡</span>
              <div className="stat-details">
                <h4>Vibrant Interface</h4>
                <p>Fast, modular, & reactive controls</p>
              </div>
            </div>
            <div className="visual-stat-card">
              <span className="stat-icon">📊</span>
              <div className="stat-details">
                <h4>Smart Data</h4>
                <p>Attendance, payroll & profiles</p>
              </div>
            </div>
          </div>

          <div className="visual-footer">
            <p>© 2026 TechEMS Solutions. All rights reserved.</p>
          </div>
        </div>
      </div>

      {/* Interactive right panel for the form input */}
      <div className="login-form-panel">
        <div className="form-panel-glow" />
        
        <div className="form-panel-container">
          {/* Mobile brand header (hidden on desktop) */}
          <div className="mobile-brand-header">
            <div className="mobile-logo">⚡</div>
            <h2>TechEMS</h2>
          </div>

          {!portal ? (
            <div className="portal-selection-view animate-fadeIn">
              <div className="section-intro">
                <h2>Welcome Back</h2>
                <p>Please select your portal mode to access the system</p>
              </div>

              <div className="portal-buttons-grid">
                <button
                  className="portal-selection-button admin"
                  onClick={() => { setPortal('admin'); setError('') }}
                  id="admin-portal-btn"
                >
                  <div className="portal-btn-icon-wrapper">
                    <span className="portal-btn-icon">🛡️</span>
                  </div>
                  <div className="portal-btn-info">
                    <h3>Admin Console</h3>
                    <p>Access management controls, audit logs, payrolls & system setup</p>
                  </div>
                  <span className="action-chevron">→</span>
                </button>

                <button
                  className="portal-selection-button employee"
                  onClick={() => { setPortal('employee'); setError('') }}
                  id="employee-portal-btn"
                >
                  <div className="portal-btn-icon-wrapper">
                    <span className="portal-btn-icon">👤</span>
                  </div>
                  <div className="portal-btn-info">
                    <h3>Employee Portal</h3>
                    <p>Check payroll slips, request leaves, view profile details & attendance</p>
                  </div>
                  <span className="action-chevron">→</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="portal-form-view animate-slideUp">
              <button 
                className="navigation-back-button" 
                onClick={() => { setPortal(null); setUsername(''); setPassword(''); setError(''); }} 
                id="back-btn"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="back-arrow-icon">
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
                Switch Portal
              </button>

              <div className="form-header-box">
                <span className={`form-portal-badge ${portal}`}>
                  {portal === 'admin' ? '🛡️ Administrator' : '👤 Employee'}
                </span>
                <h2>Account Sign-In</h2>
                <p>Enter your credentials below to access your desk</p>
              </div>

              <form onSubmit={handleLogin} className="premium-login-form" id="login-form">
                <div className="premium-input-group">
                  <label htmlFor="lp-username">Username</label>
                  <div className="premium-input-wrapper">
                    <span className="input-adornment">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="input-svg-icon">
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </span>
                    <input
                      id="lp-username"
                      type="text"
                      placeholder={portal === 'admin' ? 'admin' : 'e.g. arun.kumar'}
                      value={username}
                      onChange={e => { setUsername(e.target.value); setError('') }}
                      required
                      autoFocus
                      className="premium-text-input"
                    />
                  </div>
                </div>

                <div className="premium-input-group">
                  <label htmlFor="lp-password">Password</label>
                  <div className="premium-input-wrapper">
                    <span className="input-adornment">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="input-svg-icon">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0110 0v4" />
                      </svg>
                    </span>
                    <input
                      id="lp-password"
                      type={showPass ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={e => { setPassword(e.target.value); setError('') }}
                      required
                      className="premium-text-input"
                    />
                    <button 
                      type="button" 
                      className="premium-password-toggle" 
                      onClick={() => setShowPass(!showPass)}
                      tabIndex="-1"
                    >
                      {showPass ? (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="toggle-svg-icon">
                          <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
                          <line x1="1" y1="1" x2="23" y2="23" />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="toggle-svg-icon">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="premium-alert-error">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="alert-svg-icon">
                      <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    <span>{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className={`premium-submit-button ${portal}`}
                  id="login-submit-btn"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="premium-spinner" />
                  ) : (
                    <>
                      <span>{portal === 'admin' ? 'Access Admin Console' : 'Sign In To Portal'}</span>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="btn-arrow-icon">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </>
                  )}
                </button>
              </form>

              {/* Redesigned Quick access section */}
              <div className="premium-quick-access">
                <span className="quick-access-label">Quick Sign-In Credentials</span>
                {portal === 'admin' ? (
                  <button className="premium-chip admin-chip" onClick={() => fillCredentials('admin', 'admin123')}>
                    <span className="chip-role">Admin</span>
                    <span className="chip-username">admin / admin123</span>
                  </button>
                ) : (
                  <div className="quick-access-grid-container">
                    <div className="premium-chips-scroll">
                      {[
                        { name: 'Asbar', u: 'asbar' },
                        { name: 'Nithishkumar', u: 'nithishkumar' },
                        { name: 'Kamalesh', u: 'kamalesh' },
                        { name: 'Sabarish', u: 'sabarish' },
                        { name: 'Sanjith', u: 'sanjith' },
                        { name: 'Saravanan', u: 'saravanan' },
                        { name: 'Kishore', u: 'kishore' },
                        { name: 'Madhu', u: 'madhu' },
                        { name: 'Reshinth', u: 'reshinth' },
                        { name: 'Vishnu', u: 'vishnu' },
                        { name: 'Santhosh', u: 'santhosh' },
                        { name: 'Sasikanth', u: 'sasikanth' },
                      ].map(e => (
                        <button key={e.u} className="premium-chip employee-chip" onClick={() => fillCredentials(e.u, 'emp123')}>
                          {e.name}
                        </button>
                      ))}
                    </div>
                    <span className="quick-access-help-note">Password for all employee chips: <strong>emp123</strong></span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default LoginPage
