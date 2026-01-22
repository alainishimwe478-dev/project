import React, { useState } from "react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import TopBar from "../components/TopBar";
import SideMenu from "../components/SideMenu";
import BottomNav from "../components/BottomNav";
import { useDarkMode } from "../contexts/DarkModeContext";

const spendingData = [
  { name: "Hospital", value: 65, color: "#3B82F6" },
  { name: "Pharmacy", value: 20, color: "#10B981" },
  { name: "Clinic", value: 15, color: "#F59E0B" }
];

const monthlyData = [
  { month: "Oct", amount: 45000 },
  { month: "Nov", amount: 52000 },
  { month: "Dec", amount: 38000 },
  { month: "Jan", amount: 61000 }
];

export default function DashboardOverview() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isDark } = useDarkMode();

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <TopBar onMenu={() => setMenuOpen(true)} />
      <SideMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className="p-4 pb-28">
        <h1 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Dashboard Overview</h1>

        {/* AI Insight Cards */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-4 text-white mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span>🤖</span>
            <span className="font-semibold">AI Insight</span>
          </div>
          <p className="text-sm">Your spending is 23% higher this month. Consider using generic medications to save RWF 15,000.</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card title="Coverage Balance" value="RWF 150,000" trend="+5%" isDark={isDark} />
          <Card title="This Month" value="RWF 61,000" trend="+23%" isDark={isDark} />
          <Card title="Active Alerts" value="2" badge isDark={isDark} />
          <Card title="AI Score" value="85/100" color="text-green-600" isDark={isDark} />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className={`rounded-xl p-4 shadow ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 className={`font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>Spending Distribution</h3>
            <ResponsiveContainer width="100%" height={150}>
              <PieChart>
                <Pie data={spendingData} dataKey="value" cx="50%" cy="50%" outerRadius={50}>
                  {spendingData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-2">
              {spendingData.map((item) => (
                <div key={item.name} className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={`rounded-xl p-4 shadow ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 className={`font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>Monthly Spending</h3>
            <ResponsiveContainer width="100%" height={150}>
              <BarChart data={monthlyData}>
                <XAxis dataKey="month" />
                <YAxis hide />
                <Bar dataKey="amount" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Predictions */}
        <div className={`rounded-xl p-4 shadow mb-4 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex items-center gap-2 mb-3">
            <span>🔮</span>
            <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>AI Predictions</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Coverage will last</span>
              <span className="font-semibold text-orange-600">1.3 months</span>
            </div>
            <div className="flex justify-between items-center">
              <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Recommended top-up</span>
              <span className="font-semibold text-blue-600">RWF 75,000</span>
            </div>
            <div className="flex justify-between items-center">
              <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Fraud risk level</span>
              <span className="font-semibold text-green-600">Low</span>
            </div>
          </div>
        </div>

        <div className={`rounded-xl p-4 shadow ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className={`font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>Recent Activity</h2>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>🏥 Hospital Visit</span>
              <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>RWF 5,000</span>
            </div>
            <div className="flex justify-between items-center">
              <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>💊 Pharmacy</span>
              <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>RWF 2,000</span>
            </div>
            <div className="flex justify-between items-center">
              <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>🩺 Clinic Visit</span>
              <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>RWF 3,500</span>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

function Card({ title, value, trend, badge, color = "text-gray-900", isDark }) {
  return (
    <div className={`rounded-xl p-4 shadow relative ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
      {badge && <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>}
      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{title}</p>
      <p className={`text-lg font-semibold ${isDark ? (color.includes('green') ? 'text-green-400' : 'text-white') : color}`}>{value}</p>
      {trend && <p className="text-xs text-green-600">{trend}</p>}
    </div>
  );
}