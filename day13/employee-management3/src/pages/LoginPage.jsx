import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { RiEyeLine, RiEyeOffLine, RiLockLine, RiUserLine, RiShieldCheckLine } from 'react-icons/ri';
import { useApp } from '../context/AppContext';
import { toast } from 'react-toastify';
import './LoginPage.css';

const VALID_CREDENTIALS = { username: 'admin', password: 'admin123' };

const LoginPage = () => {
  const { login, currentUser } = useApp();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isHuman, setIsHuman] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const rippleRef = useRef(null);

  // If already logged in, redirect
  React.useEffect(() => {
    if (currentUser) navigate('/home', { replace: true });
  }, [currentUser, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.username.trim()) errs.username = 'Username is required';
    if (!formData.password) errs.password = 'Password is required';
    if (!isHuman) errs.human = 'Please verify you are human';
    return errs;
  };

  const handleRipple = (e) => {
    const btn = e.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(btn.clientWidth, btn.clientHeight);
    const radius = diameter / 2;
    const rect = btn.getBoundingClientRect();
    circle.style.width = circle.style.height = diameter + 'px';
    circle.style.left = e.clientX - rect.left - radius + 'px';
    circle.style.top = e.clientY - rect.top - radius + 'px';
    circle.classList.add('ripple-effect');
    const old = btn.querySelector('.ripple-effect');
    if (old) old.remove();
    btn.appendChild(circle);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    handleRipple(e);
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));

    if (
      formData.username === VALID_CREDENTIALS.username &&
      formData.password === VALID_CREDENTIALS.password
    ) {
      login({ username: formData.username, loginTime: Date.now() });
      toast.success('Welcome back, Admin! 🎉');
      navigate('/home');
    } else {
      setLoading(false);
      setErrors({ form: 'Invalid username or password. Try admin / admin123' });
      toast.error('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="login-page">
      {/* Animated Background */}
      <div className="login-bg">
        <div className="bg-gradient"></div>
        {/* Floating blobs */}
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
        {/* Floating grid */}
        <div className="bg-grid"></div>
        {/* Cute office animals SVG illustration */}
        <div className="animals-scene">
          {/* Cat with laptop */}
          <div className="animal cat-work float-slow">
            <svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg">
              {/* Laptop */}
              <rect x="10" y="65" width="70" height="4" rx="2" fill="#334155" opacity="0.8"/>
              <rect x="20" y="40" width="50" height="30" rx="3" fill="#1e293b" opacity="0.9"/>
              <rect x="22" y="42" width="46" height="26" rx="2" fill="#0f172a"/>
              {/* Screen glow */}
              <rect x="22" y="42" width="46" height="26" rx="2" fill="url(#screenGrad)" opacity="0.7"/>
              {/* Cat body */}
              <ellipse cx="45" cy="38" rx="18" ry="14" fill="#f97316" opacity="0.9"/>
              {/* Cat head */}
              <circle cx="45" cy="22" r="13" fill="#f97316"/>
              {/* Cat ears */}
              <polygon points="34,13 38,6 42,13" fill="#f97316"/>
              <polygon points="36,13 38,8 41,13" fill="#fda4af"/>
              <polygon points="48,13 52,6 56,13" fill="#f97316"/>
              <polygon points="49,13 52,8 55,13" fill="#fda4af"/>
              {/* Eyes */}
              <circle cx="40" cy="21" r="3" fill="#1e293b"/>
              <circle cx="50" cy="21" r="3" fill="#1e293b"/>
              <circle cx="41" cy="20" r="1" fill="white"/>
              <circle cx="51" cy="20" r="1" fill="white"/>
              {/* Nose */}
              <ellipse cx="45" cy="25" rx="2" ry="1.5" fill="#fda4af"/>
              {/* Smile */}
              <path d="M42 27 Q45 30 48 27" stroke="#1e293b" strokeWidth="1" fill="none"/>
              {/* Whiskers */}
              <line x1="32" y1="24" x2="40" y2="25" stroke="#1e293b" strokeWidth="0.8" opacity="0.6"/>
              <line x1="32" y1="26" x2="40" y2="26" stroke="#1e293b" strokeWidth="0.8" opacity="0.6"/>
              <line x1="50" y1="25" x2="58" y2="24" stroke="#1e293b" strokeWidth="0.8" opacity="0.6"/>
              <line x1="50" y1="26" x2="58" y2="26" stroke="#1e293b" strokeWidth="0.8" opacity="0.6"/>
              {/* Paws on keyboard */}
              <ellipse cx="35" cy="65" rx="8" ry="5" fill="#f97316"/>
              <ellipse cx="55" cy="65" rx="8" ry="5" fill="#f97316"/>
              {/* Coffee mug */}
              <rect x="78" y="55" width="16" height="14" rx="3" fill="#6366f1"/>
              <path d="M94 60 Q100 60 100 65 Q100 70 94 70" stroke="#6366f1" strokeWidth="2" fill="none"/>
              <text x="80" y="66" fontSize="8" fill="white">☕</text>
              <defs>
                <linearGradient id="screenGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#3B82F6"/>
                  <stop offset="100%" stopColor="#06B6D4"/>
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Panda with laptop */}
          <div className="animal panda-work float">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              {/* Body */}
              <ellipse cx="50" cy="72" rx="22" ry="18" fill="white" opacity="0.95"/>
              {/* Head */}
              <circle cx="50" cy="45" r="20" fill="white" opacity="0.95"/>
              {/* Eye patches */}
              <ellipse cx="41" cy="41" rx="8" ry="7" fill="#1e293b"/>
              <ellipse cx="59" cy="41" rx="8" ry="7" fill="#1e293b"/>
              {/* Eyes */}
              <circle cx="41" cy="41" r="4" fill="white"/>
              <circle cx="59" cy="41" r="4" fill="white"/>
              <circle cx="42" cy="41" r="2.5" fill="#1e293b"/>
              <circle cx="60" cy="41" r="2.5" fill="#1e293b"/>
              <circle cx="43" cy="40" r="0.8" fill="white"/>
              <circle cx="61" cy="40" r="0.8" fill="white"/>
              {/* Ears */}
              <circle cx="33" cy="28" r="8" fill="#1e293b"/>
              <circle cx="67" cy="28" r="8" fill="#1e293b"/>
              {/* Nose */}
              <ellipse cx="50" cy="50" rx="5" ry="3" fill="#fda4af"/>
              {/* Smile */}
              <path d="M45 53 Q50 57 55 53" stroke="#1e293b" strokeWidth="1.2" fill="none"/>
              {/* Cheeks */}
              <circle cx="36" cy="51" r="5" fill="#fda4af" opacity="0.5"/>
              <circle cx="64" cy="51" r="5" fill="#fda4af" opacity="0.5"/>
              {/* Laptop */}
              <rect x="28" y="82" width="44" height="5" rx="2" fill="#334155" opacity="0.7"/>
              <rect x="32" y="65" width="36" height="22" rx="2" fill="#1e293b"/>
              <rect x="33" y="66" width="34" height="18" rx="1" fill="#0f172a"/>
              <text x="42" y="78" fontSize="10" fill="#22C55E">{'</>'}</text>
            </svg>
          </div>

          {/* Rabbit with computer */}
          <div className="animal rabbit-work float-slow">
            <svg viewBox="0 0 100 110" xmlns="http://www.w3.org/2000/svg">
              {/* Monitor */}
              <rect x="10" y="55" width="65" height="45" rx="4" fill="#1e293b"/>
              <rect x="13" y="58" width="59" height="36" rx="2" fill="#0f172a"/>
              {/* Screen content */}
              <rect x="15" y="60" width="30" height="3" rx="1" fill="#3B82F6" opacity="0.6"/>
              <rect x="15" y="65" width="40" height="2" rx="1" fill="#06B6D4" opacity="0.4"/>
              <rect x="15" y="69" width="35" height="2" rx="1" fill="#06B6D4" opacity="0.4"/>
              <rect x="15" y="73" width="25" height="2" rx="1" fill="#22C55E" opacity="0.5"/>
              {/* Stand */}
              <rect x="36" y="100" width="14" height="6" rx="2" fill="#334155"/>
              <rect x="28" y="105" width="30" height="4" rx="2" fill="#334155"/>
              {/* Rabbit body */}
              <ellipse cx="50" cy="52" rx="18" ry="15" fill="#e2e8f0"/>
              {/* Head */}
              <circle cx="50" cy="32" r="16" fill="#e2e8f0"/>
              {/* Ears */}
              <ellipse cx="40" cy="13" rx="5" ry="13" fill="#e2e8f0"/>
              <ellipse cx="40" cy="13" rx="3" ry="10" fill="#fda4af"/>
              <ellipse cx="60" cy="13" rx="5" ry="13" fill="#e2e8f0"/>
              <ellipse cx="60" cy="13" rx="3" ry="10" fill="#fda4af"/>
              {/* Eyes */}
              <circle cx="44" cy="30" r="3" fill="#1e293b"/>
              <circle cx="56" cy="30" r="3" fill="#1e293b"/>
              <circle cx="45" cy="29" r="1" fill="white"/>
              <circle cx="57" cy="29" r="1" fill="white"/>
              {/* Nose */}
              <ellipse cx="50" cy="36" rx="3" ry="2" fill="#fda4af"/>
              {/* Cheeks */}
              <circle cx="40" cy="36" r="4" fill="#fda4af" opacity="0.4"/>
              <circle cx="60" cy="36" r="4" fill="#fda4af" opacity="0.4"/>
            </svg>
          </div>

          {/* Floating clouds */}
          <div className="cloud cloud-1 float">
            <svg viewBox="0 0 120 60" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="60" cy="40" rx="50" ry="20" fill="white" opacity="0.15"/>
              <ellipse cx="40" cy="35" rx="30" ry="18" fill="white" opacity="0.15"/>
              <ellipse cx="80" cy="35" rx="28" ry="16" fill="white" opacity="0.15"/>
              <ellipse cx="60" cy="28" rx="22" ry="16" fill="white" opacity="0.15"/>
            </svg>
          </div>
          <div className="cloud cloud-2 float-slow">
            <svg viewBox="0 0 100 50" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="50" cy="35" rx="40" ry="15" fill="white" opacity="0.1"/>
              <ellipse cx="35" cy="28" rx="22" ry="14" fill="white" opacity="0.1"/>
              <ellipse cx="65" cy="28" rx="20" ry="13" fill="white" opacity="0.1"/>
              <ellipse cx="50" cy="22" rx="18" ry="12" fill="white" opacity="0.1"/>
            </svg>
          </div>

          {/* Floating stars */}
          <div className="star star-1">✦</div>
          <div className="star star-2">✦</div>
          <div className="star star-3">✧</div>
          <div className="star star-4">⭐</div>
          <div className="star star-5">✦</div>

          {/* Floating elements */}
          <div className="float-item item-1">💡</div>
          <div className="float-item item-2">📊</div>
          <div className="float-item item-3">🚀</div>
          <div className="float-item item-4">💼</div>
          <div className="float-item item-5">🤖</div>
        </div>
      </div>

      {/* Login Card */}
      <div className="login-card-wrapper">
        <div className="login-card glass fade-in-up">
          {/* Header */}
          <div className="login-header">
            <div className="login-logo">
              <div className="login-logo-icon">⚡</div>
            </div>
            <h1 className="login-company">Employee Management System</h1>
            <p className="login-welcome">Welcome Back 👋</p>
            <p className="login-subtitle">Sign in to your account to continue</p>
          </div>

          {/* Form Error */}
          {errors.form && (
            <div className="form-alert-error">
              ⚠️ {errors.form}
            </div>
          )}

          {/* Form */}
          <form className="login-form" onSubmit={handleLogin} noValidate>
            {/* Username */}
            <div className="form-group">
              <label className="form-label" htmlFor="login-username">Username</label>
              <div className="input-wrapper">
                <RiUserLine className="input-icon" />
                <input
                  id="login-username"
                  type="text"
                  name="username"
                  className={`form-control input-with-icon ${errors.username ? 'error' : ''}`}
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={handleChange}
                  autoComplete="username"
                />
              </div>
              {errors.username && <span className="form-error">{errors.username}</span>}
            </div>

            {/* Password */}
            <div className="form-group">
              <label className="form-label" htmlFor="login-password">Password</label>
              <div className="input-wrapper">
                <RiLockLine className="input-icon" />
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  className={`form-control input-with-icon input-with-toggle ${errors.password ? 'error' : ''}`}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <RiEyeOffLine /> : <RiEyeLine />}
                </button>
              </div>
              {errors.password && <span className="form-error">{errors.password}</span>}
            </div>

            {/* Remember Me + Forgot */}
            <div className="login-row">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  id="remember-me"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span className="custom-checkbox"></span>
                <span>Remember Me</span>
              </label>
              <button
                type="button"
                className="forgot-btn"
                onClick={() => setShowForgot(true)}
              >
                Forgot Password?
              </button>
            </div>

            {/* Human Verification */}
            <div className={`human-verify ${isHuman ? 'verified' : ''} ${errors.human ? 'error' : ''}`}>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  id="human-verify"
                  checked={isHuman}
                  onChange={(e) => {
                    setIsHuman(e.target.checked);
                    if (errors.human) setErrors((prev) => ({ ...prev, human: '' }));
                  }}
                />
                <span className="custom-checkbox"></span>
                <span className="human-text">I am a Human</span>
              </label>
              {isHuman && (
                <div className="verified-badge">
                  <RiShieldCheckLine />
                  <span>Verified</span>
                </div>
              )}
            </div>
            {errors.human && <span className="form-error">{errors.human}</span>}

            {/* Login Button */}
            <button
              id="login-btn"
              type="submit"
              className={`login-btn ${loading ? 'loading' : ''}`}
              disabled={loading || !isHuman}
              ref={rippleRef}
            >
              {loading ? (
                <>
                  <span className="btn-spinner"></span>
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <RiShieldCheckLine />
                  <span>Login to Dashboard</span>
                </>
              )}
            </button>

            {/* AI Auth tagline */}
            <div className="ai-tagline">
              <span className="ai-icon">🤖</span>
              <span>Secure Login Powered by Smart AI Authentication</span>
            </div>
          </form>

          {/* Terms */}
          <div className="login-legal">
            <button type="button" className="legal-link" onClick={() => setShowTerms(true)}>Terms of Use</button>
            <span className="legal-divider">·</span>
            <button type="button" className="legal-link" onClick={() => setShowPrivacy(true)}>Privacy Policy</button>
          </div>

          {/* Footer info */}
          <div className="login-footer">
            <a href="mailto:kbdnithish07@gmail.com" className="footer-link">kbdnithish07@gmail.com</a>
            <span className="legal-divider">·</span>
            <a href="tel:9566103705" className="footer-link">9566103705</a>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgot && (
        <div className="modal-overlay" onClick={() => setShowForgot(false)}>
          <div className="modal-content login-modal scale-in" onClick={(e) => e.stopPropagation()}>
            <h3>🔑 Forgot Password</h3>
            <p>For this demo, use the default credentials:</p>
            <div className="cred-box">
              <div><strong>Username:</strong> admin</div>
              <div><strong>Password:</strong> admin123</div>
            </div>
            <button className="btn btn-primary" onClick={() => setShowForgot(false)}>Got it!</button>
          </div>
        </div>
      )}

      {/* Terms Modal */}
      {showTerms && (
        <div className="modal-overlay" onClick={() => setShowTerms(false)}>
          <div className="modal-content login-modal scale-in" onClick={(e) => e.stopPropagation()}>
            <h3>📄 Terms of Use</h3>
            <p>By accessing and using the Employee Management System, you agree to use this platform solely for authorized workforce management purposes. Unauthorized access, data tampering, or misuse of employee information is strictly prohibited. All data is processed in accordance with applicable data protection laws.</p>
            <button className="btn btn-primary" onClick={() => setShowTerms(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Privacy Modal */}
      {showPrivacy && (
        <div className="modal-overlay" onClick={() => setShowPrivacy(false)}>
          <div className="modal-content login-modal scale-in" onClick={(e) => e.stopPropagation()}>
            <h3>🔒 Privacy Policy</h3>
            <p>We take your privacy seriously. Employee data stored in this system is encrypted and processed locally. We do not share personal data with third parties. Data is retained only as long as necessary for operational purposes. You have the right to access, correct, or delete your information at any time.</p>
            <button className="btn btn-primary" onClick={() => setShowPrivacy(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
