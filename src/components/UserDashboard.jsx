import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

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

const ProfileDropdown = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };
  
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        <div className="w-10 h-10 bg-[#F5C400] rounded-full flex items-center justify-center font-bold text-[#003A8F]">
          {user?.name?.charAt(0) || 'U'}
        </div>
        <svg className={`w-4 h-4 text-gray-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
          <div className="block px-4 py-2 border-b border-gray-200 dark:border-gray-700">
            <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.name || 'User'}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email || 'user@example.com'}</p>
          </div>
          <Link to="/profile" className="flex items-center gap-3 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <span className="text-lg">👤</span>
            <span className="text-sm">View Profile</span>
          </Link>
          <Link to="/settings" className="flex items-center gap-3 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
            <span className="text-lg">⚙️</span>
            <span className="text-sm">Settings</span>
          </Link>
          <hr className="my-2 border-gray-200 dark:border-gray-600" />
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 w-full text-left">
            <span className="text-lg">🚪</span>
            <span className="text-sm">Logout</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default function UserDashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");
    if (!storedUser) {
      navigate("/login");
      return;
    }
    setUser(storedUser);
  }, [navigate]);
  
  const [dashboardData, setDashboardData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/user/dashboard')
      .then(res => res.json())
      .then(data => {
        setDashboardData(data);
        setLoading(false);
      })
      .catch(() => {
        console.log('Using default user dashboard data');
        setDashboardData({
          coverageBalance: 'RWF 150,000',
          monthlySpending: 'RWF 61,000',
          activeAlerts: 2,
          claimsThisMonth: 3,
          recentTransactions: [
            { type: '🏥 Hospital Visit', hospital: 'CHUK', amount: 'RWF 25,000', date: 'Today', status: 'Approved' },
            { type: '💊 Pharmacy', hospital: 'Pharmacy Plus', amount: 'RWF 12,000', date: 'Yesterday', status: 'Approved' },
            { type: '🩺 Clinic Visit', hospital: 'Health Center', amount: 'RWF 8,500', date: '2 days ago', status: 'Pending' }
          ],
          upcomingAppointments: [
            { hospital: 'CHUK', date: 'Jan 25, 2024', time: '10:00 AM', type: 'Consultation', doctor: 'Dr. Mukamana' },
            { hospital: 'King Faisal', date: 'Jan 28, 2024', time: '2:30 PM', type: 'Follow-up', doctor: 'Dr. Nshimiyimana' }
          ]
        });
        setLoading(false);
      });
  }, []);

  const StatCard = ({ title, value, trend, icon, color = "text-[#003A8F]" }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
          <h2 className={`text-2xl font-bold ${color} dark:text-blue-400`}>{value}</h2>
          {trend && <p className="text-xs text-green-600">{trend}</p>}
        </div>
        <span className="text-3xl">{icon}</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-[#003A8F] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">R</span>
                </div>
                <span className="text-xl font-bold text-[#003A8F] dark:text-blue-400">RSSB HealthPay</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM11 19H6.5A2.5 2.5 0 014 16.5v-9A2.5 2.5 0 016.5 5h11A2.5 2.5 0 0120 7.5v3.5" />
                  </svg>
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                    {dashboardData.activeAlerts || 2}
                  </span>
                </button>
              </div>
              <ProfileDropdown user={user} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome back, {user?.name || 'User'}</h1>
          <p className="text-gray-600 dark:text-gray-400">Member ID: RSSB-2024-001</p>
        </div>

        {/* AI Insight Card */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span>🤖</span>
            <span className="font-semibold">AI Health Insight</span>
          </div>
          <p className="text-sm">Your spending is 23% higher this month. Consider using generic medications to save RWF 15,000. Your next premium payment is due in 15 days.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard title="Coverage Balance" value={dashboardData.coverageBalance || "RWF 150,000"} trend="+5%" icon="💰" />
          <StatCard title="This Month Spending" value={dashboardData.monthlySpending || "RWF 61,000"} trend="+23%" icon="📊" />
          <StatCard title="Claims This Month" value={dashboardData.claimsThisMonth || "3"} icon="📄" />
          <StatCard title="Active Alerts" value={dashboardData.activeAlerts || "2"} icon="🔔" color="text-red-500" />
        </div>

        {/* Charts and Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Spending Chart */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Spending Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Distribution</h4>
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
                      <span className="text-xs text-gray-600 dark:text-gray-400">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Monthly Trend</h4>
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
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link to="/claims" className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                <span className="text-2xl">📄</span>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Submit Claim</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">File a new insurance claim</p>
                </div>
              </Link>
              <Link to="/payments" className="flex items-center gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
                <span className="text-2xl">💳</span>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">View Payments</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Check payment history</p>
                </div>
              </Link>
              <button className="flex items-center gap-3 p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors w-full text-left">
                <span className="text-2xl">🏥</span>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Find Hospital</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Locate nearby facilities</p>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Recent Activity and Appointments */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Transactions */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Recent Transactions</h3>
              <Link to="/payments" className="text-[#003A8F] dark:text-blue-400 hover:underline text-sm font-medium">
                View All →
              </Link>
            </div>
            <div className="space-y-4">
              {(dashboardData.recentTransactions || []).map((transaction, i) => (
                <div key={i} className="flex justify-between items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{transaction.type}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{transaction.hospital} • {transaction.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900 dark:text-white">{transaction.amount}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      transaction.status === 'Approved' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                    }`}>
                      {transaction.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Appointments */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Upcoming Appointments</h3>
            <div className="space-y-4">
              {(dashboardData.upcomingAppointments || []).map((appointment, i) => (
                <div key={i} className="flex justify-between items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{appointment.hospital}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{appointment.type} with {appointment.doctor}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{appointment.date}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{appointment.time}</p>
                  </div>
                </div>
              ))}
              <button className="w-full p-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:border-[#003A8F] hover:text-[#003A8F] transition-colors">
                + Schedule New Appointment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}