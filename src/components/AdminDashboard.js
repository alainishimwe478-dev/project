import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PaymentAuditTrail from './PaymentAuditTrail';
import FraudDetection from './FraudDetection';
import PaymentChart from './PaymentChart';
import ThemeToggle from './ThemeToggle';
import Sidebar from './Sidebar';

const ProfileDropdown = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        <div className="w-10 h-10 bg-[#F5C400] rounded-full flex items-center justify-center font-bold text-[#003A8F]">
          {user.name.charAt(0)}
        </div>
        <svg className={`w-4 h-4 text-gray-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
          <Link to="/profile" className="block px-4 py-2 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <p className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
          </Link>
          <Link to="/profile" className="flex items-center gap-3 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <span className="text-lg">👤</span>
            <span className="text-sm">View Profile</span>
          </Link>
          <Link to="/settings" className="flex items-center gap-3 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
            <span className="text-lg">⚙️</span>
            <span className="text-sm">Settings</span>
          </Link>
          <hr className="my-2 border-gray-200 dark:border-gray-600" />
          <Link to="/logout" className="flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
            <span className="text-lg">🚪</span>
            <span className="text-sm">Logout</span>
          </Link>
        </div>
      )}
    </div>
  );
};

function AdminDashboard() {
  const [showPaymentAudit, setShowPaymentAudit] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [user, setUser] = useState({
    id: 1,
    name: "Admin User",
    email: "admin@rssb.rw",
    role: "admin"
  });
  
  const [stats, setStats] = useState({
    totalUsers: 24580,
    totalHospitals: 312,
    monthlyPayments: 1200000000,
    fraudAlerts: 18
  });

  const [payments, setPayments] = useState([]);
  const [claims, setClaims] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/admin/stats")
      .then(res => res.json())
      .then(data => setStats(prev => ({ ...prev, ...data })))
      .catch(() => console.log('Using default stats data'));
    
    fetch(`http://localhost:5000/api/profile/${user.id}`)
      .then(res => res.json())
      .then(data => setUser(prev => ({ ...prev, ...data })))
      .catch(() => console.log('Using default user data'));
    
    fetch("http://localhost:5000/api/payments")
      .then(res => res.json())
      .then(data => setPayments(data))
      .catch(() => console.log('Using default payments data'));
    
    fetch("http://localhost:5000/api/admin/claims")
      .then(res => res.json())
      .then(data => setClaims(Array.isArray(data) ? data : data.claims || []))
      .catch(() => {
        console.log('Using default claims data');
        setClaims([
          { userName: "Jean Paul Uwimana", type: "🏥 Medical Claim", amount: "25,000 RWF", status: "Approved", date: "Jan 15, 2024" },
          { userName: "Aline Mukamana", type: "💊 Pharmacy Claim", amount: "12,000 RWF", status: "Pending", date: "Jan 12, 2024" },
          { userName: "Eric Nshimiyimana", type: "🩺 Consultation Claim", amount: "8,500 RWF", status: "Rejected", date: "Jan 10, 2024" }
        ]);
      });
  }, []);

  const StatCard = ({ title, value, alert }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow border border-gray-200 dark:border-gray-700">
      <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
      <h2 className={`text-2xl font-bold ${alert ? "text-red-500" : "text-[#003A8F] dark:text-blue-400"}`}>
        {value}
      </h2>
    </div>
  );

  return (
    <div className="flex">
      <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
      <div className={`flex-1 ${sidebarCollapsed ? 'ml-20' : 'ml-64'} transition-all duration-300`}>
        <div className="space-y-6 bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-[#003A8F] dark:text-blue-400">RSSB Admin Dashboard</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">HealthPay AI – Real-time monitoring | Welcome, {user.name}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM11 19H6.5A2.5 2.5 0 014 16.5v-9A2.5 2.5 0 016.5 5h11A2.5 2.5 0 0120 7.5v3.5" />
                  </svg>
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                    3
                  </span>
                </button>
              </div>
              <ThemeToggle />
              <ProfileDropdown user={user} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatCard title="Total Users" value="24,580" />
            <StatCard title="Hospitals" value="312" />
            <StatCard title="Monthly Payments" value="RWF 1.2B" />
            <StatCard title="Fraud Alerts" value="18" alert />
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-[#003A8F] dark:text-blue-400">
                Payments Overview by Healthcare Category
              </h3>
              <select className="text-sm border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                <option>Last 6 Months</option>
                <option>Last 12 Months</option>
                <option>This Year</option>
              </select>
            </div>
            <PaymentChart />
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-[#003A8F] dark:text-blue-400">
                Recent Transactions
              </h3>
              <Link to="/admin-payments" className="text-[#003A8F] dark:text-blue-400 hover:underline text-sm font-medium">
                View All Payments →
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-[#003A8F] text-white">
                  <tr>
                    <th className="p-3 text-left">User</th>
                    <th className="p-3 text-left">Hospital</th>
                    <th className="p-3 text-left">Amount</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3 text-left">AI Score</th>
                  </tr>
                </thead>
                <tbody className="dark:text-gray-300">
                  {payments.length > 0 ? payments.slice(0, 5).map((payment, i) => (
                    <tr key={i} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="p-3">{payment.userName || payment.user}</td>
                      <td className="p-3">{payment.hospital}</td>
                      <td className="p-3">{payment.amount}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          payment.status === 'Approved' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                          payment.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                          'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                        }`}>
                          {payment.status}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className={`font-medium ${
                          parseFloat(payment.aiScore) > 95 ? 'text-green-600 dark:text-green-400' :
                          parseFloat(payment.aiScore) > 80 ? 'text-yellow-600 dark:text-yellow-400' :
                          'text-red-600 dark:text-red-400'
                        }`}>
                          {payment.aiScore}%
                        </span>
                      </td>
                    </tr>
                  )) : [
                    ["Jean Paul Uwimana", "CHUK", "45,000 RWF", "Approved", "98.5%"],
                    ["Aline Mukamana", "King Faisal Hospital", "72,000 RWF", "Pending", "95.2%"],
                    ["Eric Nshimiyimana", "Ruhengeri Hospital", "18,500 RWF", "Rejected", "67.8%"],
                    ["Marie Uwimana", "Butaro Hospital", "32,000 RWF", "Approved", "99.1%"],
                    ["Claude Habimana", "Kibagabaga Hospital", "28,500 RWF", "Approved", "96.7%"],
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                      {row.map((cell, j) => (
                        <td key={j} className="p-3">
                          {j === 3 ? (
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              cell === 'Approved' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                              cell === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                              'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                            }`}>
                              {cell}
                            </span>
                          ) : j === 4 ? (
                            <span className={`font-medium ${
                              parseFloat(cell) > 95 ? 'text-green-600 dark:text-green-400' :
                              parseFloat(cell) > 80 ? 'text-yellow-600 dark:text-yellow-400' :
                              'text-red-600 dark:text-red-400'
                            }`}>
                              {cell}
                            </span>
                          ) : cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Claims Table */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-[#003A8F] dark:text-blue-400">
                Recent Claims
              </h3>
              <Link to="/admin/claims" className="text-[#003A8F] dark:text-blue-400 hover:underline text-sm font-medium">
                View All Claims →
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-[#003A8F] text-white">
                  <tr>
                    <th className="p-3 text-left">User</th>
                    <th className="p-3 text-left">Type</th>
                    <th className="p-3 text-left">Amount</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3 text-left">Date</th>
                  </tr>
                </thead>
                <tbody className="dark:text-gray-300">
                  {claims.length > 0 ? claims.slice(0, 5).map((claim, i) => (
                    <tr key={i} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="p-3">{claim.userName || claim.user}</td>
                      <td className="p-3">{claim.type}</td>
                      <td className="p-3">{claim.amount}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          claim.status === 'Approved' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                          claim.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                          'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                        }`}>
                          {claim.status}
                        </span>
                      </td>
                      <td className="p-3">{claim.date || claim.createdAt}</td>
                    </tr>
                  )) : [
                    ["Jean Paul Uwimana", "🏥 Medical Claim", "25,000 RWF", "Approved", "Jan 15, 2024"],
                    ["Aline Mukamana", "💊 Pharmacy Claim", "12,000 RWF", "Pending", "Jan 12, 2024"],
                    ["Eric Nshimiyimana", "🩺 Consultation Claim", "8,500 RWF", "Rejected", "Jan 10, 2024"]
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                      {row.map((cell, j) => (
                        <td key={j} className="p-3">
                          {j === 3 ? (
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              cell === 'Approved' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                              cell === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                              'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                            }`}>
                              {cell}
                            </span>
                          ) : cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {showPaymentAudit && <PaymentAuditTrail />}
          <FraudDetection />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;