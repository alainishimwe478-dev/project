import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { AuthProvider } from './auth/AuthContext';
import { DarkModeProvider } from './contexts/DarkModeContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardOverview from './pages/DashboardOverview';
import Dashboard from './pages/Dashboard';
import Payments from './pages/Payments';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Login from './pages/Login';
import AdminDashboard from './components/AdminDashboard';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DarkModeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<DashboardOverview />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </DarkModeProvider>
  </React.StrictMode>
);