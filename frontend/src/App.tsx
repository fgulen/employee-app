// src/App.tsx
import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import EmployeesPage from './pages/EmployeesPage';
import RegisterPage from './pages/Register';
import ManageUsers from './pages/ManageUsers';
import About from './pages/About';
import Navbar from './components/Navbar';

import { getToken } from './services/auth';
import api from './services/api';


export default function App() {
  const [authenticated, setAuthenticated] = useState(!!getToken());
  const [username, setUsername] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setAuthenticated(true);
    }
  }, []);

  const onLogin = (token: string, user?: string) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setAuthenticated(true);
    if (user) setUsername(user);
    // Do not navigate; stay on the same page after login per UX requirement
  };

  const onLogout = () => {
    delete api.defaults.headers.common['Authorization'];
    setAuthenticated(false);
    setUsername(null);
    navigate('/login');
  };

  return (
    <>
      <Navbar loggedIn={authenticated} username={username || undefined} onLogout={onLogout} />
      <main className="main-content">
        <Routes>
          <Route path="/login" element={<LoginPage onLogin={onLogin} authenticated={authenticated} user={username || ''} />} />
          <Route path="/" element={<LoginPage onLogin={onLogin} authenticated={authenticated} user={username || ''} />} />
          <Route path="/register" element={<RegisterPage onLogin={onLogin} />} />
          <Route path="/dashboard" element={authenticated ? <Dashboard onLogout={onLogout} username={username || ''} /> : <Navigate to="/login" />} />
          <Route path="/employees" element={authenticated ? <EmployeesPage username={username || ''} /> : <Navigate to="/login" />} />
          <Route path="/manage-users" element={authenticated ? <ManageUsers /> : <Navigate to="/login" />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Navigate to={authenticated ? "/dashboard" : "/login"} />} />
        </Routes>
      </main>
      <footer className="footer">
        <div className="footer-content">
          <div className="sliding-text">
            <span>a happy testing with A4DB team... a happy testing with A4DB team... a happy testing with A4DB team...</span>
          </div>
        </div>
      </footer>
    </>
  );
}
