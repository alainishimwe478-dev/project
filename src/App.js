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
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

// Export the App component as default
export default App;
