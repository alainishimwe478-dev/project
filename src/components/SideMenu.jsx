import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function SideMenu({ open, onClose }) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleNavigation = (path) => {
    navigate(path);
    onClose();
  };

  const handleLogout = () => {
    logout();
    onClose();
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
        className={`fixed top-0 left-0 h-full w-72 bg-white z-50
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Header */}
        <div className="bg-blue-600 text-white p-4">
          <p className="font-semibold">Jean Claude</p>
          <p className="text-sm opacity-90">RSSB Member</p>
        </div>

        {/* Menu Items */}
        <nav className="p-4 space-y-2">
          <MenuItem 
            label="Dashboard Overview" 
            icon="📊" 
            onClick={() => handleNavigation('/dashboard')}
          />
          <MenuItem 
            label="Payments" 
            icon="💳" 
            onClick={() => handleNavigation('/payments')}
          />
          <MenuItem 
            label="Profile" 
            icon="👤" 
            onClick={() => handleNavigation('/profile')}
          />
          <MenuItem 
            label="Settings" 
            icon="⚙️" 
            onClick={() => handleNavigation('/settings')}
          />
          <MenuItem 
            label="Logout" 
            icon="🚪" 
            danger 
            onClick={handleLogout}
          />
        </nav>
      </div>
    </>
  );
}

function MenuItem({ label, icon, danger, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left
      ${danger
        ? "text-red-600 hover:bg-red-50"
        : "hover:bg-gray-100"}`}
    >
      <span className="text-lg">{icon}</span>
      <span className="font-medium">{label}</span>
    </button>
  );
}