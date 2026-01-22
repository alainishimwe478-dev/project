import React from 'react';
import { useAuth } from '../auth/AuthContext';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { user, role } = useAuth();

  // If not logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If admin route required but user is not admin, redirect to user dashboard
  if (requireAdmin && role !== 'ADMIN') {
    return <Navigate to="/dashboard" replace />;
  }

  // If user tries to access admin routes directly, block them
  if (role === 'USER' && window.location.pathname.startsWith('/admin')) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;