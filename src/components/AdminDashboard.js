import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HealthPayAI from './HealthPayAI';
import Navbar from './Navbar';

function AdminDashboard() {
  const navigate = useNavigate();
  const [showHealthPayAI, setShowHealthPayAI] = useState(false);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalHospitals: 0,
    totalClaims: 0,
    totalPayments: 0,
    totalPaidAmount: { _sum: { amount: 0 } }
  });
  const [recentClaims, setRecentClaims] = useState([]);
  const [fraudClaims, setFraudClaims] = useState([]);

  useEffect(() => {
    // Fetch admin stats
    fetch("http://localhost:5000/api/admin/stats")
      .then(res => res.json())
      .then(setStats)
      .catch(console.error);

    // Fetch recent claims
    fetch("http://localhost:5000/api/admin/recent-claims")
      .then(res => res.json())
      .then(setRecentClaims)
      .catch(console.error);

    // Fetch fraud claims
    fetch("http://localhost:5000/api/admin/fraud-claims")
      .then(res => res.json())
      .then(setFraudClaims)
      .catch(console.error);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 animate-fade-in">
      <nav className="bg-white shadow">
        <div className="flex-1 flex flex-col">
          <Navbar
            onHealthPayAIClick={() => setShowHealthPayAI(true)}
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-gray-900">RSSB HealthPay - Admin</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowHealthPayAI(true)}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                🤖 HealthPay AI
              </button>
              <button
                onClick={() => navigate('/admin-users')}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Manage Users
              </button>
              <button
                onClick={handleLogout}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-red-500 rounded-md flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Total Users
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {stats.totalUsers.toLocaleString()}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Hospitals
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {stats.totalHospitals.toLocaleString()}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Total Payments
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        $45,678
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Reports
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        View Analytics
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <div className="text-sm">
                  <button className="font-medium text-indigo-600 hover:text-indigo-500">
                    View reports
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Recent Activity
              </h3>
              <div className="space-y-4">
                {recentClaims.slice(0, 3).map((claim, index) => (
                  <div key={claim.id} className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className={`w-2 h-2 rounded-full ${claim.aiRisk === 'HIGH' ? 'bg-red-400' : 'bg-green-400'}`}></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        Claim Submitted - {claim.user?.name || 'Unknown User'}
                      </p>
                      <p className="text-sm text-gray-500">
                        Amount: RWF {claim.amount} • Risk: {claim.aiRisk}
                      </p>
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(claim.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                ))}
                {fraudClaims.slice(0, 2).map((claim, index) => (
                  <div key={`fraud-${claim.id}`} className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-red-900 truncate">
                        ⚠️ Fraud Alert - {claim.user?.name || 'Unknown User'}
                      </p>
                      <p className="text-sm text-gray-500">
                        High-risk claim: RWF {claim.amount}
                      </p>
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(claim.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                ))}
                {recentClaims.length === 0 && fraudClaims.length === 0 && (
                  <p className="text-gray-500 text-sm">No recent activity</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* HealthPay AI Modal */}
      <HealthPayAI isOpen={showHealthPayAI} onClose={() => setShowHealthPayAI(false)} />
    </div>
  );
}

export default AdminDashboard;
