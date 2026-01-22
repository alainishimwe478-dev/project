import React from "react";
import { useDarkMode } from "../contexts/DarkModeContext";

export default function Header() {
  const { isDark } = useDarkMode();

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-6 text-white">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold">Welcome, Jean Claude</h1>
          <p className="text-sm opacity-90">Your RSSB Health Insurance</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              🔔
            </div>
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              1
            </span>
          </div>

          <div className="w-9 h-9 rounded-full bg-white/30 flex items-center justify-center">
            <span className="text-lg">👤</span>
          </div>
        </div>
      </div>
    </div>
  );
}