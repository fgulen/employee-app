// src/App.tsx
import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import EmployeesPage from './pages/EmployeesPage';
import RegisterPage from './pages/Register';
import ManageUsers from './pages/ManageUsers';
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
    navigate('/dashboard');
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
      <Routes>
        <Route path="/login" element={<LoginPage onLogin={onLogin} />} />
        <Route path="/register" element={<RegisterPage onLogin={onLogin} />} />
        <Route path="/dashboard" element={authenticated ? <Dashboard onLogout={onLogout} username={username || ''} /> : <Navigate to="/login" />} />
        <Route path="/employees" element={authenticated ? <EmployeesPage username={username || ''} /> : <Navigate to="/login" />} />
        <Route path="/manage-users" element={authenticated ? <ManageUsers /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to={authenticated ? "/dashboard" : "/login"} />} />
      </Routes>
    </>
  );
}
