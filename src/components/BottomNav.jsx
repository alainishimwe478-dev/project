import React from "react";
import { useDarkMode } from "../contexts/DarkModeContext";

export default function BottomNav() {
  const { isDark } = useDarkMode();

  return (
    <div className={`fixed bottom-0 left-0 right-0 border-t shadow-md flex justify-around py-3 ${
      isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}>

      {["Home", "Payments", "Profile"].map((item, index) => (
        <button
          key={item}
          className={`text-sm flex flex-col items-center relative ${
            index === 0 
              ? (isDark ? 'text-blue-400' : 'text-blue-600')
              : (isDark ? 'text-gray-400' : 'text-gray-600')
          }`}
        >
          {index === 1 && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">3</span>
            </div>
          )}
          ⬤
          {item}
        </button>
      ))}
    </div>
  );
}