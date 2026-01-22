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
          <Route path="/" element={<AuthCard />} />
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
                  <div className="p-6">
                    <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
                    <p className="text-gray-600 mt-2">Payment management interface coming soon...</p>
                  </div>
                </AdminLayout>
              </RoleRoute>
            }
          />
          <Route
            path="/admin/reports"
            element={
              <RoleRoute permission="analytics">
                <AdminLayout>
                  <div className="p-6">
                    <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
                    <p className="text-gray-600 mt-2">Analytics and reporting interface coming soon...</p>
                  </div>
                </AdminLayout>
              </RoleRoute>
            }
          />
          <Route
            path="/admin/notifications"
            element={
              <RoleRoute permission="dashboard">
                <AdminLayout>
                  <div className="p-6">
                    <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
                    <p className="text-gray-600 mt-2">Notification management coming soon...</p>
                  </div>
                </AdminLayout>
              </RoleRoute>
            }
          />
          <Route
            path="/admin/settings"
            element={
              <RoleRoute permission="settings">
                <AdminLayout>
                  <div className="p-6">
                    <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                    <p className="text-gray-600 mt-2">System settings interface coming soon...</p>
                  </div>
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
