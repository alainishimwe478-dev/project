import React from "react";
import { useDarkMode } from "../contexts/DarkModeContext";

export default function SmartAlerts() {
  const { isDark } = useDarkMode();

  return (
    <div className={`border-l-4 border-yellow-500 p-4 rounded-xl ${
      isDark ? 'bg-yellow-900/30 text-yellow-200' : 'bg-yellow-100 text-yellow-800'
    }`}>
      <div className="flex items-center gap-2">
        <span className="text-lg">⚠️</span>
        <span className="font-medium">Low coverage balance detected. Reduce spending or plan ahead.</span>
      </div>
    </div>
  );
}