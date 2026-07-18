import { useState, useEffect, useRef } from 'react'
import './Home.css'

const Home = ({ onNavigate }) => {
  const [counters, setCounters] = useState({ employees: 0, departments: 0, countries: 0, satisfaction: 0 })
  const statsRef = useRef(null)
  const [statsVisible, setStatsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true)
        }
      },
      { threshold: 0.3 }
    )
    if (statsRef.current) observer.observe(statsRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!statsVisible) return
    const targets = { employees: 2500, departments: 48, countries: 32, satisfaction: 98 }
    const duration = 2000
    const steps = 60
    const interval = duration / steps

    let step = 0
    const timer = setInterval(() => {
      step++
      const progress = step / steps
      const eased = 1 - Math.pow(1 - progress, 3)
      setCounters({
        employees: Math.round(targets.employees * eased),
        departments: Math.round(targets.departments * eased),
        countries: Math.round(targets.countries * eased),
        satisfaction: Math.round(targets.satisfaction * eased),
      })
      if (step >= steps) clearInterval(timer)
    }, interval)

    return () => clearInterval(timer)
  }, [statsVisible])

  const features = [
    {
      icon: '👤',
      title: 'Employee Profiles',
      description: 'Comprehensive employee profiles with all essential information at your fingertips.',
      gradient: 'gradient-warm',
    },
    {
      icon: '📈',
      title: 'Performance Tracking',
      description: 'Monitor and evaluate employee performance with real-time analytics and insights.',
      gradient: 'gradient-cool',
    },
    {
      icon: '📅',
      title: 'Leave Management',
      description: 'Streamlined leave requests, approvals, and tracking with automated workflows.',
      gradient: 'gradient-fresh',
    },
    {
      icon: '💰',
      title: 'Payroll Integration',
      description: 'Seamless payroll processing with accurate calculations and compliance checks.',
      gradient: 'gradient-sunset',
    },
    {
      icon: '🎯',
      title: 'Goal Setting',
      description: 'Set, track, and achieve team and individual goals with milestone tracking.',
      gradient: 'gradient-warm',
    },
    {
      icon: '📊',
      title: 'Analytics Dashboard',
      description: 'Powerful analytics with visual reports to drive data-informed HR decisions.',
      gradient: 'gradient-cool',
    },
  ]

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'HR Director',
      company: 'TechCorp Inc.',
      text: 'TECH EMS has transformed how we manage our workforce. The intuitive dashboard saves us hours every week.',
      avatar: 'SJ',
    },
    {
      name: 'Michael Chen',
      role: 'CEO',
      company: 'InnovateLabs',
      text: 'The best employee management solution we have ever used. Clean, fast, and incredibly powerful.',
      avatar: 'MC',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Operations Manager',
      company: 'GlobalTeam',
      text: 'From onboarding to performance reviews, TECH EMS handles everything with elegance and efficiency.',
      avatar: 'ER',
    },
  ]

  return (
    <div className="home-page" id="home-page">
      {/* Hero Section */}
      <section className="hero-section" id="hero-section">
        <div className="hero-bg">
          <div className="hero-blob blob-1"></div>
          <div className="hero-blob blob-2"></div>
          <div className="hero-blob blob-3"></div>
          <div className="hero-grid-pattern"></div>
        </div>

        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-badge animate-fadeInUp delay-1">
              <span className="badge-dot"></span>
              <span>🚀 #1 Employee Management Platform</span>
            </div>
            <h1 className="hero-title animate-fadeInUp delay-2">
              Manage Your <span className="title-highlight">Team</span>
              <br />
              With <span className="title-highlight-accent">Intelligence</span>
            </h1>
            <p className="hero-subtitle animate-fadeInUp delay-3">
              Streamline HR operations, boost team productivity, and build a
              thriving workplace culture with our comprehensive employee
              management system.
            </p>
            <div className="hero-actions animate-fadeInUp delay-4">
              <button className="btn btn-primary btn-lg" id="hero-get-started" onClick={() => onNavigate('dashboard')}>
                Get Started Free
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M4 9h10M10 5l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button className="btn btn-outline btn-lg" id="hero-learn-more" onClick={() => onNavigate('about')}>
                Learn More
              </button>
            </div>
            <div className="hero-trust animate-fadeInUp delay-5">
              <div className="trust-avatars">
                {['A', 'B', 'C', 'D'].map((letter, i) => (
                  <div key={i} className={`trust-avatar trust-avatar-${i}`}>{letter}</div>
                ))}
                <div className="trust-avatar trust-avatar-more">+2k</div>
              </div>
              <span className="trust-text">
                Trusted by <strong>2,500+</strong> companies worldwide
              </span>
            </div>
          </div>

          <div className="hero-visual animate-fadeInRight delay-3">
            <div className="hero-card-stack">
              <div className="hero-float-card card-1">
                <div className="hfc-icon">📊</div>
                <div className="hfc-content">
                  <span className="hfc-label">Active Employees</span>
                  <span className="hfc-value">1,247</span>
                </div>
                <div className="hfc-trend up">↑ 12%</div>
              </div>
              <div className="hero-float-card card-2">
                <div className="hfc-icon">🎯</div>
                <div className="hfc-content">
                  <span className="hfc-label">Goals Achieved</span>
                  <span className="hfc-value">89%</span>
                </div>
                <div className="hfc-progress">
                  <div className="hfc-progress-bar" style={{ width: '89%' }}></div>
                </div>
              </div>
              <div className="hero-float-card card-3">
                <div className="hfc-icon">⭐</div>
                <div className="hfc-content">
                  <span className="hfc-label">Team Rating</span>
                  <span className="hfc-value">4.9/5.0</span>
                </div>
                <div className="hfc-stars">★★★★★</div>
              </div>
              <div className="hero-main-visual">
                <div className="visual-header">
                  <div className="visual-dots">
                    <span></span><span></span><span></span>
                  </div>
                  <span className="visual-title">Dashboard Overview</span>
                </div>
                <div className="visual-chart">
                  {[40, 65, 50, 80, 60, 90, 75, 85, 70, 95, 80, 88].map((h, i) => (
                    <div key={i} className="chart-bar" style={{ height: `${h}%`, animationDelay: `${i * 0.08}s` }}></div>
                  ))}
                </div>
                <div className="visual-footer">
                  <span>Jan</span><span>Mar</span><span>Jun</span><span>Sep</span><span>Dec</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section" ref={statsRef} id="stats-section">
        <div className="stats-grid">
          {[
            { label: 'Employees Managed', value: counters.employees.toLocaleString() + '+', icon: '👥', color: 'primary' },
            { label: 'Departments', value: counters.departments + '+', icon: '🏢', color: 'accent' },
            { label: 'Countries', value: counters.countries + '+', icon: '🌍', color: 'info' },
            { label: 'Satisfaction Rate', value: counters.satisfaction + '%', icon: '💯', color: 'success' },
          ].map((stat, i) => (
            <div key={i} className={`stat-card animate-fadeInUp delay-${i + 1}`} id={`stat-card-${i}`}>
              <div className={`stat-icon-wrap stat-${stat.color}`}>
                <span className="stat-emoji">{stat.icon}</span>
              </div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="section features-section" id="features-section">
        <div className="section-header">
          <span className="section-badge primary animate-fadeInUp delay-1">✨ Features</span>
          <h2 className="section-title animate-fadeInUp delay-2">
            Everything You Need to <span className="highlight">Manage</span>
          </h2>
          <p className="section-subtitle animate-fadeInUp delay-3">
            Powerful tools designed to simplify HR workflows and enhance your team's productivity
          </p>
        </div>
        <div className="features-grid">
          {features.map((feature, i) => (
            <div key={i} className={`feature-card animate-fadeInUp delay-${(i % 3) + 1}`} id={`feature-card-${i}`}>
              <div className={`feature-icon-wrap ${feature.gradient}`}>
                <span className="feature-emoji">{feature.icon}</span>
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-desc">{feature.description}</p>
              <button className="feature-link">
                Learn more
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="section testimonials-section" id="testimonials-section">
        <div className="section-header">
          <span className="section-badge accent animate-fadeInUp delay-1">💬 Testimonials</span>
          <h2 className="section-title animate-fadeInUp delay-2">
            Loved by <span className="highlight-accent">Teams</span> Everywhere
          </h2>
          <p className="section-subtitle animate-fadeInUp delay-3">
            See what industry leaders are saying about TECH EMS
          </p>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <div key={i} className={`testimonial-card animate-fadeInUp delay-${i + 1}`} id={`testimonial-card-${i}`}>
              <div className="testimonial-quote">"</div>
              <p className="testimonial-text">{t.text}</p>
              <div className="testimonial-author">
                <div className={`testimonial-avatar ta-${i}`}>{t.avatar}</div>
                <div className="testimonial-info">
                  <strong className="testimonial-name">{t.name}</strong>
                  <span className="testimonial-role">{t.role} at {t.company}</span>
                </div>
              </div>
              <div className="testimonial-stars">★★★★★</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section" id="cta-section">
        <div className="cta-bg">
          <div className="cta-blob cta-blob-1"></div>
          <div className="cta-blob cta-blob-2"></div>
        </div>
        <div className="cta-content animate-fadeInUp delay-1">
          <h2 className="cta-title">Ready to Transform Your HR?</h2>
          <p className="cta-subtitle">
            Join thousands of companies already using TECH EMS to manage their workforce efficiently.
          </p>
          <div className="cta-actions">
            <button className="btn btn-primary btn-lg" onClick={() => onNavigate('dashboard')} id="cta-start-btn">
              Start Free Trial
            </button>
            <button className="btn btn-outline btn-lg" onClick={() => onNavigate('contact')} id="cta-contact-btn">
              Contact Sales
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
