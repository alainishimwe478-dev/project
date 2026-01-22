import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { AuthProvider } from './auth/AuthContext';
import { DarkModeProvider } from './contexts/DarkModeContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardOverview from './pages/DashboardOverview';
import Dashboard from './pages/Dashboard';
import Payments from './pages/Payments';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Login from './pages/Login';
import AdminDashboard from './components/AdminDashboard';
import AdminLayout from './admin/AdminLayout';
import AdminUsers from './admin/pages/AdminUsers';
import AdminPayments from './admin/pages/AdminPayments';
import Invoices from './admin/Invoices';
import AdminReports from './admin/AdminReports';
import Notifications from './admin/Notifications';
import AdminSettings from './admin/AdminSettings';
import AIControlPanel from './admin/AIControlPanel';

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
            
            {/* Admin Routes - Protected */}
            <Route path="/admin" element={
              <ProtectedRoute requireAdmin={true}>
                <AdminLayout><AdminDashboard /></AdminLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin/users" element={
              <ProtectedRoute requireAdmin={true}>
                <AdminLayout><AdminUsers /></AdminLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin/payments" element={
              <ProtectedRoute requireAdmin={true}>
                <AdminLayout><AdminPayments /></AdminLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin/ai-control" element={
              <ProtectedRoute requireAdmin={true}>
                <AdminLayout><AIControlPanel /></AdminLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin/invoices" element={
              <ProtectedRoute requireAdmin={true}>
                <AdminLayout><Invoices /></AdminLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin/reports" element={
              <ProtectedRoute requireAdmin={true}>
                <AdminLayout><AdminReports /></AdminLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin/notifications" element={
              <ProtectedRoute requireAdmin={true}>
                <AdminLayout><Notifications /></AdminLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin/settings" element={
              <ProtectedRoute requireAdmin={true}>
                <AdminLayout><AdminSettings /></AdminLayout>
              </ProtectedRoute>
            } />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </DarkModeProvider>
  </React.StrictMode>
);