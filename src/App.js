import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import AdminDashboard from "./components/AdminDashboard";
import HospitalDashboard from "./components/HospitalDashboard";
import AdminReportsPage from "./pages/AdminReportsPage";
import AdminSettings from "./pages/AdminSettings";
import AdminAIControl from "./pages/AdminAIControl";
import AdminInvoices from "./pages/AdminInvoices";
import AdminNotifications from "./pages/AdminNotifications";
import AdminPayments from "./pages/AdminPayments";

// Import CSS for global styles
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/hospital-dashboard" element={<HospitalDashboard />} />
        <Route path="/admin-reports" element={<AdminReportsPage />} />
        <Route path="/admin-settings" element={<AdminSettings />} />
        <Route path="/admin-ai-control" element={<AdminAIControl />} />
        <Route path="/admin-invoices" element={<AdminInvoices />} />
        <Route path="/admin-notifications" element={<AdminNotifications />} />
        <Route path="/admin-payments" element={<AdminPayments />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
