import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
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
          <Link to="/" className="block px-4 py-2 rounded hover:bg-blue-800 transition">
            {sidebarOpen ? '🏠 Homepage' : '🏠'}
          </Link>
          <Link to="/login" className="block px-4 py-2 rounded hover:bg-blue-800 transition">
            {sidebarOpen ? '🔐 Login' : '🔐'}
          </Link>
          <Link to="/dashboard" className="block px-4 py-2 rounded hover:bg-blue-800 transition">
            {sidebarOpen ? '👤 Patient Dashboard' : '👤'}
          </Link>
          <Link to="/admin-dashboard" className="block px-4 py-2 rounded bg-blue-800 hover:bg-blue-700 transition">
            {sidebarOpen ? '⚙️ Admin Dashboard' : '⚙️'}
          </Link>
          <Link to="/hospital-dashboard" className="block px-4 py-2 rounded hover:bg-blue-800 transition">
            {sidebarOpen ? '🏥 Hospital Dashboard' : '🏥'}
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className={`${sidebarOpen ? 'ml-64' : 'ml-20'} w-full transition-all duration-300`}>
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <Link to="/" className="text-blue-600 hover:text-blue-700">
            ← Back to Homepage
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-sm text-gray-600">Total Users</p>
            <p className="text-3xl font-bold text-gray-900">12,450</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-sm text-gray-600">Active Payments</p>
            <p className="text-3xl font-bold text-green-600">8,920</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-sm text-gray-600">Fraud Detected</p>
            <p className="text-3xl font-bold text-red-600">23</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-sm text-gray-600">System Health</p>
            <p className="text-3xl font-bold text-blue-600">99.8%</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4 text-gray-900">Admin Controls</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition">
              <p className="font-bold text-blue-600">👥 Manage Users</p>
              <p className="text-sm text-gray-600">View and manage all users</p>
            </button>
            <button className="p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition">
              <p className="font-bold text-green-600">💳 Payment Reports</p>
              <p className="text-sm text-gray-600">View payment analytics</p>
            </button>
            <button className="p-4 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition">
              <p className="font-bold text-red-600">🛡️ Security Alerts</p>
              <p className="text-sm text-gray-600">Monitor fraud detection</p>
            </button>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
