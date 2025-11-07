import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

type NavbarProps = { loggedIn?: boolean; username?: string; onLogout?: () => void };

export default function Navbar({ loggedIn = false, username, onLogout }: NavbarProps) {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      return localStorage.getItem('darkMode') === 'true';
    } catch (e) {
      return false;
    }
  });

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
    try {
      localStorage.setItem('darkMode', darkMode ? 'true' : 'false');
    } catch (e) {
      // ignore storage errors (e.g., Safari private mode)
    }
  }, [darkMode]);

  return (
    <header className={`navbar ${darkMode ? 'navbar-dark' : ''}`}>
      <div className="navbar-inner">
        <div className="navbar-left">
          <Link className="navbar-logo" to="/">Employee App</Link>
          <nav className="navbar-links">
            <Link className="navbar-link" to="/dashboard">Dashboard</Link>
            <Link className="navbar-link" to="/employees">Employees</Link>
            <Link className="navbar-link" to="/manage-users">Manage Users</Link>
            <Link className="navbar-link" to="/about">About</Link>
            {!loggedIn && <Link className="navbar-link" to="/register">Register</Link>}
          </nav>
        </div>

        <div className="navbar-right">
          {loggedIn && (
            <span className="navbar-user" title={username ?? 'User'}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="avatar-svg" aria-hidden>
                <circle cx="12" cy="8" r="3.2" fill="#c7d2fe" />
                <path d="M4 20c0-3.3137 2.6863-6 6-6h4c3.3137 0 6 2.6863 6 6" stroke="#93c5fd" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="navbar-username-text">{username ?? 'User'}</span>
            </span>
          )}
          <button
            className="navbar-dark-toggle btn"
            aria-pressed={darkMode}
            aria-label={darkMode ? 'Switch to light theme' : 'Switch to dark theme'}
            onClick={() => setDarkMode((d) => !d)}
          >
            {darkMode ? 'Light' : 'Dark'}
          </button>
          {loggedIn ? (
            <button className="navbar-logout btn" onClick={() => onLogout?.()}>Logout</button>
          ) : null}
        </div>
      </div>
    </header>
  );
}
