import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserCircle2, ShieldAlert } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('employee');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login, user } = useAuth();

  // Redirect if already logged in
  if (user) {
    navigate(`/${user.role}-dashboard`, { replace: true });
    return null;
  }

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    
    if (!username || !password) {
      setError('Please fill in all fields.');
      return;
    }

    const success = login(username, password, role);
    if (success) {
      navigate(`/${role}-dashboard`, { replace: true });
    } else {
      setError('Invalid credentials or role selected.');
    }
  };

  return (
    <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
      <div className="card glass animate-fade-in" style={{ width: '100%', maxWidth: '400px', padding: '2.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
            <UserCircle2 size={64} color="var(--primary-color)" />
          </div>
          <h2>Welcome Back</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Login to access your portal</p>
        </div>

        {error && (
          <div className="badge badge-danger" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', padding: '0.75rem' }}>
            <ShieldAlert size={16} />
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">Portal Type</label>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                type="button"
                className={`btn ${role === 'employee' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ flex: 1 }}
                onClick={() => setRole('employee')}
              >
                Employee
              </button>
              <button
                type="button"
                className={`btn ${role === 'admin' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ flex: 1 }}
                onClick={() => setRole('admin')}
              >
                Admin
              </button>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={`Enter ${role} username`}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
            Login to Portal
          </button>
        </form>
        
        <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          <p><strong>Admin:</strong> admin / password123</p>
          <p><strong>Employee:</strong> emp1 / password123 (up to emp4)</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
