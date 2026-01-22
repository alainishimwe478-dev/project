import React from "react";
import { useDarkMode } from "../contexts/DarkModeContext";

export default function CoveragePrediction() {
  const { isDark } = useDarkMode();

  return (
    <div className={`rounded-xl p-4 shadow-lg border-l-4 border-orange-500 ${
      isDark ? 'bg-orange-900/20' : 'bg-orange-50'
    }`}>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">⏳</span>
        <h3 className={`font-semibold ${
          isDark ? 'text-orange-200' : 'text-orange-800'
        }`}>Coverage Prediction</h3>
      </div>

      <div className={`w-full rounded-full h-3 mb-2 ${
        isDark ? 'bg-gray-700' : 'bg-gray-200'
      }`}>
        <div className="bg-red-500 h-3 rounded-full w-[35%]" />
      </div>

      <p className={`text-sm ${
        isDark ? 'text-orange-300' : 'text-orange-700'
      }`}>
        Coverage may run out in <b>1.3 months</b>
      </p>
    </div>
  );
}