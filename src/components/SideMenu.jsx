import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { useDarkMode } from "../contexts/DarkModeContext";

export default function SideMenu({ open, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const { isDark } = useDarkMode();

  const handleNavigation = (path) => {
    navigate(path);
    onClose();
  };

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
    onClose();
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-72 z-50
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"} ${
          isDark ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-4">
          <p className="font-semibold">Jean Claude</p>
          <p className="text-sm opacity-90">RSSB Member</p>
        </div>

        {/* Menu Items */}
        <nav className="p-4 space-y-2">
          <MenuItem 
            label="Dashboard Overview" 
            icon="📊" 
            onClick={() => handleNavigation('/dashboard')}
            active={isActive('/dashboard')}
            isDark={isDark}
          />
          <MenuItem 
            label="Payments" 
            icon="💳" 
            onClick={() => handleNavigation('/payments')}
            active={isActive('/payments')}
            isDark={isDark}
          />
          <MenuItem 
            label="Profile" 
            icon="👤" 
            onClick={() => handleNavigation('/profile')}
            active={isActive('/profile')}
            isDark={isDark}
          />
          <MenuItem 
            label="Settings" 
            icon="⚙️" 
            onClick={() => handleNavigation('/settings')}
            active={isActive('/settings')}
            isDark={isDark}
          />
          
          <div className={`pt-4 mt-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <MenuItem 
              label="Logout" 
              icon="🚪" 
              danger 
              onClick={handleLogout}
              isDark={isDark}
            />
          </div>
        </nav>
      </div>
    </>
  );
}

function MenuItem({ label, icon, danger, onClick, active, isDark }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
        active
          ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
          : danger
          ? "text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
          : isDark
          ? "text-gray-200 hover:bg-gray-700"
          : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      <span className="text-lg">{icon}</span>
      <span className="font-medium">{label}</span>
    </button>
  );
}