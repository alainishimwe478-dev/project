import React from "react";
import { useDarkMode } from "../contexts/DarkModeContext";

const data = [
  { name: "Hospital", value: 65 },
  { name: "Pharmacy", value: 20 },
  { name: "Clinic", value: 15 }
];

const COLORS = ["#2563eb", "#22c55e", "#facc15"];

export default function SpendingInsights() {
  const { isDark } = useDarkMode();

  return (
    <div className={`rounded-xl p-4 shadow-lg ${
      isDark ? 'bg-gray-800' : 'bg-white'
    }`}>
      <h3 className={`font-semibold mb-3 ${
        isDark ? 'text-white' : 'text-gray-900'
      }`}>AI Spending Insights</h3>

      <div className="space-y-2">
        {data.map((item, i) => (
          <div key={item.name}>
            <div className="flex justify-between mb-1">
              <span className={`text-sm ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>{item.name}</span>
              <span className="text-sm font-bold">{item.value}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="h-2 rounded-full"
                style={{
                  width: `${item.value}%`,
                  backgroundColor: COLORS[i],
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <p className={`text-sm mt-4 ${
        isDark ? 'text-gray-300' : 'text-gray-600'
      }`}>
        <span className="text-lg">📈</span> Hospital spending increased by <b>28%</b>
      </p>
    </div>
  );
}