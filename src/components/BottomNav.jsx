import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useDarkMode } from "../contexts/DarkModeContext";

export default function BottomNav() {
  const { isDark } = useDarkMode();
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/dashboard", icon: "🏠" },
    { name: "Payments", path: "/payments", icon: "💳" },
    { name: "Claims", path: "/claims", icon: "📄" },
    { name: "Profile", path: "/profile", icon: "👤" }
  ];

  return (
    <div className={`fixed bottom-0 left-0 right-0 border-t shadow-md flex justify-around py-3 ${
      isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      {navItems.map((item, index) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.name}
            to={item.path}
            className={`text-sm flex flex-col items-center relative ${
              isActive 
                ? (isDark ? 'text-blue-400' : 'text-blue-600')
                : (isDark ? 'text-gray-400' : 'text-gray-600')
            }`}
          >
            {item.name === "Payments" && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">3</span>
              </div>
            )}
            <span className="text-lg">{item.icon}</span>
            <span className="text-xs mt-1">{item.name}</span>
          </Link>
        );
      })}
    </div>
  );
}