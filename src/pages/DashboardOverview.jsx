import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from "recharts";
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
  const [dashboardData, setDashboardData] = useState({});
  const [loading, setLoading] = useState(true);
  const { isDark } = useDarkMode();

  useEffect(() => {
    fetch('http://localhost:5000/api/dashboard/overview')
      .then(res => res.json())
      .then(data => {
        setDashboardData(data);
        setLoading(false);
      })
      .catch(() => {
        console.log('Using default dashboard data');
        setDashboardData({
          coverageBalance: 'RWF 150,000',
          monthlySpending: 'RWF 61,000',
          activeAlerts: 2,
          aiScore: '85/100',
          recentActivity: [
            { type: '🏥 Hospital Visit', amount: 'RWF 5,000', date: 'Today' },
            { type: '💊 Pharmacy', amount: 'RWF 2,000', date: 'Yesterday' },
            { type: '🩺 Clinic Visit', amount: 'RWF 3,500', date: '2 days ago' },
            { type: '🏥 Emergency Visit', amount: 'RWF 15,000', date: '3 days ago' },
            { type: '💊 Prescription Refill', amount: 'RWF 1,200', date: '5 days ago' }
          ],
          upcomingAppointments: [
            { hospital: 'CHUK', date: 'Jan 25, 2024', time: '10:00 AM', type: 'Consultation' },
            { hospital: 'King Faisal', date: 'Jan 28, 2024', time: '2:30 PM', type: 'Follow-up' }
          ]
        });
        setLoading(false);
      });
  }, []);

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
          <Card title="Coverage Balance" value={dashboardData.coverageBalance || "RWF 150,000"} trend="+5%" isDark={isDark} />
          <Card title="This Month" value={dashboardData.monthlySpending || "RWF 61,000"} trend="+23%" isDark={isDark} />
          <Card title="Active Alerts" value={dashboardData.activeAlerts || "2"} badge isDark={isDark} />
          <Card title="AI Score" value={dashboardData.aiScore || "85/100"} color="text-green-600" isDark={isDark} />
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
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-2">
              {spendingData.map((item) => (
                <div key={item.name} className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{item.name} ({item.value}%)</span>
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
                <Tooltip formatter={(value) => [`RWF ${value.toLocaleString()}`, 'Amount']} />
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
            <div className="flex justify-between items-center">
              <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Next premium due</span>
              <span className="font-semibold text-red-600">Feb 15, 2024</span>
            </div>
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className={`rounded-xl p-4 shadow mb-4 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className={`font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>Upcoming Appointments</h2>
          <div className="space-y-3">
            {(dashboardData.upcomingAppointments || []).map((appointment, i) => (
              <div key={i} className={`flex justify-between items-center p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <div>
                  <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{appointment.hospital}</p>
                  <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{appointment.type}</p>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{appointment.date}</p>
                  <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{appointment.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`rounded-xl p-4 shadow ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className={`font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>Recent Activity</h2>
          <div className="space-y-2">
            {(dashboardData.recentActivity || []).slice(0, 5).map((activity, i) => (
              <div key={i} className="flex justify-between items-center">
                <div>
                  <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{activity.type}</span>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{activity.date}</p>
                </div>
                <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{activity.amount}</span>
              </div>
            ))}
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