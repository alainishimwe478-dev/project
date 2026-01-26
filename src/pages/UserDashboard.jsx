import React, { useState } from "react";
import TopBar from "../components/TopBar";
import SideMenu from "../components/SideMenu";
import BottomNav from "../components/BottomNav";
import { useDarkMode } from "../contexts/DarkModeContext";

export default function UserDashboard() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isDark } = useDarkMode();

  return (
    <div className={`min-h-screen ${isDark ? "bg-gray-900" : "bg-gray-100"}`}>
      <TopBar onMenu={() => setMenuOpen(true)} />
      <SideMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className="p-4 pb-28">
        {/* Header */}
        <h1 className={`text-xl font-semibold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
          User Dashboard
        </h1>

        {/* User Info Card */}
        <div className={`rounded-xl p-4 shadow mb-4 ${isDark ? "bg-gray-800" : "bg-white"}`}>
          <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>Welcome back</p>
          <h2 className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
            Jean Paul
          </h2>
          <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
            RSSB Health Insurance Member
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className={`rounded-xl p-4 shadow ${isDark ? "bg-gray-800" : "bg-white"}`}>
            <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>Insurance Balance</p>
            <h3 className="text-green-600 font-bold text-lg">RWF 25,000</h3>
          </div>

          <div className={`rounded-xl p-4 shadow ${isDark ? "bg-gray-800" : "bg-white"}`}>
            <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>Status</p>
            <h3 className="text-blue-600 font-bold text-lg">Active</h3>
          </div>
        </div>

        {/* Quick Actions */}
        <div className={`rounded-xl p-4 shadow mb-4 ${isDark ? "bg-gray-800" : "bg-white"}`}>
          <h2 className={`font-semibold mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>
            Quick Actions
          </h2>

          <div className="grid grid-cols-2 gap-3">
            <a href="/payments" className="bg-green-600 text-white rounded-lg p-3 text-center text-sm">
              Make Payment
            </a>
            <a href="/payments" className="bg-blue-600 text-white rounded-lg p-3 text-center text-sm">
              View Transactions
            </a>
            <a href="/profile" className="bg-purple-600 text-white rounded-lg p-3 text-center text-sm">
              My Profile
            </a>
            <a href="/support" className="bg-gray-600 text-white rounded-lg p-3 text-center text-sm">
              Support
            </a>
          </div>
        </div>

        {/* Recent Activity */}
        <div className={`rounded-xl p-4 shadow ${isDark ? "bg-gray-800" : "bg-white"}`}>
          <h2 className={`font-semibold mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>
            Recent Activity
          </h2>

          <div className="space-y-3">
            {[
              { text: "Hospital visit payment", amount: "-RWF 5,000" },
              { text: "Monthly insurance contribution", amount: "-RWF 3,000" },
              { text: "Account credited", amount: "+RWF 10,000" }
            ].map((item, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span className={isDark ? "text-gray-300" : "text-gray-700"}>
                  {item.text}
                </span>
                <span className={item.amount.startsWith("+") ? "text-green-600" : "text-red-600"}>
                  {item.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}