import React, { useState } from 'react';
import api from '../services/api';
import { setToken } from '../services/auth';
import { Link } from 'react-router-dom';

export default function Register({ onLogin }: { onLogin?: (token: string, user?: string) => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [err, setErr] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr('');
    setSuccess('');
    setLoading(true);
    // Client-side validation
    if (!username || !password || !confirmPassword || !email) {
      setErr('Please fill out all fields.');
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      setErr('Passwords do not match.');
      setLoading(false);
      return;
    }
    // basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErr('Please enter a valid email address.');
      setLoading(false);
      return;
    }
    try {
      await api.post('/auth/register', { username, password, email });
      setSuccess('Registration successful! Logging you in...');
      // Attempt to login immediately
      const loginRes = await api.post('/auth/login', { username, password });
      const token = loginRes.data.token;
      // persist token locally so reloads and other components use it
      setToken(token);
      if (onLogin) onLogin(token, username);
      setUsername('');
      setPassword('');
      setConfirmPassword('');
      setEmail('');
    } catch (err: any) {
      setErr(err?.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="register-bg">
        <div className="register-container register-card">
          <h2 className="register-title">Register</h2>
          <form className="register-form" onSubmit={handle}>
            <input
              className="register-input"
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              autoFocus
            />
            <input
              className="register-input"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <input
              className="register-input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <input
              className="register-input"
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />
            <button className="register-btn" type="submit" disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </button>
            {err && <p className="register-error">{err}</p>}
            {success && <p className="register-success">{success}</p>}
          </form>
          <p style={{ textAlign: 'center', marginTop: 12 }}>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
      <style>{`
        .register-bg {
          min-height: 100vh;
          background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }
        body.dark-mode .register-bg {
          background: linear-gradient(180deg, rgba(0,0,0,0.35), rgba(0,0,0,0.45));
        }
        .register-container {
          max-width: 420px;
          margin: 0 auto;
          padding: 0; /* handled by register-card */
          width: 100%;
        }
        .register-card {
          padding: 28px 22px;
          background: rgba(255,255,255,0.92);
          border-radius: 10px;
          border: 1px solid rgba(2,6,23,0.06);
          box-shadow: 0 8px 24px rgba(2,6,23,0.06);
        }
        body.dark-mode .register-card {
          background: rgba(10,12,16,0.65);
          border: 1px solid rgba(255,255,255,0.04);
          color: #e6eef8;
        }
        .register-title {
          text-align: center;
          margin-bottom: 18px;
          color: #17202a;
        }
        body.dark-mode .register-title {
          color: #e6eef8;
        }
        .register-form {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .register-input {
          padding: 10px 12px;
          border: 1px solid rgba(2,6,23,0.06);
          border-radius: 8px;
          font-size: 15px;
          outline: none;
          transition: border-color 0.15s, background 0.15s;
          background: rgba(255,255,255,0.98);
        }
        .register-input:focus {
          border-color: #60a5fa;
          box-shadow: 0 0 0 3px rgba(96,165,250,0.06);
        }
        body.dark-mode .register-input {
          background: rgba(255,255,255,0.03);
          color: #e6eef8;
          border: 1px solid rgba(255,255,255,0.04);
        }
        .register-btn {
          padding: 10px 0;
          background: linear-gradient(90deg,#2563eb,#1e40af);
          color: #fff;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          cursor: pointer;
          transition: transform 0.08s, box-shadow 0.12s;
        }
        .register-btn:active { transform: translateY(1px); }
        .register-btn:disabled {
          background: #90cdf4;
          cursor: not-allowed;
        }
        .register-error {
          color: #f87171;
          text-align: center;
          margin-top: 8px;
        }
        .register-success {
          color: #34d399;
          text-align: center;
          margin-top: 8px;
        }
      `}</style>
    </div>
  );
}
