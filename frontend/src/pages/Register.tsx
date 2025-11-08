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
          background: #f6f8fb;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }
        body.dark-mode .register-bg {
          background: linear-gradient(180deg, #0a0e27 0%, #0f1735 100%);
        }
        .register-container {
          max-width: 420px;
          margin: 0 auto;
          padding: 0;
          width: 100%;
        }
        .register-card {
          padding: 28px 22px;
          background: #ffffff;
          border-radius: 10px;
          border: 1px solid rgba(2,6,23,0.08);
          box-shadow: 0 8px 24px rgba(2,6,23,0.1);
        }
        body.dark-mode .register-card {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
          color: #f0f4f8;
          box-shadow: 0 8px 24px rgba(0,0,0,0.3);
        }
        .register-title {
          text-align: center;
          margin-bottom: 18px;
          color: #0b1220;
          font-weight: 700;
        }
        body.dark-mode .register-title {
          color: #f0f4f8;
        }
        .register-form {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .register-input {
          padding: 10px 12px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 15px;
          outline: none;
          transition: border-color 0.15s, background 0.15s;
          background: #ffffff;
          color: #0b1220;
        }
        .register-input::placeholder {
          color: #6b7280;
        }
        .register-input:focus {
          border-color: #1e40af;
          box-shadow: 0 0 0 3px rgba(30, 64, 175, 0.1);
        }
        body.dark-mode .register-input {
          background: rgba(255,255,255,0.05);
          color: #f0f4f8;
          border: 1px solid rgba(255,255,255,0.12);
        }
        body.dark-mode .register-input::placeholder {
          color: #94a3b8;
        }
        body.dark-mode .register-input:focus {
          border-color: #60a5fa;
          box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.1);
        }
        .register-btn {
          padding: 10px 0;
          background: linear-gradient(90deg,#0284c7,#1e40af);
          color: #fff;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          cursor: pointer;
          font-weight: 600;
          transition: transform 0.08s, box-shadow 0.12s;
          box-shadow: 0 4px 12px rgba(2, 132, 199, 0.2);
        }
        .register-btn:hover {
          box-shadow: 0 6px 16px rgba(2, 132, 199, 0.3);
        }
        .register-btn:active { 
          transform: translateY(1px); 
        }
        .register-btn:disabled {
          background: #93c5fd;
          cursor: not-allowed;
          box-shadow: none;
        }
        .register-error {
          color: #dc2626;
          text-align: center;
          margin-top: 8px;
          font-weight: 500;
        }
        body.dark-mode .register-error {
          color: #fca5a5;
        }
        .register-success {
          color: #059669;
          text-align: center;
          margin-top: 8px;
          font-weight: 500;
        }
        body.dark-mode .register-success {
          color: #86efac;
        }
      `}</style>
    </div>
  );
}
