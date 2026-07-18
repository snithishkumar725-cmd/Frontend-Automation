import React from 'react';
import {
  RiRocketLine, RiEyeLine, RiTeamLine, RiShieldCheckLine,
  RiBarChartLine, RiGlobalLine, RiStarLine, RiCheckLine
} from 'react-icons/ri';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './AboutPage.css';

const values = [
  { icon: <RiShieldCheckLine />, title: 'Security First', desc: 'Enterprise-grade data protection and role-based access control.', color: 'var(--gradient-primary)' },
  { icon: <RiBarChartLine />, title: 'Data-Driven', desc: 'Real-time analytics and insights to help organizations make better decisions.', color: 'var(--gradient-accent)' },
  { icon: <RiTeamLine />, title: 'People-Centric', desc: 'Designed with employees at heart — intuitive, fast, and reliable.', color: 'var(--gradient-success)' },
  { icon: <RiGlobalLine />, title: 'Scalable', desc: 'Built to grow with your organization, from 10 to 10,000 employees.', color: 'var(--gradient-secondary)' },
];

const milestones = [
  { year: '2019', text: 'Project inception — designed for small HR teams' },
  { year: '2020', text: 'Launched v1.0 with core CRUD operations' },
  { year: '2021', text: 'Added analytics dashboard and charts' },
  { year: '2022', text: 'Introduced dark mode and mobile support' },
  { year: '2023', text: 'AI-powered search and smart filtering' },
  { year: '2024', text: 'React.js rewrite with glassmorphism UI' },
];

const AboutPage = () => (
  <div className="page-wrapper about-page">
    <Navbar />

    {/* Hero */}
    <section className="about-hero">
      <div className="about-hero-bg">
        <div className="about-blob ab-1"></div>
        <div className="about-blob ab-2"></div>
      </div>
      <div className="container about-hero-content fade-in-up">
        <div className="section-badge">
          <RiStarLine />
          <span>About Our Platform</span>
        </div>
        <h1 className="about-title">About <span className="gradient-text">Employee Management System</span></h1>
        <p className="about-lead">
          The Employee Management System is a modern workforce management solution designed to simplify employee administration through an intuitive and secure interface. It enables organizations to efficiently manage employee records, monitor workforce information, organize departments, and streamline daily HR operations.
        </p>
        <p className="about-lead">
          Built with React.js, the platform offers a fast, responsive, and user-friendly experience while ensuring data accuracy, productivity, and scalability for businesses of all sizes.
        </p>
      </div>
    </section>

    {/* Mission & Vision */}
    <section className="mission-section">
      <div className="container">
        <div className="mv-grid">
          <div className="mv-card mission-card card fade-in-left">
            <div className="mv-icon">
              <RiRocketLine />
            </div>
            <div className="mv-label">Our Mission</div>
            <h2 className="mv-title">Deliver efficient employee management through smart digital solutions.</h2>
            <p className="mv-desc">We believe every organization deserves powerful, accessible tools to manage their most important asset — their people. Our mission is to make HR operations effortless, accurate, and insightful.</p>
            <ul className="mv-list">
              {['Streamline onboarding', 'Centralize employee data', 'Enable data-driven decisions', 'Reduce administrative overhead'].map((item) => (
                <li key={item}><RiCheckLine className="check-icon" />{item}</li>
              ))}
            </ul>
          </div>
          <div className="mv-card vision-card card fade-in-right">
            <div className="mv-icon vision-icon">
              <RiEyeLine />
            </div>
            <div className="mv-label">Our Vision</div>
            <h2 className="mv-title">Empower organizations with intelligent workforce management technology.</h2>
            <p className="mv-desc">We envision a future where HR teams spend less time on paperwork and more time on what matters — nurturing talent, building culture, and driving growth.</p>
            <ul className="mv-list">
              {['AI-powered HR insights', 'Zero-friction employee lifecycle', 'Inclusive, scalable platforms', 'Privacy-first data practices'].map((item) => (
                <li key={item}><RiCheckLine className="check-icon" />{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>

    {/* Stats */}
    <section className="about-stats-section">
      <div className="container">
        <div className="about-stats-grid">
          {[
            { value: '500+', label: 'Organizations Served' },
            { value: '50K+', label: 'Employees Managed' },
            { value: '99.9%', label: 'Uptime Guarantee' },
            { value: '4.9★', label: 'Average Rating' },
          ].map((s, i) => (
            <div key={i} className="about-stat fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="about-stat-value">{s.value}</div>
              <div className="about-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Values */}
    <section className="values-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Our Core <span className="gradient-text">Values</span></h2>
          <p className="section-subtitle">The principles that guide everything we build</p>
        </div>
        <div className="values-grid">
          {values.map((v, i) => (
            <div key={i} className="value-card card fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="value-icon" style={{ background: v.color }}>{v.icon}</div>
              <h3 className="value-title">{v.title}</h3>
              <p className="value-desc">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Timeline */}
    <section className="timeline-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Our <span className="gradient-text">Journey</span></h2>
          <p className="section-subtitle">How we got here</p>
        </div>
        <div className="timeline">
          {milestones.map((m, i) => (
            <div key={i} className={`timeline-item ${i % 2 === 0 ? 'left' : 'right'} fade-in-up`} style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="timeline-year">{m.year}</div>
              <div className="timeline-dot"></div>
              <div className="timeline-text card">{m.text}</div>
            </div>
          ))}
          <div className="timeline-line"></div>
        </div>
      </div>
    </section>

    {/* Tech Stack */}
    <section className="tech-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Built With <span className="gradient-text">Modern Tech</span></h2>
        </div>
        <div className="tech-grid">
          {['React.js', 'React Router DOM', 'Chart.js', 'Framer Motion', 'React Icons', 'CSS3', 'Local Storage', 'Vite'].map((t, i) => (
            <div key={i} className="tech-chip card fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
              {t}
            </div>
          ))}
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default AboutPage;
