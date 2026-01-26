import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import Register from "./components/Register";
import Login from "./components/Login";
import UserDashboard from "./components/UserDashboard";
import AdminDashboard from "./components/AdminDashboard";
import HospitalDashboard from "./components/HospitalDashboard";
import PatientDashboard from "./pages/PatientDashboard";
import HospitalPatients from "./pages/HospitalPatients";
import HospitalAppointments from "./pages/HospitalAppointments";
import HospitalBilling from "./pages/HospitalBilling";
import HospitalReports from "./pages/HospitalReports";
import ProtectedRoute from "./components/ProtectedRoute";
import Users from "./components/Users";
import AdminPayments from "./pages/AdminPayments";
import AdminClaims from "./pages/AdminClaims";
import Payments from "./pages/Payments";
import Claims from "./pages/Claims";
import FraudDetection from "./pages/FraudDetection";
import Hospitals from "./pages/Hospitals";
import Reports from "./pages/Reports";

// Import CSS for global styles
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={
          <ProtectedRoute role="user">
            <UserDashboard />
          </ProtectedRoute>
        } />
        <Route path="/user-dashboard" element={
          <ProtectedRoute role="user">
            <UserDashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin-dashboard" element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/hospital-dashboard" element={
          <ProtectedRoute role="hospital">
            <HospitalDashboard />
          </ProtectedRoute>
        } />
        <Route path="/hospital/patients" element={<HospitalPatients />} />
        <Route path="/hospital/appointments" element={<HospitalAppointments />} />
        <Route path="/hospital/billing" element={<HospitalBilling />} />
        <Route path="/hospital/reports" element={<HospitalReports />} />
        <Route path="/patient-dashboard" element={<PatientDashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/admin-payments" element={<AdminPayments />} />
        <Route path="/admin-claims" element={<AdminClaims />} />
        <Route path="/admin/claims" element={<AdminClaims />} />
        <Route path="/admin/fraud" element={<FraudDetection />} />
        <Route path="/admin/hospitals" element={<Hospitals />} />
        <Route path="/admin/reports" element={<Reports />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/claims" element={<Claims />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
