/**
 * App.js - Main application component for the RSSB HealthPay system.
 *
 * This file sets up the routing for the application using React Router.
 * It includes public routes (login, signup) and protected routes based on user roles.
 * Protected routes use a custom ProtectedRoute component to check authentication and authorization.
 */

// Import React and necessary components from React Router
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

// Import component files without file extensions for safer, bundler-agnostic imports
// This avoids issues with file extensions and allows bundlers to resolve .js or .jsx automatically
import Login from './components/Login';
import Signup from './components/Signup';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import OfficerDashboard from './components/OfficerDashboard';
import AdminUsers from './components/AdminUsers';
import MockWorkflow from './components/MockWorkflow';

// Import CSS for global styles
import './App.css';

/**
 * ProtectedRoute Component
 *
 * A wrapper component that checks if the user is authenticated and has the required role
 * before rendering the protected content. If not, redirects to the login page.
 *
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - The component to render if access is allowed
 * @param {Array<string>} props.allowedRoles - Array of roles that can access this route
 */
function ProtectedRoute({ children, allowedRoles }) {
  // Retrieve user data from localStorage (consider using a more secure method in production)
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem('user') || 'null');
  } catch (e) {
    user = null;
  }

  // If no user is logged in or user's role is not in the allowed roles, redirect to login
  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" />;
  }

  // If checks pass, render the protected content
  return children;
}

/**
 * App Component
 *
 * The root component of the application. Sets up the router and defines all routes.
 */
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public route for user login */}
          <Route path="/login" element={<Login />} />

          {/* Public route for user signup/activation */}
          <Route path="/signup" element={<Signup />} />

          {/* Protected route for regular users - only accessible by 'User' role */}
          <Route
            path="/user-dashboard"
            element={
              <ProtectedRoute allowedRoles={['User']}>
                <UserDashboard />
              </ProtectedRoute>
            }
          />

          {/* Protected route for admin dashboard - accessible by 'Admin' and 'Officer' roles */}
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute allowedRoles={['Admin', 'Officer']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Protected route for officer dashboard - only accessible by 'Officer' role */}
          <Route
            path="/officer-dashboard"
            element={
              <ProtectedRoute allowedRoles={['Officer']}>
                <OfficerDashboard />
              </ProtectedRoute>
            }
          />

          {/* Protected route for admin users management - only accessible by 'Admin' role */}
          <Route
            path="/admin-users"
            element={
              <ProtectedRoute allowedRoles={['Admin']}>
                <AdminUsers />
              </ProtectedRoute>
            }
          />

          {/* Mock Workflow route - public for demo */}
          <Route path="/mock-workflow" element={<MockWorkflow />} />

          {/* Default route - redirects to login */}
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

// Export the App component as default
export default App;
