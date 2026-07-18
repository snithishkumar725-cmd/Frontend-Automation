import React from 'react';
import { Link } from 'react-router-dom';
import {
  RiMailLine, RiPhoneLine, RiMapPinLine,
  RiLinkedinBoxLine, RiGithubLine, RiTwitterLine
} from 'react-icons/ri';
import './Footer.css';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-glow"></div>
      <div className="footer-container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="footer-logo-icon">⚡</div>
              <div>
                <div className="footer-logo-title">EMS</div>
                <div className="footer-logo-sub">Employee Management System</div>
              </div>
            </div>
            <p className="footer-desc">
              A modern, intelligent workforce management platform built for forward-thinking organizations.
            </p>
            <div className="footer-socials">
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-btn" aria-label="LinkedIn"><RiLinkedinBoxLine /></a>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="social-btn" aria-label="GitHub"><RiGithubLine /></a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-btn" aria-label="Twitter"><RiTwitterLine /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/home">Home</Link></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/employees">Employees</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="footer-col">
            <h4 className="footer-heading">Legal</h4>
            <ul className="footer-links">
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms of Use</a></li>
              <li><a href="#security">Security</a></li>
              <li><a href="#cookies">Cookie Policy</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4 className="footer-heading">Contact Us</h4>
            <ul className="footer-contact">
              <li>
                <RiMailLine className="contact-icon" />
                <a href="mailto:kbdnithish07@gmail.com">kbdnithish07@gmail.com</a>
              </li>
              <li>
                <RiPhoneLine className="contact-icon" />
                <a href="tel:9566103705">9566103705</a>
              </li>
              <li>
                <RiMapPinLine className="contact-icon" />
                <span>Tamil Nadu, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">
            © {year} Employee Management System. All rights reserved.
          </p>
          <p className="footer-tech">
            Built with ❤️ using React.js
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
