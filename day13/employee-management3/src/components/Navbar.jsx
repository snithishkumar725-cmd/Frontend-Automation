import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  RiDashboardLine, RiTeamLine, RiHomeLine, RiInformationLine,
  RiPhoneLine, RiLogoutBoxLine, RiMenuLine, RiCloseLine,
  RiSunLine, RiMoonLine, RiUserLine
} from 'react-icons/ri';
import { useApp } from '../context/AppContext';
import { toast } from 'react-toastify';
import './Navbar.css';

const navLinks = [
  { path: '/home', label: 'Home', icon: <RiHomeLine /> },
  { path: '/dashboard', label: 'Dashboard', icon: <RiDashboardLine /> },
  { path: '/employees', label: 'Employees', icon: <RiTeamLine /> },
  { path: '/about', label: 'About Us', icon: <RiInformationLine /> },
  { path: '/contact', label: 'Contact', icon: <RiPhoneLine /> },
];

const Navbar = () => {
  const { theme, toggleTheme, logout, currentUser, employees } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    toast.info('Logged out successfully. See you soon!', { icon: '👋' });
    navigate('/');
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/home" className="navbar-logo">
          <div className="logo-icon-wrap">
            <span className="logo-emoji">⚡</span>
          </div>
          <div className="logo-text">
            <span className="logo-title">EMS</span>
            <span className="logo-sub">Employee Management</span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <ul className="nav-links">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
              >
                <span className="nav-icon">{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Actions */}
        <div className="nav-actions">
          {/* Employee count badge */}
          <div className="emp-badge" title="Total Employees">
            <RiTeamLine />
            <span>{employees.length}</span>
          </div>

          {/* Theme Toggle */}
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <RiMoonLine /> : <RiSunLine />}
          </button>

          {/* User avatar */}
          <div className="user-avatar" title={currentUser?.username || 'Admin'}>
            <RiUserLine />
          </div>

          {/* Logout */}
          <button className="logout-btn" onClick={handleLogout} title="Logout">
            <RiLogoutBoxLine />
            <span>Logout</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <RiCloseLine /> : <RiMenuLine />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`mobile-nav-link ${location.pathname === link.path ? 'active' : ''}`}
          >
            <span className="nav-icon">{link.icon}</span>
            <span>{link.label}</span>
          </Link>
        ))}
        <button className="mobile-logout-btn" onClick={handleLogout}>
          <RiLogoutBoxLine />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
