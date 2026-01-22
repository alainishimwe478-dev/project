import React from "react";
import { useDarkMode } from "../contexts/DarkModeContext";

const payments = [
  {
    title: "King Faisal Hospital",
    date: "12 Jan 2024",
    amount: "35,000"
  },
  {
    title: "Pharmacy Purchase",
    date: "08 Jan 2024",
    amount: "5,000"
  },
  {
    title: "Clinic Consultation",
    date: "02 Jan 2024",
    amount: "12,000"
  }
];

export default function RecentPayments() {
  const { isDark } = useDarkMode();

  return (
    <div className="mt-6">
      <div className="flex justify-between mb-3">
        <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Recent Payments</h3>
        <button className="text-blue-600 text-sm">View All</button>
      </div>

      {payments.map((p, i) => (
        <div
          key={i}
          className={`rounded-xl p-4 mb-3 shadow-sm flex justify-between items-center ${
            isDark ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <div>
            <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{p.title}</p>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{p.date}</p>
          </div>
          <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>RWF {p.amount}</p>
        </div>
      ))}
    </div>
  );
}