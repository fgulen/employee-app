// src/App.tsx
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import EmployeesPage from './pages/EmployeesPage';

import { getToken, login } from './services/auth';
import api, { getEmployees, createEmployee } from './services/api';


export default function App() {
  const [authenticated, setAuthenticated] = useState(!!getToken());
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setAuthenticated(true);
    }
  }, []);

  const onLogin = (token: string) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setAuthenticated(true);
    navigate('/dashboard');
  };

  const onLogout = () => {
    delete api.defaults.headers.common['Authorization'];
    setAuthenticated(false);
    navigate('/login');
  };

  return (
      <Routes>
        <Route path="/login" element={<LoginPage onLogin={onLogin} />} />
        <Route path="/dashboard" element={authenticated ? <Dashboard onLogout={onLogout} /> : <Navigate to="/login" />} />
        <Route path="/employees" element={authenticated ? <EmployeesPage /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to={authenticated ? "/dashboard" : "/login"} />} />
      </Routes>
  );
}
