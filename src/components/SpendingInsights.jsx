import React from "react";
import { PieChart, Pie, Cell } from "recharts";
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

      <div className="flex justify-center">
        <PieChart width={220} height={220}>
          <Pie
            data={data}
            cx={110}
            cy={110}
            outerRadius={80}
            dataKey="value"
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i]} />
            ))}
          </Pie>
        </PieChart>
      </div>

      <div className="flex justify-center gap-4 mt-2 mb-3">
        {data.map((item, i) => (
          <div key={item.name} className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }}></div>
            <span className={`text-xs ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>{item.name} {item.value}%</span>
          </div>
        ))}
      </div>

      <p className={`text-sm mt-2 ${
        isDark ? 'text-gray-300' : 'text-gray-600'
      }`}>
        <span className="text-lg">📈</span> Hospital spending increased by <b>28%</b>
      </p>
    </div>
  );
}