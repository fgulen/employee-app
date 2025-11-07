

export default function Dashboard({ onLogout }: any) {
  return (
    <div>
      <div className="dashboard-bg-simple">
        <div className="dashboard-container">
          <h2 className="dashboard-title">Dashboard</h2>
          <p className="dashboard-welcome">Welcome to the Employee App</p>
          <nav className="dashboard-nav">
            <a className="dashboard-link" href="/employees">Employees</a>
          </nav>
          <div style={{ marginTop: 24, textAlign: 'center' }}>
            <button className="dashboard-logout" onClick={onLogout}>Logout</button>
          </div>
        </div>
      </div>
      <style>{`
        .dashboard-bg-simple {
          min-height: 100vh;
          background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }
        body.dark-mode .dashboard-bg-simple { background: linear-gradient(180deg, rgba(0,0,0,0.35), rgba(0,0,0,0.45)); }
        .dashboard-container {
          background: rgba(255,255,255,0.96);
          border-radius: 14px;
          box-shadow: 0 8px 30px rgba(2,6,23,0.08);
          padding: 36px 28px;
          max-width: 640px;
          width: 100%;
        }
        body.dark-mode .dashboard-container { background: rgba(10,12,16,0.72); color: #e6eef8; }
        .dashboard-title {
          color: #0f172a;
          font-size: 1.8rem;
          font-weight: 700;
          text-align: left;
          margin-bottom: 8px;
        }
        .dashboard-welcome { text-align: left; color: #475569; margin-bottom: 18px; }
        body.dark-mode .dashboard-welcome { color: #bfcddf; }
        .dashboard-nav { display:flex; gap:12px; margin-bottom: 18px; }
        .dashboard-link { color: #2563eb; text-decoration: none; font-size: 16px; font-weight:600; }
        .dashboard-link:hover { text-decoration: underline; }
        .dashboard-logout { background: #ef4444; color:#fff; border:none; border-radius:8px; padding:8px 18px; cursor:pointer; }
      `}</style>
    </div>
  );
}
