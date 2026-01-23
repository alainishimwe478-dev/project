import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminReports from '../admin/AdminReports';

export default function AdminReportsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-[#003A8F] text-white transition-all duration-300 fixed h-screen left-0 top-0 shadow-lg z-40`}>
        <div className="p-4 flex items-center justify-between">
          <div className={`flex items-center space-x-3 ${!sidebarOpen && 'hidden'}`}>
            <div className="w-8 h-8 bg-[#F5C400] rounded-full flex items-center justify-center">
              <span className="text-[#003A8F] font-bold text-sm">R</span>
            </div>
            <span className="font-bold text-lg">HealthPay AI</span>
          </div>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white hover:bg-[#002F73] p-2 rounded">
            {sidebarOpen ? '✕' : '☰'}
          </button>
        </div>
        
        <nav className="mt-8 space-y-2 px-4">
          <Link to="/" className="block px-4 py-2 rounded hover:bg-[#002F73] transition">
            {sidebarOpen ? '🏠 Homepage' : '🏠'}
          </Link>
          <Link to="/admin-dashboard" className="block px-4 py-2 rounded hover:bg-[#002F73] transition">
            {sidebarOpen ? '⚙️ Admin Dashboard' : '⚙️'}
          </Link>
          <Link to="/admin-reports" className="block px-4 py-2 rounded bg-[#F5C400] text-[#003A8F] font-semibold transition">
            {sidebarOpen ? '📊 Reports' : '📊'}
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className={`${sidebarOpen ? 'ml-64' : 'ml-20'} w-full transition-all duration-300`}>
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">📊 Reports</h1>
            <Link to="/admin-dashboard" className="text-[#003A8F] hover:text-[#002F73]">
              ← Back to Dashboard
            </Link>
          </div>
        </header>

        <AdminReports />
      </div>
    </div>
  );
}
