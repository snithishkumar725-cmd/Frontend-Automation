import { useState } from 'react'
import './Contact.css'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', subject: '', message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSending(true)
    setTimeout(() => {
      setSending(false)
      setSubmitted(true)
      setFormData({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setSubmitted(false), 4000)
    }, 1500)
  }

  const contactInfo = [
    { icon: '📍', title: 'Visit Us', lines: ['123 Tech Street', 'Silicon Valley, CA 94025', 'United States'] },
    { icon: '📧', title: 'Email Us', lines: ['hello@techems.com', 'support@techems.com'] },
    { icon: '📞', title: 'Call Us', lines: ['+1 (555) 123-4567', '+91 98765 43210'] },
    { icon: '🕐', title: 'Working Hours', lines: ['Mon - Fri: 9:00 AM - 6:00 PM', 'Sat: 10:00 AM - 2:00 PM'] },
  ]

  const faqs = [
    { q: 'How do I get started with TECH EMS?', a: 'Simply sign up for a free trial on our website. No credit card required. Our onboarding wizard will guide you through the setup process.' },
    { q: 'Can I integrate TECH EMS with other tools?', a: 'Yes! TECH EMS integrates with popular tools like Slack, Microsoft Teams, Google Workspace, and many more through our REST API.' },
    { q: 'Is my data secure with TECH EMS?', a: 'Absolutely. We use enterprise-grade encryption (AES-256), comply with GDPR & SOC 2, and conduct regular security audits.' },
    { q: 'Do you offer custom pricing for enterprises?', a: 'Yes, we offer flexible enterprise plans tailored to your organization\'s needs. Contact our sales team for a custom quote.' },
  ]

  const [openFaq, setOpenFaq] = useState(null)

  return (
    <div className="contact-page" id="contact-page">
      {/* Hero */}
      <section className="contact-hero" id="contact-hero">
        <div className="contact-hero-bg">
          <div className="ch-blob ch-1"></div>
          <div className="ch-blob ch-2"></div>
        </div>
        <div className="contact-hero-content">
          <span className="section-badge primary animate-fadeInUp delay-1">✉️ Contact</span>
          <h1 className="contact-hero-title animate-fadeInUp delay-2">
            Get in <span className="highlight">Touch</span>
          </h1>
          <p className="contact-hero-subtitle animate-fadeInUp delay-3">
            Have a question, feedback, or want to learn more? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="section contact-info-section" id="contact-info-section">
        <div className="contact-info-grid">
          {contactInfo.map((info, i) => (
            <div key={i} className={`contact-info-card animate-fadeInUp delay-${i + 1}`} id={`contact-info-${i}`}>
              <div className="cic-icon">{info.icon}</div>
              <h3 className="cic-title">{info.title}</h3>
              {info.lines.map((line, j) => (
                <p key={j} className="cic-line">{line}</p>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form + Map */}
      <section className="section contact-main" id="contact-main">
        <div className="contact-main-grid">
          {/* Form */}
          <div className="contact-form-card animate-fadeInLeft delay-1" id="contact-form-card">
            <h2 className="cf-title">Send us a Message</h2>
            <p className="cf-subtitle">Fill out the form below and we'll get back to you within 24 hours.</p>

            {submitted && (
              <div className="success-message" id="success-message">
                <span className="success-icon">✅</span>
                <div>
                  <strong>Message Sent Successfully!</strong>
                  <p>Thank you for reaching out. We'll respond shortly.</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="contact-form" id="contact-form">
              <div className="cf-row">
                <div className="input-group">
                  <label htmlFor="contact-name">Full Name *</label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="contact-email">Email Address *</label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="input-group">
                <label htmlFor="contact-subject">Subject *</label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  placeholder="How can we help?"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>
              <div className="input-group">
                <label htmlFor="contact-message">Message *</label>
                <textarea
                  id="contact-message"
                  name="message"
                  placeholder="Tell us more about your inquiry..."
                  rows="5"
                  required
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>
              <button type="submit" className={`btn btn-primary btn-lg cf-submit ${sending ? 'sending' : ''}`} id="submit-contact" disabled={sending}>
                {sending ? (
                  <>
                    <span className="spinner"></span>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M4 9h10M10 5l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Map / Visual */}
          <div className="contact-visual animate-fadeInRight delay-2" id="contact-visual">
            <div className="map-placeholder">
              <div className="map-overlay">
                <div className="map-pin">📍</div>
                <div className="map-grid-bg">
                  {Array(25).fill(null).map((_, i) => (
                    <div key={i} className="map-dot" style={{ animationDelay: `${i * 0.05}s` }}></div>
                  ))}
                </div>
                <div className="map-info-card">
                  <h4>TECH EMS HQ</h4>
                  <p>123 Tech Street, Silicon Valley</p>
                  <p>CA 94025, United States</p>
                </div>
              </div>
            </div>
            <div className="contact-extra-cards">
              <div className="cec-card" id="cec-support">
                <span className="cec-icon">💬</span>
                <div>
                  <strong>Live Chat Support</strong>
                  <p>Available 24/7 for instant help</p>
                </div>
              </div>
              <div className="cec-card" id="cec-community">
                <span className="cec-icon">👥</span>
                <div>
                  <strong>Community Forum</strong>
                  <p>Join 10k+ members discussing best practices</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section contact-faq" id="contact-faq">
        <div className="section-header">
          <span className="section-badge accent animate-fadeInUp delay-1">❓ FAQ</span>
          <h2 className="section-title animate-fadeInUp delay-2">
            Frequently Asked <span className="highlight-accent">Questions</span>
          </h2>
        </div>
        <div className="faq-list">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`faq-item ${openFaq === i ? 'open' : ''} animate-fadeInUp delay-${i + 1}`}
              id={`faq-item-${i}`}
            >
              <button className="faq-question" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <span>{faq.q}</span>
                <span className="faq-toggle">{openFaq === i ? '−' : '+'}</span>
              </button>
              <div className="faq-answer">
                <p>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Contact
