import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function AdminNotifications() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 flex">
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
          <Link to="/admin-dashboard" className="block px-4 py-2 rounded hover:bg-[#002F73] transition">
            {sidebarOpen ? '⚙️ Admin Dashboard' : '⚙️'}
          </Link>
          <Link to="/admin-reports" className="block px-4 py-2 rounded hover:bg-[#002F73] transition">
            {sidebarOpen ? '📊 Reports' : '📊'}
          </Link>
          <Link to="/admin-notifications" className="block px-4 py-2 rounded bg-[#F5C400] text-[#003A8F] font-semibold transition">
            {sidebarOpen ? '🔔 Notifications' : '🔔'}
          </Link>
        </nav>
      </aside>

      <div className={`${sidebarOpen ? 'ml-64' : 'ml-20'} w-full transition-all duration-300`}>
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">🔔 Notifications</h1>
            <Link to="/admin-reports" className="text-[#003A8F] hover:text-[#002F73]">
              ← Back
            </Link>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#003A8F]">
              <h3 className="font-bold text-gray-900">Payment Completed</h3>
              <p className="text-sm text-gray-600">Payment PAY-001 has been successfully processed</p>
              <p className="text-xs text-gray-500 mt-2">2024-01-15 10:30 AM</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
              <h3 className="font-bold text-gray-900">Pending Payment Alert</h3>
              <p className="text-sm text-gray-600">Payment PAY-003 is pending for 2 days</p>
              <p className="text-xs text-gray-500 mt-2">2024-01-14 03:15 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
