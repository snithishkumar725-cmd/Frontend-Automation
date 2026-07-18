import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  RiTeamLine, RiDashboardLine, RiUserAddLine, RiArrowRightLine,
  RiShieldCheckLine, RiBarChartLine, RiFileListLine, RiSearchLine,
  RiNotification3Line, RiCheckLine
} from 'react-icons/ri';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useApp } from '../context/AppContext';
import './HomePage.css';

// Animated counter hook
const useCounter = (target, duration = 2000) => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [started, target, duration]);

  return { count, ref };
};

const StatCard = ({ icon, label, value, color, delay }) => {
  const { count, ref } = useCounter(value);
  return (
    <div className="home-stat-card fade-in-up" style={{ animationDelay: delay }} ref={ref}>
      <div className="stat-icon-wrap" style={{ background: color }}>
        {icon}
      </div>
      <div className="stat-info">
        <div className="stat-number">{count.toLocaleString()}</div>
        <div className="stat-label">{label}</div>
      </div>
    </div>
  );
};

const features = [
  { icon: <RiUserAddLine />, title: 'Easy Employee Onboarding', desc: 'Add new employees in seconds with a professional form that validates all data.', color: 'var(--gradient-primary)' },
  { icon: <RiSearchLine />, title: 'Smart Search & Filter', desc: 'Find any employee instantly with real-time search, department filters, and sorting.', color: 'var(--gradient-secondary)' },
  { icon: <RiBarChartLine />, title: 'Live Analytics Dashboard', desc: 'Beautiful charts and metrics that give you real-time insights into your workforce.', color: 'var(--gradient-accent)' },
  { icon: <RiShieldCheckLine />, title: 'Secure & Reliable', desc: 'Enterprise-grade security with encrypted storage and role-based access control.', color: 'var(--gradient-success)' },
  { icon: <RiFileListLine />, title: 'Complete CRUD Operations', desc: 'View, edit, and manage every employee record with a single click.', color: 'var(--gradient-warning)' },
  { icon: <RiNotification3Line />, title: 'Instant Notifications', desc: 'Real-time toast notifications keep you informed on every action you take.', color: 'var(--gradient-danger)' },
];

const HomePage = () => {
  const { employees, currentUser } = useApp();
  const activeCount = employees.filter((e) => e.status === 'Active').length;
  const deptCount = [...new Set(employees.map((e) => e.department))].length;
  const totalPayroll = employees.reduce((sum, e) => sum + Number(e.salary), 0);

  const recentEmployees = employees.slice(0, 5);

  return (
    <div className="page-wrapper home-page">
      <Navbar />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-bg">
          <div className="hero-blob hero-blob-1"></div>
          <div className="hero-blob hero-blob-2"></div>
          <div className="hero-grid"></div>
        </div>
        <div className="container hero-container">
          <div className="hero-content fade-in-up">
            <div className="hero-badge">
              <RiShieldCheckLine />
              <span>Trusted by 500+ companies</span>
            </div>
            <h1 className="hero-title">
              Welcome to <span className="gradient-text">Employee</span><br />
              Management System
            </h1>
            <p className="hero-subtitle">
              Manage your workforce smarter, faster, and more efficiently with our intelligent employee management platform. Streamline HR operations and drive organizational success.
            </p>
            <div className="hero-actions">
              <Link to="/employees" className="btn btn-primary btn-lg">
                <RiUserAddLine />
                Manage Employees
              </Link>
              <Link to="/dashboard" className="btn-outline">
                <RiDashboardLine />
                View Dashboard
                <RiArrowRightLine />
              </Link>
            </div>
          </div>

          {/* Hero Illustration */}
          <div className="hero-illustration fade-in-right">
            <div className="hero-card-stack">
              <div className="floating-card card-1 float-slow">
                <div className="mini-card-icon">👥</div>
                <div>
                  <div className="mini-card-value">{employees.length}</div>
                  <div className="mini-card-label">Total Employees</div>
                </div>
              </div>
              <div className="floating-card card-2 float">
                <div className="mini-card-icon">✅</div>
                <div>
                  <div className="mini-card-value">{activeCount}</div>
                  <div className="mini-card-label">Active Today</div>
                </div>
              </div>
              <div className="floating-card card-3 float-slow">
                <div className="mini-card-icon">🏢</div>
                <div>
                  <div className="mini-card-value">{deptCount}</div>
                  <div className="mini-card-label">Departments</div>
                </div>
              </div>
              <div className="hero-office-scene">
                <svg viewBox="0 0 300 220" xmlns="http://www.w3.org/2000/svg" className="office-svg">
                  {/* Desk */}
                  <rect x="40" y="160" width="220" height="12" rx="4" fill="rgba(59,130,246,0.3)"/>
                  {/* Monitor */}
                  <rect x="110" y="110" width="80" height="55" rx="6" fill="rgba(30,41,59,0.8)"/>
                  <rect x="113" y="113" width="74" height="46" rx="4" fill="rgba(37,99,235,0.4)"/>
                  <text x="130" y="140" fontSize="12" fill="rgba(255,255,255,0.7)">EMS</text>
                  <rect x="143" y="165" width="14" height="10" rx="2" fill="rgba(30,41,59,0.6)"/>
                  <rect x="130" y="174" width="40" height="4" rx="2" fill="rgba(30,41,59,0.4)"/>
                  {/* Plant */}
                  <rect x="240" y="140" width="10" height="22" rx="2" fill="rgba(34,197,94,0.5)"/>
                  <ellipse cx="245" cy="135" rx="18" ry="14" fill="rgba(34,197,94,0.3)"/>
                  <ellipse cx="235" cy="130" rx="12" ry="10" fill="rgba(34,197,94,0.25)"/>
                  <ellipse cx="255" cy="128" rx="10" ry="9" fill="rgba(34,197,94,0.25)"/>
                  {/* Coffee */}
                  <rect x="60" y="148" width="22" height="16" rx="4" fill="rgba(99,102,241,0.6)"/>
                  <ellipse cx="71" cy="148" rx="9" ry="3" fill="rgba(255,255,255,0.2)"/>
                  {/* Papers */}
                  <rect x="55" y="155" width="30" height="8" rx="2" fill="rgba(255,255,255,0.1)" transform="rotate(-5 55 155)"/>
                  <rect x="58" y="153" width="30" height="8" rx="2" fill="rgba(255,255,255,0.08)" transform="rotate(-2 58 153)"/>
                  {/* Person silhouette */}
                  <circle cx="150" cy="90" r="22" fill="rgba(59,130,246,0.3)"/>
                  <rect x="130" y="110" width="40" height="55" rx="10" fill="rgba(37,99,235,0.25)"/>
                  {/* Stars decoration */}
                  <text x="30" y="60" fontSize="18" fill="rgba(255,255,255,0.2)">✦</text>
                  <text x="250" y="80" fontSize="14" fill="rgba(255,255,255,0.15)">✦</text>
                  <text x="80" y="30" fontSize="10" fill="rgba(255,255,255,0.2)">✧</text>
                  {/* Grid lines */}
                  <line x1="0" y1="200" x2="300" y2="200" stroke="rgba(59,130,246,0.1)" strokeWidth="1"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="stats-strip">
        <div className="container stats-grid">
          <StatCard icon={<RiTeamLine />} label="Total Employees" value={employees.length} color="var(--gradient-primary)" delay="0s" />
          <StatCard icon={<RiCheckLine />} label="Active Employees" value={activeCount} color="var(--gradient-success)" delay="0.1s" />
          <StatCard icon={<RiDashboardLine />} label="Departments" value={deptCount} color="var(--gradient-accent)" delay="0.2s" />
          <StatCard icon={<RiBarChartLine />} label="Monthly Payroll (₹)" value={totalPayroll} color="var(--gradient-secondary)" delay="0.3s" />
        </div>
      </section>

      {/* Features */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Everything You Need to <span className="gradient-text">Manage Your Team</span></h2>
            <p className="section-subtitle">Powerful features designed for modern HR teams</p>
          </div>
          <div className="features-grid">
            {features.map((f, i) => (
              <div key={i} className="feature-card card fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="feature-icon" style={{ background: f.color }}>
                  {f.icon}
                </div>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Employees */}
      <section className="recent-section">
        <div className="container">
          <div className="section-header-row">
            <div>
              <h2 className="section-title">Recent <span className="gradient-text">Employees</span></h2>
              <p className="section-subtitle">Latest additions to your workforce</p>
            </div>
            <Link to="/employees" className="btn btn-primary">
              View All <RiArrowRightLine />
            </Link>
          </div>
          <div className="card table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>ID</th>
                  <th>Department</th>
                  <th>Designation</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentEmployees.map((emp) => (
                  <tr key={emp.id}>
                    <td>
                      <div className="emp-name-cell">
                        <div className="emp-avatar" style={{ background: `hsl(${emp.name.charCodeAt(0) * 5}, 60%, 55%)` }}>
                          {emp.name.charAt(0)}
                        </div>
                        <div>
                          <div className="emp-name">{emp.name}</div>
                          <div className="emp-email">{emp.email}</div>
                        </div>
                      </div>
                    </td>
                    <td><code className="emp-id-badge">{emp.employeeId}</code></td>
                    <td><span className="dept-badge">{emp.department}</span></td>
                    <td className="emp-desig">{emp.designation}</td>
                    <td>
                      <span className={`badge ${emp.status === 'Active' ? 'badge-success' : 'badge-danger'}`}>
                        {emp.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-card glass">
            <div className="cta-content">
              <h2 className="cta-title">Ready to manage your team?</h2>
              <p className="cta-desc">Add employees, track performance, and streamline HR operations all in one place.</p>
              <div className="cta-actions">
                <Link to="/employees" className="btn btn-primary btn-lg">
                  <RiUserAddLine /> Add New Employee
                </Link>
                <Link to="/dashboard" className="btn btn-secondary btn-lg">
                  <RiBarChartLine /> View Analytics
                </Link>
              </div>
            </div>
            <div className="cta-decoration">
              <div className="cta-blob"></div>
              <span className="cta-emoji">🚀</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
