import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <>
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
        
        <nav className="mt-8 space-y-2 px-4 overflow-y-auto max-h-[calc(100vh-120px)]">
          <Link to="/" className="block px-4 py-2 rounded hover:bg-blue-800 transition text-sm">
            {sidebarOpen ? '🏠 Homepage' : '🏠'}
          </Link>
          <Link to="/login" className="block px-4 py-2 rounded hover:bg-blue-800 transition text-sm">
            {sidebarOpen ? '🔐 Login' : '🔐'}
          </Link>
          <Link to="/register" className="block px-4 py-2 rounded hover:bg-blue-800 transition text-sm">
            {sidebarOpen ? '📝 Register' : '📝'}
          </Link>
          <Link to="/dashboard" className="block px-4 py-2 rounded hover:bg-blue-800 transition text-sm">
            {sidebarOpen ? '👤 Patient Dashboard' : '👤'}
          </Link>
          
          {sidebarOpen && <div className="px-4 py-2 text-xs font-bold text-blue-300 mt-4">ADMIN PAGES</div>}
          <Link to="/admin-dashboard" className="block px-4 py-2 rounded hover:bg-blue-800 transition text-sm">
            {sidebarOpen ? '⚙️ Admin Dashboard' : '⚙️'}
          </Link>
          <Link to="/admin-reports" className="block px-4 py-2 rounded hover:bg-blue-800 transition text-sm">
            {sidebarOpen ? '📊 Admin Reports' : '📊'}
          </Link>
          <Link to="/admin-settings" className="block px-4 py-2 rounded hover:bg-blue-800 transition text-sm">
            {sidebarOpen ? '⚙️ Admin Settings' : '⚙️'}
          </Link>
          <Link to="/ai-control-panel" className="block px-4 py-2 rounded hover:bg-blue-800 transition text-sm">
            {sidebarOpen ? '🤖 AI Control Panel' : '🤖'}
          </Link>
          <Link to="/invoices" className="block px-4 py-2 rounded hover:bg-blue-800 transition text-sm">
            {sidebarOpen ? '🧾 Invoices' : '🧾'}
          </Link>
          <Link to="/notifications" className="block px-4 py-2 rounded hover:bg-blue-800 transition text-sm">
            {sidebarOpen ? '🔔 Notifications' : '🔔'}
          </Link>
          <Link to="/payments" className="block px-4 py-2 rounded hover:bg-blue-800 transition text-sm">
            {sidebarOpen ? '💳 Payments' : '💳'}
          </Link>
          
          {sidebarOpen && <div className="px-4 py-2 text-xs font-bold text-blue-300 mt-4">OTHER</div>}
          <Link to="/hospital-dashboard" className="block px-4 py-2 rounded hover:bg-blue-800 transition text-sm">
            {sidebarOpen ? '🏥 Hospital Dashboard' : '🏥'}
          </Link>
        </nav>
      </aside>

      <div className={`${sidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300`} />
    </>
  );
}
