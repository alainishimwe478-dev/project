import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function Dashboard() {
  const [stats] = useState({
    totalUsers: 12450,
    activePayments: 8920,
    fraudDetected: 23,
    aiPredictions: 156
  });

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">HealthPay AI Dashboard</h1>
          <Link to="/" className="text-blue-600 hover:text-blue-700">
            ← Back to Homepage
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Users</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
              </div>
              <div className="text-4xl">👥</div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Payments</p>
                <p className="text-3xl font-bold text-green-600">{stats.activePayments.toLocaleString()}</p>
              </div>
              <div className="text-4xl">💳</div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Fraud Detected</p>
                <p className="text-3xl font-bold text-red-600">{stats.fraudDetected}</p>
              </div>
              <div className="text-4xl">🛡️</div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">AI Predictions</p>
                <p className="text-3xl font-bold text-blue-600">{stats.aiPredictions}</p>
              </div>
              <div className="text-4xl">🤖</div>
            </div>
          </div>
        </div>

        {/* AI Features Section */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* AI Alerts */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-4 text-gray-900">🚨 AI Alerts</h3>
            <div className="space-y-3">
              <div className="p-3 bg-red-50 border-l-4 border-red-400 rounded">
                <p className="text-sm text-red-700">High fraud risk detected for payment #12345</p>
                <p className="text-xs text-red-500 mt-1">2 minutes ago</p>
              </div>
              <div className="p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                <p className="text-sm text-yellow-700">Payment delay predicted for user #67890</p>
                <p className="text-xs text-yellow-500 mt-1">15 minutes ago</p>
              </div>
              <div className="p-3 bg-blue-50 border-l-4 border-blue-400 rounded">
                <p className="text-sm text-blue-700">System optimization completed</p>
                <p className="text-xs text-blue-500 mt-1">1 hour ago</p>
              </div>
            </div>
          </div>

          {/* AI Predictions */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-4 text-gray-900">🧠 AI Predictions</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="text-sm text-gray-700">Payment Success Rate</span>
                <span className="text-lg font-bold text-green-600">94.2%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="text-sm text-gray-700">Fraud Risk Level</span>
                <span className="text-lg font-bold text-yellow-600">Low</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="text-sm text-gray-700">System Load</span>
                <span className="text-lg font-bold text-blue-600">Normal</span>
              </div>
            </div>
          </div>
        </div>

        {/* Demo Notice */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
          <h3 className="text-lg font-bold text-blue-900 mb-2">🎯 Dashboard Demo</h3>
          <p className="text-blue-700">
            This is a demo dashboard showing HealthPay AI's capabilities. 
            Real data would be connected via backend APIs.
          </p>
        </div>
      </div>
      </div>
    </div>
  );
}