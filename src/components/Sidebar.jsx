import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import ThemeToggle from './ThemeToggle';

export default function Sidebar({ collapsed = false, setCollapsed = () => {} }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState({ role: "admin", name: "Admin User" });
  const [menus, setMenus] = useState([
    { to: "/admin-dashboard", icon: "📊", label: "Dashboard" },
    { to: "/users", icon: "👤", label: "User Management" },
    { to: "/admin-payments", icon: "💳", label: "Payments" },
    { to: "/admin/claims", icon: "📄", label: "Claims" },
    { to: "/admin/fraud", icon: "🛡️", label: "Fraud Detection" },
    { to: "/admin/hospitals", icon: "🏥", label: "Hospitals" },
    { to: "/admin/reports", icon: "📈", label: "Reports" }
  ]);

  useEffect(() => {
    // Fetch user data
    fetch('http://localhost:5000/api/user/current')
      .then(res => res.json())
      .then(data => setUser(prev => ({ ...prev, ...data })))
      .catch(() => console.log('Using default user data'));
    
    // Fetch menu permissions based on user role
    fetch('http://localhost:5000/api/menu/permissions')
      .then(res => res.json())
      .then(data => setMenus(data))
      .catch(() => console.log('Using default menu data'));
  }, []);

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-[#003A8F] text-white p-2 rounded-lg shadow-lg"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen bg-[#003A8F] dark:bg-gray-900 text-white
        transition-all duration-300
        ${collapsed ? "w-20" : "w-64"}
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-5 border-b border-blue-700 dark:border-gray-700">
          {!collapsed && (
            <div>
              <h1 className="text-xl font-bold">HealthPay AI</h1>
              <p className="text-xs text-yellow-400">RSSB {user.role.toUpperCase()} Panel</p>
            </div>
          )}
          <div className="flex items-center gap-2">
            {!collapsed && <ThemeToggle />}
            <button 
              onClick={() => {
                if (window.innerWidth < 1024) setMobileOpen(false);
                else if (setCollapsed) setCollapsed(!collapsed);
              }}
              className="p-2 hover:bg-white/10 rounded-lg transition"
            >
              {mobileOpen && window.innerWidth < 1024 ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Menu */}
        <nav className="mt-6 space-y-1">
          {menus.map((item) => (
            <MenuItem 
              key={item.to}
              to={item.to} 
              icon={item.icon} 
              label={item.label} 
              collapsed={collapsed}
              onClick={() => setMobileOpen(false)}
            />
          ))}
        </nav>
      </aside>
    </>
  );
}

function MenuItem({ to, icon, label, collapsed, onClick }) {
  const handleClick = () => {
    // If this is the payments link, fetch payments data
    if (to === '/admin-payments') {
      fetch('http://localhost:5000/api/payments')
        .then(res => res.json())
        .then(data => {
          console.log('Payments data loaded:', data);
          // Store in localStorage for the payments page to use
          localStorage.setItem('paymentsData', JSON.stringify(data));
        })
        .catch(() => console.log('Failed to load payments data'));
    }
    onClick();
  };

  return (
    <NavLink
      to={to}
      onClick={handleClick}
      className={({ isActive }) =>
        `flex items-center gap-4 px-4 py-3 rounded-lg mx-2 transition-all
        ${isActive ? "bg-white/20 text-yellow-400" : "hover:bg-white/10"}`
      }
    >
      <span className="text-xl">{icon}</span>
      {!collapsed && <span className="text-sm font-medium">{label}</span>}
    </NavLink>
  );
}