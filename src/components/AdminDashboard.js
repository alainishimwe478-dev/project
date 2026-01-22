import React, { useState, useEffect } from 'react';

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 8450,
    totalHospitals: 76,
    totalClaims: 320,
    totalPayments: 1200000,
    totalPaidAmount: { _sum: { amount: 0 } }
  });
  
  const [userActivity] = useState([
    { name: "Jean Claude", action: "Paid RWF 20,000 to Pharmacy", time: "2 min ago" },
    { name: "Olivia Uwimana", action: "Logged in", time: "5 min ago" },
    { name: "Eric Mugisha", action: "Paid RWF 45,000 to King Faisal", time: "10 min ago" },
    { name: "Alice Mukamuranga", action: "Renewed insurance", time: "15 min ago" },
    { name: "Thierry Habimana", action: "Updated profile", time: "20 min ago" }
  ]);
  
  const [recentPayments] = useState([
    { user: "Jean Claude", purpose: "King Faisal Hospital", amount: "RWF 35,000", date: "12 Jan 2024" },
    { user: "Eric Mugisha", purpose: "Pharmacy BCM", amount: "RWF 8,000", date: "10 Jan 2024" },
    { user: "Alice Uwizera", purpose: "Polyclinic Gikondo", amount: "RWF 12,000", date: "09 Jan 2024" },
    { user: "Amahle Hluphi", purpose: "Pharmacy", amount: "RWF 13,000", date: "06 Jan 2024" },
    { user: "Thierry Habimana", purpose: "Kacyiru Health Center", amount: "RWF 18,000", date: "05 Jan 2024" }
  ]);

  const [pendingClaims] = useState([
    { hospital: "King Faisal Hospital", amount: "RWF 390,000", claim: "390,000" },
    { hospital: "City Med Hospital", amount: "RWF 130,000", claim: "460,000" },
    { hospital: "Hope Pharmacy", amount: "RWF 48,000", claim: "240,000" }
  ]);

  useEffect(() => {
    // Fetch admin stats from API when available
    fetch("http://localhost:5000/api/admin/stats")
      .then(res => res.json())
      .then(data => setStats(prev => ({ ...prev, ...data })))
      .catch(() => {
        // Use default stats if API is not available
        console.log('Using default stats data');
      });
  }, []);

  const StatCard = ({ icon, title, value, subtitle, bgColor, iconColor }) => (
    <div className="bg-white rounded-lg p-6 shadow-sm border">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className={`w-12 h-12 rounded-lg ${bgColor} flex items-center justify-center`}>
          <span className={`text-xl ${iconColor}`}>{icon}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">RSSB Dashboard</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon="💰"
          title="Total Payments"
          value={`RWF ${stats.totalPayments?.toLocaleString()}`}
          bgColor="bg-yellow-100"
          iconColor="text-yellow-600"
        />
        <StatCard
          icon="✅"
          title="Active Users"
          value={stats.totalUsers?.toLocaleString()}
          bgColor="bg-green-100"
          iconColor="text-green-600"
        />
        <StatCard
          icon="⏳"
          title="Pending Claims"
          value={stats.totalClaims}
          bgColor="bg-orange-100"
          iconColor="text-orange-600"
        />
        <StatCard
          icon="🏥"
          title="Hospitals Registered"
          value={stats.totalHospitals}
          bgColor="bg-blue-100"
          iconColor="text-blue-600"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Payments Overview Chart */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Payments Overview</h2>
              <select className="text-sm border border-gray-300 rounded-md px-3 py-1">
                <option>Last 6 Months</option>
                <option>Last 12 Months</option>
                <option>This Year</option>
              </select>
            </div>
            <div className="h-64 bg-gray-50 rounded-lg p-6">
              <div className="h-full flex items-end justify-center space-x-4">
                {/* Hospitals Bar */}
                <div className="flex flex-col items-center">
                  <div className="flex flex-col justify-end h-40">
                    <div 
                      className="bg-blue-500 rounded-t-lg transition-all duration-1000 ease-out flex items-end justify-center text-white text-xs font-medium"
                      style={{ height: '140px', width: '45px' }}
                    >
                      <span className="mb-1">85%</span>
                    </div>
                  </div>
                  <div className="text-center mt-2">
                    <p className="text-xs font-medium text-gray-700">Hospitals</p>
                    <p className="text-xs text-gray-500">RWF 680K</p>
                  </div>
                </div>

                {/* Clinics Bar */}
                <div className="flex flex-col items-center">
                  <div className="flex flex-col justify-end h-40">
                    <div 
                      className="bg-green-500 rounded-t-lg transition-all duration-1000 ease-out flex items-end justify-center text-white text-xs font-medium"
                      style={{ height: '100px', width: '45px' }}
                    >
                      <span className="mb-1">60%</span>
                    </div>
                  </div>
                  <div className="text-center mt-2">
                    <p className="text-xs font-medium text-gray-700">Clinics</p>
                    <p className="text-xs text-gray-500">RWF 240K</p>
                  </div>
                </div>

                {/* Pharmacies Bar */}
                <div className="flex flex-col items-center">
                  <div className="flex flex-col justify-end h-40">
                    <div 
                      className="bg-purple-500 rounded-t-lg transition-all duration-1000 ease-out flex items-end justify-center text-white text-xs font-medium"
                      style={{ height: '75px', width: '45px' }}
                    >
                      <span className="mb-1">45%</span>
                    </div>
                  </div>
                  <div className="text-center mt-2">
                    <p className="text-xs font-medium text-gray-700">Pharmacies</p>
                    <p className="text-xs text-gray-500">RWF 180K</p>
                  </div>
                </div>

                {/* Emergency Services Bar */}
                <div className="flex flex-col items-center">
                  <div className="flex flex-col justify-end h-40">
                    <div 
                      className="bg-red-500 rounded-t-lg transition-all duration-1000 ease-out flex items-end justify-center text-white text-xs font-medium"
                      style={{ height: '120px', width: '45px' }}
                    >
                      <span className="mb-1">72%</span>
                    </div>
                  </div>
                  <div className="text-center mt-2">
                    <p className="text-xs font-medium text-gray-700">Emergency</p>
                    <p className="text-xs text-gray-500">RWF 290K</p>
                  </div>
                </div>

                {/* Specialist Services Bar */}
                <div className="flex flex-col items-center">
                  <div className="flex flex-col justify-end h-40">
                    <div 
                      className="bg-yellow-500 rounded-t-lg transition-all duration-1000 ease-out flex items-end justify-center text-white text-xs font-medium"
                      style={{ height: '90px', width: '45px' }}
                    >
                      <span className="mb-1">55%</span>
                    </div>
                  </div>
                  <div className="text-center mt-2">
                    <p className="text-xs font-medium text-gray-700">Specialists</p>
                    <p className="text-xs text-gray-500">RWF 220K</p>
                  </div>
                </div>

                {/* Diagnostics Bar */}
                <div className="flex flex-col items-center">
                  <div className="flex flex-col justify-end h-40">
                    <div 
                      className="bg-indigo-500 rounded-t-lg transition-all duration-1000 ease-out flex items-end justify-center text-white text-xs font-medium"
                      style={{ height: '65px', width: '45px' }}
                    >
                      <span className="mb-1">40%</span>
                    </div>
                  </div>
                  <div className="text-center mt-2">
                    <p className="text-xs font-medium text-gray-700">Diagnostics</p>
                    <p className="text-xs text-gray-500">RWF 160K</p>
                  </div>
                </div>
              </div>
              
              {/* Chart Legend */}
              <div className="grid grid-cols-3 gap-2 mt-4 text-xs">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-blue-500 rounded"></div>
                  <span className="text-gray-600">Hospitals</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded"></div>
                  <span className="text-gray-600">Clinics</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-purple-500 rounded"></div>
                  <span className="text-gray-600">Pharmacies</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-red-500 rounded"></div>
                  <span className="text-gray-600">Emergency</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-yellow-500 rounded"></div>
                  <span className="text-gray-600">Specialists</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-indigo-500 rounded"></div>
                  <span className="text-gray-600">Diagnostics</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pending Claims */}
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Pending Claims</h2>
          <div className="space-y-4">
            {pendingClaims.map((claim, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{claim.hospital}</p>
                  <p className="text-sm text-gray-500">Claim: {claim.claim}</p>
                  <p className="text-sm font-medium text-gray-900">{claim.amount}</p>
                </div>
                <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700">
                  View
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Grid - User Activity & Recent Payments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Activity */}
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">User Activity</h2>
          <div className="space-y-4">
            {userActivity.map((activity, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-600">
                    {activity.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.name}</p>
                  <p className="text-sm text-gray-500">{activity.action}</p>
                </div>
                <span className="text-xs text-gray-400">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Payments */}
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Payments</h2>
            <button className="text-sm text-blue-600 hover:text-blue-700">Export</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="pb-2">User</th>
                  <th className="pb-2">Payment For</th>
                  <th className="pb-2">Amount</th>
                  <th className="pb-2">Date</th>
                  <th className="pb-2"></th>
                </tr>
              </thead>
              <tbody className="space-y-2">
                {recentPayments.map((payment, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-2 font-medium text-gray-900">{payment.user}</td>
                    <td className="py-2 text-gray-600">{payment.purpose}</td>
                    <td className="py-2 font-medium text-gray-900">{payment.amount}</td>
                    <td className="py-2 text-gray-500">{payment.date}</td>
                    <td className="py-2">
                      <button className="px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
