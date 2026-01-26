import React, { useState } from "react";
import { Link } from "react-router-dom";
import TopBar from "../components/TopBar";
import SideMenu from "../components/SideMenu";
import BottomNav from "../components/BottomNav";
import { useDarkMode } from "../contexts/DarkModeContext";

export default function Payments() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isDark } = useDarkMode();

  return (
    <div className={`min-h-screen ${isDark ? "bg-gray-900" : "bg-gray-100"}`}>
      <TopBar onMenu={() => setMenuOpen(true)} />
      <SideMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className="p-4 pb-28">
        <h1
          className={`text-xl font-semibold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}
        >
          Payments
        </h1>

        <div
          className={`rounded-xl p-4 shadow mb-4 ${isDark ? "bg-gray-800" : "bg-white"}`}
        >
          <h2
            className={`font-semibold mb-3 ${isDark ? "text-white" : "text-gray-900"}`}
          >
            Payment Methods
          </h2>
          <div className="space-y-2">
            <div
              className={`flex items-center gap-3 p-2 rounded-lg ${isDark ? "bg-gray-700" : "bg-gray-50"}`}
            >
              <span>📱</span>
              <span className={isDark ? "text-gray-200" : "text-gray-700"}>
                MTN Mobile Money
              </span>
            </div>
            <div
              className={`flex items-center gap-3 p-2 rounded-lg ${isDark ? "bg-gray-700" : "bg-gray-50"}`}
            >
              <span>🏦</span>
              <span className={isDark ? "text-gray-200" : "text-gray-700"}>
                Bank of Kigali
              </span>
            </div>
          </div>
        </div>

        <div
          className={`rounded-xl p-4 shadow ${isDark ? "bg-gray-800" : "bg-white"}`}
        >
          <h2
            className={`font-semibold mb-3 ${isDark ? "text-white" : "text-gray-900"}`}
          >
            Recent Transactions
          </h2>
          <div className="space-y-3">
            <div
              className={`flex justify-between items-center border-b pb-2 ${isDark ? "border-gray-700" : "border-gray-200"}`}
            >
              <div>
                <p
                  className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}
                >
                  🏥 Hospital Visit
                </p>
                <p
                  className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}
                >
                  Jan 15, 2024
                </p>
              </div>
              <span className="font-semibold text-red-600">-RWF 5,000</span>
            </div>
            <div
              className={`flex justify-between items-center border-b pb-2 ${isDark ? "border-gray-700" : "border-gray-200"}`}
            >
              <div>
                <p
                  className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}
                >
                  💊 Pharmacy
                </p>
                <p
                  className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}
                >
                  Jan 12, 2024
                </p>
              </div>
              <span className="font-semibold text-red-600">-RWF 2,000</span>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p
                  className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}
                >
                  🩺 Clinic Visit
                </p>
                <p
                  className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}
                >
                  Jan 10, 2024
                </p>
              </div>
              <span className="font-semibold text-red-600">-RWF 3,500</span>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
