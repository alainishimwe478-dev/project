import React from "react";
import { useDarkMode } from "../contexts/DarkModeContext";

export default function FraudWarning() {
  const { isDark } = useDarkMode();

  return (
    <div className={`border-l-4 border-red-500 p-4 rounded-xl shadow-lg ${
      isDark ? 'bg-red-900/20 text-red-200' : 'bg-red-100 text-red-700'
    }`}>
      <div className="flex items-center gap-2">
        <span className="text-lg">🚨</span>
        <span className="font-medium">Suspicious activity detected on Jan 12. Please review transactions.</span>
      </div>
    </div>
  );
}