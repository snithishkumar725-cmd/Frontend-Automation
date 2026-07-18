import './Footer.css'

const Footer = ({ onNavigate }) => {
  const handleNav = (id) => {
    onNavigate(id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="footer" id="footer">
      <div className="footer-bg-shapes">
        <div className="footer-blob blob-1"></div>
        <div className="footer-blob blob-2"></div>
      </div>
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand-col">
            <button className="footer-brand" onClick={() => handleNav('home')}>
              <div className="footer-brand-icon">
                <svg width="32" height="32" viewBox="0 0 28 28" fill="none">
                  <rect x="2" y="2" width="24" height="24" rx="7" fill="url(#footerBrandGrad)" />
                  <path d="M9 10h10M9 14h7M9 18h10" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  <defs>
                    <linearGradient id="footerBrandGrad" x1="2" y1="2" x2="26" y2="26">
                      <stop stopColor="#ff6b3d" />
                      <stop offset="1" stopColor="#7c5cfc" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <span className="footer-brand-text">
                <span className="brand-tech">TECH</span>
                <span className="brand-ems">EMS</span>
              </span>
            </button>
            <p className="footer-desc">
              Empowering organizations with intelligent employee management solutions. Streamline HR operations with modern technology.
            </p>
            <div className="footer-socials">
              {['🐦', '💼', '📘', '📸'].map((icon, i) => (
                <button key={i} className="social-btn" id={`social-btn-${i}`}>
                  {icon}
                </button>
              ))}
            </div>
          </div>

          <div className="footer-links-col">
            <h4 className="footer-col-title">Quick Links</h4>
            <ul className="footer-link-list">
              {[
                { id: 'home', label: 'Home' },
                { id: 'dashboard', label: 'Dashboard' },
                { id: 'employees', label: 'Employees' },
                { id: 'about', label: 'About Us' },
                { id: 'contact', label: 'Contact' },
              ].map(item => (
                <li key={item.id}>
                  <button onClick={() => handleNav(item.id)} className="footer-link" id={`footer-link-${item.id}`}>
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-links-col">
            <h4 className="footer-col-title">Features</h4>
            <ul className="footer-link-list">
              {['Employee Records', 'Attendance Tracking', 'Performance Reviews', 'Payroll Management', 'Leave Management'].map((item, i) => (
                <li key={i}>
                  <span className="footer-link">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-links-col">
            <h4 className="footer-col-title">Contact Info</h4>
            <div className="footer-contact-info">
              <div className="footer-contact-item">
                <span className="fci-icon">📍</span>
                <span>123 Tech Street, Silicon Valley, CA</span>
              </div>
              <div className="footer-contact-item">
                <span className="fci-icon">📧</span>
                <span>hello@techems.com</span>
              </div>
              <div className="footer-contact-item">
                <span className="fci-icon">📞</span>
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © 2026 <strong>TECH EMS</strong>. All rights reserved. Built with ❤️ for modern teams.
          </p>
          <div className="footer-bottom-links">
            <button className="footer-bottom-link">Privacy Policy</button>
            <button className="footer-bottom-link">Terms of Service</button>
            <button className="footer-bottom-link">Cookie Policy</button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
