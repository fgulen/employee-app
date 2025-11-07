

export default function About() {
  return (
    <div className="container">
      <div className="about-content">
        <h2>About EmployeeApp</h2>
        <p>This is a modern employee management application with secure login, user management, and database backend.</p>
        <p>Built with React, TypeScript, Spring Boot, and modern web technologies.</p>
        <div className="features">
          <h3>Features:</h3>
          <ul>
            <li>🔐 Secure JWT Authentication</li>
            <li>👥 User Management</li>
            <li>👨‍💼 Employee Management</li>
            <li>📊 Dashboard Analytics</li>
            <li>🌙 Dark Mode Support</li>
            <li>📱 Responsive Design</li>
          </ul>
        </div>
      </div>
      <style>{`
        .about-content {
          max-width: 800px;
          margin: 40px auto;
          padding: 32px 24px;
          background: var(--card-bg);
          border-radius: 12px;
          box-shadow: 0 2px 16px rgba(0,0,0,0.08);
          border: 1px solid var(--border);
        }
        .about-content h2 {
          color: var(--text);
          margin-top: 0;
          font-size: 28px;
          margin-bottom: 16px;
        }
        .about-content p {
          color: var(--muted);
          line-height: 1.6;
          font-size: 16px;
        }
        .features {
          margin-top: 24px;
        }
        .features h3 {
          color: var(--text);
          font-size: 20px;
          margin-bottom: 12px;
        }
        .features ul {
          list-style: none;
          padding: 0;
        }
        .features li {
          color: var(--text);
          padding: 8px 0;
          font-size: 16px;
        }
      `}</style>
    </div>
  );
}
