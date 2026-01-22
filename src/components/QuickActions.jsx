import React from "react";
import { useDarkMode } from "../contexts/DarkModeContext";

export default function QuickActions() {
  const { isDark } = useDarkMode();

  return (
    <div className="grid grid-cols-2 gap-4 mt-6">
      <button className="bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-shadow">
        <span className="text-lg">➕</span> Pay Medical Bill
      </button>

      <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-shadow">
        <span className="text-lg">🛡</span> My Insurance Info
      </button>
    </div>
  );
}