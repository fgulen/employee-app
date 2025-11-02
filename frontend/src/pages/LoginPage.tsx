import React, { useState } from 'react';
import api from '../services/api';
import { setToken } from '../services/auth';

export default function LoginPage({ onLogin }: { onLogin?: (token: string) => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr('');
    setLoading(true);
    try {
      const res = await api.post('/auth/login', { username, password });
      const token = res.data.token;
      setToken(token);
      if (onLogin) onLogin(token);
    } catch (err: any) {
      setErr(err?.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-bg">
      <div className="login-container">
        <h2 className="login-title">Login</h2>
        <form className="login-form" onSubmit={handle}>
          <input
            className="login-input"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            autoFocus
          />
          <input
            className="login-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button className="login-btn" type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
          {err && <p className="login-error">{err}</p>}
        </form>
        <p className="login-tip">Default admin credentials:<br /><b>Username:</b> admin<br /><b>Password:</b> admin</p>
      </div>
      <style>{`
        .login-bg {
          min-height: 100vh;
          background: linear-gradient(120deg, #90cdf4 0%, #f7fafc 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .login-container {
          max-width: 400px;
          margin: 0 auto;
          padding: 32px 24px;
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 2px 16px rgba(0,0,0,0.08);
        }
        .login-title {
          text-align: center;
          margin-bottom: 24px;
          color: #2d3748;
        }
        .login-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .login-input {
          padding: 10px 12px;
          border: 1px solid #cbd5e0;
          border-radius: 6px;
          font-size: 16px;
          outline: none;
          transition: border-color 0.2s;
        }
        .login-input:focus {
          border-color: #3182ce;
        }
        .login-btn {
          padding: 10px 0;
          background: #3182ce;
          color: #fff;
          border: none;
          border-radius: 6px;
          font-size: 16px;
          cursor: pointer;
          transition: background 0.2s;
        }
        .login-btn:disabled {
          background: #90cdf4;
          cursor: not-allowed;
        }
        .signup-btn {
          padding: 10px 0;
          background: #38a169;
          color: #fff;
          border: none;
          border-radius: 6px;
          font-size: 16px;
          cursor: pointer;
          margin-top: 4px;
          transition: background 0.2s;
        }
        .signup-btn:hover {
          background: #2f855a;
        }
        .login-error {
          color: #e53e3e;
          text-align: center;
          margin-top: 8px;
        }
        .login-tip {
          margin-top: 24px;
          font-size: 13px;
          color: #718096;
          text-align: center;
        }
      `}</style>
      {/* HTML for test automation team */}
      <div style={{ display: 'none' }}>
        <div id="test-html">
          <h3>Test Automation HTML</h3>
          <form>
            <input type="text" name="test-username" placeholder="Test Username" />
            <input type="password" name="test-password" placeholder="Test Password" />
            <button type="submit">Test Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}
