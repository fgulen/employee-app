

export default function About() {
  return (
    <div>

      <div className="about-bg">
        <div className="about-container">
          <h2>About EmployeeApp</h2>
          <p>This is a modern employee management application with secure login, user management, and PostgreSQL backend.</p>
        </div>
      </div>
      <style>{`
        .about-bg {
          min-height: 100vh;
          background: #f4f4f4;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        body.dark-mode .about-bg {
          background: #181818;
        }
        .about-container {
          max-width: 600px;
          margin: 40px auto 0 auto;
          padding: 32px 24px;
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 2px 16px rgba(0,0,0,0.08);
        }
        body.dark-mode .about-container {
          background: #222;
          color: #eee;
        }
        h2 {
          color: #2d3748;
        }
        body.dark-mode h2 {
          color: #eee;
        }
        p {
          color: #444;
        }
        body.dark-mode p {
          color: #bbb;
        }
      `}</style>
    </div>
  );
}
