import React from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard({ onLogout }: any) {
  return (
    <div className="dashboard-bg">
      <div className="dashboard-container">
        <h1 className="dashboard-title">Dashboard</h1>
        <p className="dashboard-welcome">Welcome to the Employee App</p>
        <nav className="dashboard-nav">
          <Link className="dashboard-link" to="/employees">Employees</Link>
        </nav>
        <div style={{ marginTop: 24, textAlign: 'center' }}>
          <button className="dashboard-logout" onClick={onLogout}>Logout</button>
        </div>
      </div>
      <style>{`
        .dashboard-bg {
          min-height: 100vh;
          background: linear-gradient(120deg, #f7fafc 0%, #e2e8f0 100%);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .dashboard-container {
          background: #fff;
          border-radius: 18px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.08);
          padding: 48px 36px;
          max-width: 440px;
          width: 100%;
        }
        .dashboard-title {
          color: #2d3748;
          font-size: 2.3rem;
          font-weight: 700;
          text-align: center;
          margin-bottom: 14px;
          letter-spacing: 1px;
        }
        .dashboard-welcome {
          color: #4a5568;
          font-size: 1.15rem;
          text-align: center;
          margin-bottom: 28px;
        }
        .dashboard-nav {
          display: flex;
          justify-content: center;
          margin-bottom: 28px;
        }
        .dashboard-link {
          color: #3182ce;
          background: #f7fafc;
          border: 2px solid #3182ce;
          border-radius: 8px;
          padding: 10px 24px;
          font-size: 1.05rem;
          text-decoration: none;
          font-weight: 500;
          transition: background 0.2s, color 0.2s;
        }
        .dashboard-link:hover {
          background: #3182ce;
          color: #fff;
        }
        .dashboard-logout {
          padding: 12px 36px;
          background: #2d3748;
          color: #fff;
          border: none;
          border-radius: 8px;
          font-size: 1.05rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }
        .dashboard-logout:hover {
          background: #4a5568;
        }
      `}</style>
    </div>
  );
}
