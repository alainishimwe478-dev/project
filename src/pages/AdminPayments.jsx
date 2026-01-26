import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function AdminPayments() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [payments, setPayments] = useState([]);
  const [stats, setStats] = useState({
    total: 68000,
    completed: 43000,
    pending: 25000
  });

  useEffect(() => {
    // Fetch payments data
    fetch('http://localhost:5000/api/payments')
      .then(res => res.json())
      .then(data => setPayments(data))
      .catch(() => console.log('Using default payments data'));
    
    // Fetch payment stats
    fetch('http://localhost:5000/api/payments/stats')
      .then(res => res.json())
      .then(data => setStats(prev => ({ ...prev, ...data })))
      .catch(() => console.log('Using default stats data'));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-[#003A8F] text-white transition-all duration-300 fixed h-screen left-0 top-0 shadow-lg z-40`}>
        <div className="p-4 flex items-center justify-between">
          <div className={`flex items-center space-x-3 ${!sidebarOpen && 'hidden'}`}>
            <div className="w-8 h-8 bg-[#F5C400] rounded-full flex items-center justify-center">
              <span className="text-[#003A8F] font-bold text-sm">R</span>
            </div>
            <span className="font-bold text-lg">HealthPay AI</span>
          </div>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white hover:bg-[#002F73] p-2 rounded">
            {sidebarOpen ? '✕' : '☰'}
          </button>
        </div>
        <nav className="mt-8 space-y-2 px-4">
          <Link to="/admin-payments" className="block px-4 py-2 rounded bg-[#F5C400] text-[#003A8F] font-semibold transition">
            {sidebarOpen ? '💳 Payments' : '💳'}
          </Link>
        </nav>
      </aside>

      <div className={`${sidebarOpen ? 'ml-64' : 'ml-20'} w-full transition-all duration-300`}>
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">💳 Payments</h1>
            <Link to="/payments" className="text-[#003A8F] hover:text-[#002F73]">
              ← Back
            </Link>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-sm text-gray-600">Total Payments</p>
              <p className="text-3xl font-bold text-[#003A8F]">RWF {stats.total.toLocaleString()}</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-3xl font-bold text-green-600">{stats.completed.toLocaleString()}</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-3xl font-bold text-yellow-600">{stats.pending.toLocaleString()}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left font-bold text-gray-900">Payment ID</th>
                  <th className="px-6 py-3 text-left font-bold text-gray-900">Amount</th>
                  <th className="px-6 py-3 text-left font-bold text-gray-900">Method</th>
                  <th className="px-6 py-3 text-left font-bold text-gray-900">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-50">
                  <td className="px-6 py-3">PAY-001</td>
                  <td className="px-6 py-3">RWF 35,000</td>
                  <td className="px-6 py-3">MoMo</td>
                  <td className="px-6 py-3"><span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">Completed</span></td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="px-6 py-3">PAY-002</td>
                  <td className="px-6 py-3">RWF 8,000</td>
                  <td className="px-6 py-3">Bank</td>
                  <td className="px-6 py-3"><span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">Completed</span></td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="px-6 py-3">PAY-003</td>
                  <td className="px-6 py-3">RWF 12,000</td>
                  <td className="px-6 py-3">MoMo</td>
                  <td className="px-6 py-3"><span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs font-bold">Pending</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
