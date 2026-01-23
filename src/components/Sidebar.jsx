import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import rssbLogo from '../images/images.png';

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <>
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-[#003A8F] text-white transition-all duration-300 fixed h-screen left-0 top-0 shadow-lg z-40`}>
        <div className="p-4 flex items-center justify-between">
          <div className={`flex items-center space-x-3 ${!sidebarOpen && 'hidden'}`}>
            <img src={rssbLogo} alt="RSSB Logo" className="w-8 h-8 object-contain" />
            <span className="font-bold text-lg">HealthPay AI</span>
          </div>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white hover:bg-[#002F73] p-2 rounded">
            {sidebarOpen ? '✕' : '☰'}
          </button>
        </div>
        
        <nav className="mt-8 space-y-2 px-4 overflow-y-auto max-h-[calc(100vh-120px)]">
          {sidebarOpen && <div className="px-4 py-2 text-xs font-bold text-blue-300 mt-4">ADMIN PAGES</div>}
          <Link to="/admin-dashboard" className="block px-4 py-2 rounded hover:bg-[#002F73] transition text-sm">
            {sidebarOpen ? '⚙️ Admin Dashboard' : '⚙️'}
          </Link>
          <Link to="/admin-reports" className="block px-4 py-2 rounded hover:bg-[#002F73] transition text-sm">
            {sidebarOpen ? '📊 Reports' : '📊'}
          </Link>
          <Link to="/admin-settings" className="block px-4 py-2 rounded hover:bg-[#002F73] transition text-sm">
            {sidebarOpen ? '⚙️ Settings' : '⚙️'}
          </Link>
          <Link to="/admin-ai-control" className="block px-4 py-2 rounded hover:bg-[#002F73] transition text-sm">
            {sidebarOpen ? '🤖 AI Control' : '🤖'}
          </Link>
          <Link to="/admin-invoices" className="block px-4 py-2 rounded hover:bg-[#002F73] transition text-sm">
            {sidebarOpen ? '🧾 Invoices' : '🧾'}
          </Link>
          <Link to="/admin-notifications" className="block px-4 py-2 rounded hover:bg-[#002F73] transition text-sm">
            {sidebarOpen ? '🔔 Notifications' : '🔔'}
          </Link>
          <Link to="/admin-payments" className="block px-4 py-2 rounded hover:bg-[#002F73] transition text-sm">
            {sidebarOpen ? '💳 Payments' : '💳'}
          </Link>
          
          {sidebarOpen && <div className="px-4 py-2 text-xs font-bold text-blue-300 mt-4">OTHER</div>}
          <Link to="/hospital-dashboard" className="block px-4 py-2 rounded hover:bg-[#002F73] transition text-sm">
            {sidebarOpen ? '🏥 Hospital Dashboard' : '🏥'}
          </Link>
        </nav>
      </aside>

      <div className={`${sidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300`} />
    </>
  );
}
