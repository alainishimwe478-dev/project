import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ProfileDropdown = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        <div className="w-10 h-10 bg-[#F5C400] rounded-full flex items-center justify-center font-bold text-[#003A8F]">
          {user?.name?.charAt(0) || 'H'}
        </div>
        <svg className={`w-4 h-4 text-gray-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
          <Link to="/profile" className="block px-4 py-2 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.name || 'Hospital User'}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email || 'hospital@rssb.rw'}</p>
          </Link>
          <Link to="/profile" className="flex items-center gap-3 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <span className="text-lg">👤</span>
            <span className="text-sm">View Profile</span>
          </Link>
          <Link to="/settings" className="flex items-center gap-3 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
            <span className="text-lg">⚙️</span>
            <span className="text-sm">Settings</span>
          </Link>
          <hr className="my-2 border-gray-200 dark:border-gray-600" />
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 w-full text-left">
            <span className="text-lg">🚪</span>
            <span className="text-sm">Logout</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default function HospitalDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [user, setUser] = useState({
    name: "Hospital User",
    email: "hospital@rssb.rw",
    role: "hospital"
  });
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-blue-900 text-white transition-all duration-300 fixed h-screen left-0 top-0 shadow-lg z-40`}>
        <div className="p-4 flex items-center justify-between">
          <div className={`flex items-center space-x-3 ${!sidebarOpen && 'hidden'}`}>
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">R</span>
            </div>
            <span className="font-bold text-lg">HealthPay AI</span>
          </div>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white hover:bg-blue-800 p-2 rounded">
            {sidebarOpen ? '✕' : '☰'}
          </button>
        </div>
        
        <nav className="mt-8 space-y-2 px-4">
          <Link to="/hospital-dashboard" className="block px-4 py-2 rounded bg-blue-800 hover:bg-blue-700 transition">
            {sidebarOpen ? '🏥 Dashboard' : '🏥'}
          </Link>
          <Link to="/hospital/patients" className="block px-4 py-2 rounded hover:bg-blue-800 transition">
            {sidebarOpen ? '👥 Patients' : '👥'}
          </Link>
          <Link to="/hospital/appointments" className="block px-4 py-2 rounded hover:bg-blue-800 transition">
            {sidebarOpen ? '📅 Appointments' : '📅'}
          </Link>
          <Link to="/hospital/billing" className="block px-4 py-2 rounded hover:bg-blue-800 transition">
            {sidebarOpen ? '💰 Billing' : '💰'}
          </Link>
          <Link to="/hospital/reports" className="block px-4 py-2 rounded hover:bg-blue-800 transition">
            {sidebarOpen ? '📊 Reports' : '📊'}
          </Link>
          <Link to="/patient-dashboard" className="block px-4 py-2 rounded hover:bg-blue-800 transition">
            {sidebarOpen ? '👤 Patient Dashboard' : '👤'}
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className={`${sidebarOpen ? 'ml-64' : 'ml-20'} w-full transition-all duration-300`}>
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Hospital Dashboard</h1>
          <div className="flex items-center space-x-4">
            <ProfileDropdown user={user} />
            <Link to="/" className="text-blue-600 hover:text-blue-700">
              ← Back to Homepage
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-sm text-gray-600">Pending Payments</p>
            <p className="text-3xl font-bold text-gray-900">2,340</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-sm text-gray-600">Received Today</p>
            <p className="text-3xl font-bold text-green-600">$45,200</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-sm text-gray-600">Claims Processed</p>
            <p className="text-3xl font-bold text-blue-600">1,856</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-sm text-gray-600">Success Rate</p>
            <p className="text-3xl font-bold text-purple-600">98.5%</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4 text-gray-900">Hospital Operations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Link to="/hospital/patients" className="p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition block">
              <p className="font-bold text-blue-600">👥 Manage Patients</p>
              <p className="text-sm text-gray-600">View and manage patient records</p>
            </Link>
            <Link to="/hospital/appointments" className="p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition block">
              <p className="font-bold text-green-600">📅 Appointments</p>
              <p className="text-sm text-gray-600">Schedule and manage appointments</p>
            </Link>
            <Link to="/hospital/billing" className="p-4 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition block">
              <p className="font-bold text-purple-600">💰 Billing & Claims</p>
              <p className="text-sm text-gray-600">Process payments and claims</p>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link to="/patient-dashboard" className="p-4 bg-orange-50 border border-orange-200 rounded-lg hover:bg-orange-100 transition block">
              <p className="font-bold text-orange-600">👤 Patient Dashboard</p>
              <p className="text-sm text-gray-600">View patient dashboard interface</p>
            </Link>
            <Link to="/hospital/reports" className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg hover:bg-indigo-100 transition block">
              <p className="font-bold text-indigo-600">📊 Reports & Analytics</p>
              <p className="text-sm text-gray-600">Generate hospital reports</p>
            </Link>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
