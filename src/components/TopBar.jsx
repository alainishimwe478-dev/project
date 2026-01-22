import React from "react";
import { useDarkMode } from "../contexts/DarkModeContext";

export default function TopBar({ onMenu }) {
  const { isDark } = useDarkMode();

  return (
    <div className={`flex items-center justify-between px-4 py-3 shadow ${
      isDark ? 'bg-gray-800 text-white' : 'bg-blue-600 text-white'
    }`}>
      <button onClick={onMenu} className="text-2xl">
        ☰
      </button>

      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-green-600 rounded flex items-center justify-center">
          <span className="text-white font-bold text-xs">R</span>
        </div>
        <h2 className="font-semibold">RSSB HealthPay</h2>
      </div>

      <div className="relative">
        <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-bold">3</span>
        </div>
      </div>
    </div>
  );
}