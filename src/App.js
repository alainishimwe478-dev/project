import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import AdminDashboard from "./components/AdminDashboard";
import HospitalDashboard from "./components/HospitalDashboard";

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
        <Route path="/admin-reports" element={<AdminDashboard />} />
        <Route path="/admin-settings" element={<AdminDashboard />} />
        <Route path="/ai-control-panel" element={<AdminDashboard />} />
        <Route path="/invoices" element={<AdminDashboard />} />
        <Route path="/notifications" element={<AdminDashboard />} />
        <Route path="/payments" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
