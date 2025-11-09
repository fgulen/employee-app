import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Home.css';

const Home: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Employee Management System</h1>
        <p className="hero-description">
          A full-stack application with React + TypeScript frontend, Spring Boot REST API,
          JWT authentication, role-based access control, and comprehensive CRUD operations.
        </p>
        
        <div className="hero-actions">
          {isAuthenticated ? (
            <Link to="/employees" className="hero-button primary">
              View Employees
            </Link>
          ) : (
            <>
              <Link to="/login" className="hero-button primary">
                Login
              </Link>
              <Link to="/register" className="hero-button secondary">
                Register
              </Link>
            </>
          )}
        </div>
      </div>

      <div className="features-section">
        <h2>Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>🔐 JWT Authentication</h3>
            <p>Secure authentication with JSON Web Tokens</p>
          </div>
          <div className="feature-card">
            <h3>👥 Role-Based Access</h3>
            <p>Admin and User roles with different permissions</p>
          </div>
          <div className="feature-card">
            <h3>✏️ CRUD Operations</h3>
            <p>Complete Create, Read, Update, Delete functionality</p>
          </div>
          <div className="feature-card">
            <h3>📚 Swagger Documentation</h3>
            <p>Interactive API documentation at /swagger-ui.html</p>
          </div>
          <div className="feature-card">
            <h3>⚡ Modern Stack</h3>
            <p>React + TypeScript, Spring Boot, PostgreSQL/H2</p>
          </div>
          <div className="feature-card">
            <h3>🚀 Production Ready</h3>
            <p>Configured for deployment with environment variables</p>
          </div>
        </div>
      </div>

      <div className="info-section">
        <h2>API Documentation</h2>
        <p>
          Access the interactive Swagger API documentation at:{' '}
          <a href="http://localhost:8080/swagger-ui.html" target="_blank" rel="noopener noreferrer">
            http://localhost:8080/swagger-ui.html
          </a>
        </p>
      </div>
    </div>
  );
};

export default Home;
