import React, { useState } from 'react';
import api from '../services/api';
import { setToken } from '../services/auth';
import { Link } from 'react-router-dom';


export default function LoginPage({ onLogin, authenticated, user }: { onLogin?: (token: string, user?: string) => void, authenticated?: boolean, user?: string }) {
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
      if (onLogin) onLogin(token, username);
    } catch (err: any) {
      setErr(err?.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-root">
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-text">
            <h1>Modern Test Automation Playground</h1>
            <p>Explore Playwright, Selenium, and Cypress. Use this site to manage test data and experiment with automation flows.</p>
          </div>
          <div className="hero-login-card">

            {authenticated ? (
              <>
                <h3>Welcome back</h3>
                <div className="welcome-box">
                  <div className="welcome-avatar">
                    <svg width="52" height="52" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="8" r="4" fill="#c7d2fe" />
                      <path d="M4 20c0-3.3137 2.6863-6 6-6h4c3.3137 0 6 2.6863 6 6" stroke="#93c5fd" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, marginBottom: 8 }}>{user}</div>
                    <div style={{ color: '#475569' }}>Welcome to the app, {user}!</div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <h3>Sign in</h3>
                <form className="login-form-card" onSubmit={handle}>
                  <input className="login-input" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} autoFocus />
                  <input className="login-input" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                  <button className="login-btn" type="submit" disabled={loading}>{loading ? 'Signing in...' : 'Sign in'}</button>
                  {err && <div className="login-error">{err}</div>}
                </form>
                <div className="login-links">Don't have an account? <Link to="/register">Register</Link></div>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="automation-section">
        <div className="automation-hero">This site is designed to be used for test automation practice and demos.</div>
        <div className="automation-cards">
          <div className="card">
            <h4>Playwright</h4>
            <p>Fast, reliable end-to-end testing for modern web apps. Use it for cross-browser automation and tracing.</p>
          </div>
          <div className="card">
            <h4>Selenium</h4>
            <p>Classic browser automation tool with a wide ecosystem. Good for legacy browser support and language bindings.</p>
          </div>
          <div className="card">
            <h4>Cypress</h4>
            <p>Developer-friendly testing with fast feedback loop and time-travel debugging for front-end tests.</p>
          </div>
        </div>
      </section>

      <style>{`
        /* Lighter, airier login page */
        .login-page-root { min-height: 100vh; background: #f6f8fb; color: #0f1724; }
        .hero { padding: 56px 20px; max-width: 1200px; margin: 0 auto; }
        .hero-inner { display: flex; gap: 36px; align-items: center; justify-content: space-between; }
        .hero-text { flex: 1; }
        .hero-text h1 { font-size: 2.2rem; margin: 0 0 8px 0; color: #0b1220; }
        .hero-text p { color: #334155; margin: 0; max-width: 640px; line-height: 1.5; }
        /* Prominent, light sign-in card */
        .hero-login-card { width: 380px; background: #ffffff; padding: 26px; border-radius: 14px; box-shadow: 0 10px 30px rgba(15,23,42,0.08); border: 1px solid rgba(15,23,42,0.04); }
        .hero-login-card h3 { margin: 0 0 12px 0; color: #0b1220; }
        .login-form-card { display: flex; flex-direction: column; gap: 12px; }
        .login-input { padding: 12px 14px; border-radius: 10px; border: 1px solid #e6eef8; background: #fbfdff; color: #0b1220; box-shadow: inset 0 1px 0 rgba(0,0,0,0.02); }
        .login-input::placeholder { color: #94a3b8; }
        .login-btn { padding: 12px; background: linear-gradient(90deg,#0ea5e9,#7c3aed); color: white; border: none; border-radius: 10px; cursor: pointer; font-weight: 600; box-shadow: 0 6px 18px rgba(124,58,237,0.18); }
        .login-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .login-error { color: #dc2626; margin-top: 8px; }
        .login-links { margin-top: 10px; font-size: 14px; color: #475569; }

        .automation-section { padding: 36px 20px 70px; max-width: 1200px; margin: 0 auto; }
        .automation-hero { margin-bottom: 18px; padding: 18px; background: #ffffff; border-radius: 10px; color: #0b1220; box-shadow: 0 6px 20px rgba(15,23,42,0.04); }
        .automation-cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 18px; }
        .card { background: #ffffff; padding: 18px; border-radius: 10px; box-shadow: 0 8px 26px rgba(15,23,42,0.04); border: 1px solid rgba(15,23,42,0.03); }
        .card h4 { margin: 0 0 8px 0; color: #0b1220; }
        .card p { margin: 0; color: #475569; font-size: 14px; }

        @media (max-width: 800px) {
          .hero-inner { flex-direction: column-reverse; align-items: stretch; }
          .hero-login-card { width: 100%; }
        }
      `}</style>
    </div>
  );
}
