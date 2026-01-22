import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { FiBell } from "react-icons/fi";

// Pie Chart Data
const pieData = [
  { name: "Hospitals", value: 400000 },
  { name: "Clinics", value: 250000 },
  { name: "Pharmacies", value: 150000 },
  { name: "Emergency", value: 200000 },
  { name: "Specialists", value: 180000 },
  { name: "Diagnostics", value: 100000 },
];
const COLORS = ["#4F46E5", "#10B981", "#F59E0B", "#EF4444", "#FBBF24", "#6366F1"];

// Bar Chart Data
const barData = [
  { month: "Jan", value: 7000 },
  { month: "Feb", value: 12000 },
  { month: "Mar", value: 13000 },
  { month: "Apr", value: 15000 },
  { month: "May", value: 12000 },
  { month: "Jun", value: 16000 },
];

function ComprehensiveDashboard() {
  const [user, setUser] = useState({
    name: "Admin User",
    email: "admin@rssb.rw",
    avatar: "https://i.pravatar.cc/150?img=3",
  });

  const [notifications] = useState([
    { message: "Jean Claude paid RWF 35,000", time: "2 min ago", read: false },
    { message: "Pending claim from City Med Hospital", time: "5 min ago", read: false },
    { message: "Alice Uwizera payment delayed", time: "10 min ago", read: false },
  ]);

  const [recentTransactions] = useState([
    { id: "PAY-001", user: "Jean Claude", service: "King Faisal Hospital", amount: 35000, status: "Completed", date: "2024-01-12" },
    { id: "PAY-002", user: "Eric Mugisha", service: "Pharmacy BCM", amount: 8000, status: "Completed", date: "2024-01-10" },
    { id: "PAY-003", user: "Alice Uwizera", service: "Polyclinic Gikondo", amount: 12000, status: "Pending", date: "2024-01-09" },
  ]);

  const [pendingClaims] = useState([
    { hospital: "King Faisal Hospital", amount: "RWF 390,000", claim: "390,000" },
    { hospital: "City Med Hospital", amount: "RWF 130,000", claim: "460,000" },
    { hospital: "Hope Pharmacy", amount: "RWF 48,000", claim: "240,000" },
  ]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-800 text-white p-4 flex flex-col">
        <h2 className="text-xl font-bold mb-8">RSSB HealthPay</h2>
        <nav className="flex flex-col space-y-2 flex-1">
          {["Dashboard","Payments","Claims","Reports","Invoices","Settings"].map((item, idx) => (
            <a key={idx} href="#" className="px-3 py-2 rounded hover:bg-blue-700">{item}</a>
          ))}
        </nav>
        <button className="mt-4 px-3 py-2 text-left hover:bg-blue-700 rounded">Logout</button>
      </aside>

      {/* Main Panel */}
      <main className="flex-1 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <button className="relative text-gray-700">
              <FiBell size={24} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">3</span>
            </button>
            <div className="flex items-center space-x-2">
              <img src={user.avatar} alt="Profile" className="w-8 h-8 rounded-full" />
              <span className="font-medium text-gray-900">{user.name}</span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded shadow text-center">
            <p className="text-sm text-gray-500">Total Payments</p>
            <p className="text-xl font-bold">RWF 1,200,000</p>
          </div>
          <div className="bg-white p-4 rounded shadow text-center">
            <p className="text-sm text-gray-500">Late Payments</p>
            <p className="text-xl font-bold">5</p>
          </div>
          <div className="bg-white p-4 rounded shadow text-center">
            <p className="text-sm text-gray-500">Fraud Alerts</p>
            <p className="text-xl font-bold">2</p>
          </div>
          <div className="bg-white p-4 rounded shadow text-center">
            <p className="text-sm text-gray-500">Pending Claims</p>
            <p className="text-xl font-bold">17</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          <div className="lg:col-span-2 bg-white p-4 rounded shadow">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#4F46E5" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h2 className="font-semibold mb-2">Payments Distribution</h2>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120}>
                  {pieData.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip formatter={value => `RWF ${value.toLocaleString()}`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Action Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold mb-2">Auto MoMo Deduction</h3>
            <p className="text-green-600 font-medium">Jean Claude - RWF 45,000 auto-deducted</p>
            <button className="mt-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">Process More</button>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold mb-2">AI Alerts</h3>
            <ul className="text-sm space-y-2">
              <li className="text-yellow-600">John Mwiza's payment is 5 days overdue</li>
              <li className="text-red-600">Fraud detected in Eric Mugisha's account</li>
              <li className="text-yellow-600">Unusual claim activity at City Med Hospital</li>
            </ul>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold mb-2">Invoice Generated</h3>
            <p>User: Jean Claude</p>
            <p>Service: King Faisal Hospital</p>
            <p>Amount: RWF 45,000</p>
            <p>Date: 24 April 2024</p>
            <button className="mt-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">Download PDF</button>
          </div>
        </div>

        {/* Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Recent Transactions */}
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold mb-4">Recent Transactions</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-gray-500 text-left">
                    <th className="pb-2">User</th>
                    <th className="pb-2">Service</th>
                    <th className="pb-2">Amount</th>
                    <th className="pb-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTransactions.map((transaction, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-2 font-medium">{transaction.user}</td>
                      <td className="py-2">{transaction.service}</td>
                      <td className="py-2">RWF {transaction.amount.toLocaleString()}</td>
                      <td className="py-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          transaction.status === "Completed" 
                            ? "bg-green-100 text-green-700" 
                            : "bg-yellow-100 text-yellow-700"
                        }`}>
                          {transaction.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pending Claims */}
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold mb-4">Pending Claims</h3>
            <div className="space-y-3">
              {pendingClaims.map((claim, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <div>
                    <p className="font-medium">{claim.hospital}</p>
                    <p className="text-sm text-gray-500">Claim: {claim.claim}</p>
                    <p className="text-sm font-medium">{claim.amount}</p>
                  </div>
                  <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                    View
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ComprehensiveDashboard;