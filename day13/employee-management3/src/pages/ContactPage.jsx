import React, { useState } from 'react';
import {
  RiMailLine, RiPhoneLine, RiMapPinLine, RiSendPlaneLine,
  RiUserLine, RiChat3Line, RiTimeLine, RiCheckLine
} from 'react-icons/ri';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './ContactPage.css';

const contactInfo = [
  {
    icon: <RiMailLine />,
    label: 'Email Address',
    value: 'kbdnithish07@gmail.com',
    sub: 'We reply within 24 hours',
    href: 'mailto:kbdnithish07@gmail.com',
    color: 'var(--gradient-primary)',
  },
  {
    icon: <RiPhoneLine />,
    label: 'Phone Number',
    value: '9566103705',
    sub: 'Mon–Fri, 9am–6pm IST',
    href: 'tel:9566103705',
    color: 'var(--gradient-success)',
  },
  {
    icon: <RiMapPinLine />,
    label: 'Location',
    value: 'Tamil Nadu, India',
    sub: 'South India HQ',
    href: null,
    color: 'var(--gradient-accent)',
  },
  {
    icon: <RiTimeLine />,
    label: 'Business Hours',
    value: 'Mon–Fri: 9AM–6PM',
    sub: 'Sat: 10AM–2PM',
    href: null,
    color: 'var(--gradient-secondary)',
  },
];

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email';
    if (!form.subject.trim()) errs.subject = 'Subject is required';
    if (!form.message.trim()) errs.message = 'Message is required';
    else if (form.message.trim().length < 20) errs.message = 'Message must be at least 20 characters';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
    toast.success('Message sent successfully! We\'ll get back to you soon. 📧');
  };

  return (
    <div className="page-wrapper contact-page">
      <Navbar />

      {/* Hero */}
      <section className="contact-hero">
        <div className="container contact-hero-content fade-in-up">
          <div className="section-badge">
            <RiChat3Line />
            <span>Get In Touch</span>
          </div>
          <h1 className="about-title">Contact <span className="gradient-text">Us</span></h1>
          <p className="about-lead" style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto' }}>
            Have questions, feedback, or need support? We're here to help. Reach out and our team will get back to you as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="contact-info-section">
        <div className="container">
          <div className="contact-info-grid">
            {contactInfo.map((c, i) => (
              <div key={i} className="contact-info-card card fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="contact-card-icon" style={{ background: c.color }}>{c.icon}</div>
                <div className="contact-card-label">{c.label}</div>
                {c.href ? (
                  <a href={c.href} className="contact-card-value">{c.value}</a>
                ) : (
                  <div className="contact-card-value">{c.value}</div>
                )}
                <div className="contact-card-sub">{c.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="contact-form-section">
        <div className="container">
          <div className="contact-form-wrapper">
            <div className="contact-form-info fade-in-left">
              <h2 className="section-title">Send Us a <span className="gradient-text">Message</span></h2>
              <p className="section-subtitle">Fill in the form and we'll reach out promptly.</p>
              <div className="contact-guarantees">
                {['Response within 24 hours', 'No spam, ever', 'Dedicated support team', 'Free consultation available'].map((g) => (
                  <div key={g} className="guarantee-item">
                    <RiCheckLine className="check-icon" />
                    <span>{g}</span>
                  </div>
                ))}
              </div>
              <div className="contact-decoration">
                <div className="contact-blob"></div>
                <span className="contact-emoji float">📬</span>
              </div>
            </div>

            <div className="contact-form-panel card fade-in-right">
              {submitted ? (
                <div className="success-state">
                  <div className="success-icon">✅</div>
                  <h3>Message Sent!</h3>
                  <p>Thanks for reaching out. We'll get back to you at <strong>{form.email}</strong> within 24 hours.</p>
                  <button className="btn btn-primary" onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }); }}>
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <h3 className="form-section-title"><RiSendPlaneLine /> Contact Form</h3>
                  <div className="contact-form-grid">
                    <div className="form-group">
                      <label className="form-label" htmlFor="c-name">Full Name *</label>
                      <div className="input-wrapper">
                        <RiUserLine className="input-icon" />
                        <input id="c-name" name="name" value={form.name} onChange={handleChange} className={`form-control input-with-icon ${errors.name ? 'error' : ''}`} placeholder="Your full name" />
                      </div>
                      {errors.name && <span className="form-error">{errors.name}</span>}
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="c-email">Email Address *</label>
                      <div className="input-wrapper">
                        <RiMailLine className="input-icon" />
                        <input id="c-email" name="email" type="email" value={form.email} onChange={handleChange} className={`form-control input-with-icon ${errors.email ? 'error' : ''}`} placeholder="your@email.com" />
                      </div>
                      {errors.email && <span className="form-error">{errors.email}</span>}
                    </div>
                    <div className="form-group form-full">
                      <label className="form-label" htmlFor="c-subject">Subject *</label>
                      <input id="c-subject" name="subject" value={form.subject} onChange={handleChange} className={`form-control ${errors.subject ? 'error' : ''}`} placeholder="What's this about?" />
                      {errors.subject && <span className="form-error">{errors.subject}</span>}
                    </div>
                    <div className="form-group form-full">
                      <label className="form-label" htmlFor="c-message">Message *</label>
                      <textarea id="c-message" name="message" value={form.message} onChange={handleChange} className={`form-control ${errors.message ? 'error' : ''}`} placeholder="Tell us more..." rows={5} />
                      {errors.message && <span className="form-error">{errors.message}</span>}
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary btn-lg contact-submit" disabled={loading}>
                    {loading ? (
                      <><span className="btn-spinner"></span> Sending...</>
                    ) : (
                      <><RiSendPlaneLine /> Send Message</>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
