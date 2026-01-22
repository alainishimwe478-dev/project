/**
 * App.js - Main application component for the RSSB HealthPay system.
 *
 * This file sets up the routing for the application using React Router.
 * It includes public routes (login, signup) and protected routes based on user roles.
 * Protected routes use a custom ProtectedRoute component to check authentication and authorization.
 */

// Import React and necessary components from React Router
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import RoleRoute from "./auth/RoleRoute";
import AuthCard from "./components/AuthCard";
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./components/AdminDashboard";
import AdminUsers from "./components/AdminUsers";
import Payments from "./admin/Payments";
import AdminReports from "./admin/AdminReports";
import Notifications from "./admin/Notifications";
import AdminSettings from "./admin/AdminSettings";
import Invoices from "./admin/Invoices";
import AIFeaturesDashboard from "./admin/AIFeaturesDashboard";
import Login from "./pages/Login";
import SlidingLogin from "./pages/SlidingLogin";
import ModernLogin from "./pages/ModernLogin";
import Dashboard from "./pages/Dashboard";

// Import CSS for global styles
import './App.css';

/**
 * App Component
 *
 * The root component of the application. Sets up the router and defines all routes.
 */
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<SlidingLogin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/admin"
            element={
              <RoleRoute permission="dashboard">
                <AdminLayout>
                  <AdminDashboard />
                </AdminLayout>
              </RoleRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <RoleRoute permission="users">
                <AdminLayout>
                  <AdminUsers />
                </AdminLayout>
              </RoleRoute>
            }
          />
          <Route
            path="/admin/payments"
            element={
              <RoleRoute permission="dashboard">
                <AdminLayout>
                  <Payments />
                </AdminLayout>
              </RoleRoute>
            }
          />
          <Route
            path="/admin/invoices"
            element={
              <RoleRoute permission="dashboard">
                <AdminLayout>
                  <Invoices />
                </AdminLayout>
              </RoleRoute>
            }
          />
          <Route
            path="/admin/reports"
            element={
              <RoleRoute permission="analytics">
                <AdminLayout>
                  <AdminReports />
                </AdminLayout>
              </RoleRoute>
            }
          />
          <Route
            path="/admin/ai-features"
            element={
              <RoleRoute permission="dashboard">
                <AdminLayout>
                  <AIFeaturesDashboard />
                </AdminLayout>
              </RoleRoute>
            }
          />
          <Route
            path="/admin/notifications"
            element={
              <RoleRoute permission="dashboard">
                <AdminLayout>
                  <Notifications />
                </AdminLayout>
              </RoleRoute>
            }
          />
          <Route
            path="/admin/settings"
            element={
              <RoleRoute permission="settings">
                <AdminLayout>
                  <AdminSettings />
                </AdminLayout>
              </RoleRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

// Export the App component as default
export default App;
