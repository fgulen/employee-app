
import React from 'react';

export default function About() {
  return (
    <div style={{ paddingLeft: 12, paddingRight: 12 }}>
      <div style={{ maxWidth: 1200, margin: '24px auto', width: '100%' }}>
        <h2>About Employee Management System</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px', marginTop: '24px' }}>
          {/* Left Column */}
          <div>
            <h3>Overview</h3>
            <p>
              Modern full-stack HR application built with React & Spring Boot. Manages employees, users, and organizational data with secure authentication and role-based access control.
            </p>
            
            <h3 style={{ marginTop: '24px' }}>Key Features</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li>✓ JWT-based authentication</li>
              <li>✓ Role-based access control</li>
              <li>✓ Employee lifecycle management</li>
              <li>✓ Interactive dashboard & analytics</li>
              <li>✓ Dark mode support</li>
              <li>✓ Real-time validation</li>
            </ul>
          </div>

          {/* Right Column */}
          <div>
            <h3>Tech Stack</h3>
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ marginBottom: '8px' }}>Frontend</h4>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px' }}>
                <li>React 18 + TypeScript</li>
                <li>React Router</li>
                <li>Axios</li>
              </ul>
            </div>
            
            <div>
              <h4 style={{ marginBottom: '8px' }}>Backend</h4>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px' }}>
                <li>Spring Boot 3.3.0</li>
                <li>Spring Security + JWT</li>
                <li>PostgreSQL/H2</li>
              </ul>
            </div>
          </div>
        </div>

        {/* API Section */}
        <div style={{ marginTop: '32px', padding: '20px', background: 'rgba(49, 130, 206, 0.08)', borderRadius: '8px', border: '1px solid var(--border)' }}>
          <h3 style={{ marginTop: 0 }}>API Documentation</h3>
          <p style={{ marginBottom: '12px' }}>Explore and test REST API endpoints with interactive Swagger UI:</p>
          <a 
            href="http://localhost:8081/swagger-ui/index.html" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              background: 'var(--accent)',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '6px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '14px'
            }}
          >
            📖 View API Documentation
          </a>
          <p style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '12px', marginBottom: '8px' }}>
            ℹ️ Backend server must be running on port 8081
          </p>
          <p style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '8px' }}>
            <strong>Note:</strong> Public endpoints (GET /api/employees, GET /api/users) accessible without authentication. 
            Protected endpoints require JWT token - login via Swagger with admin/admin, copy token, then click Authorize button.
          </p>
        </div>

        {/* Quick Info */}
        <div style={{ marginTop: '24px', padding: '16px', background: 'var(--card-bg)', borderRadius: '8px', border: '1px solid var(--border)' }}>
          <p style={{ fontSize: '13px', color: 'var(--muted)', margin: 0 }}>
            <strong>Default Admin:</strong> admin / admin | 
            <strong style={{ marginLeft: '16px' }}>Backend:</strong> http://localhost:8081 | 
            <strong style={{ marginLeft: '16px' }}>Frontend Dev:</strong> http://localhost:3000
          </p>
        </div>
      </div>
    </div>
  );
}