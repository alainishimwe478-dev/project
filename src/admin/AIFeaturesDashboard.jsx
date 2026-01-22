import React, { useState } from 'react';

export default function AIFeaturesDashboard() {
  const [autoPayEnabled, setAutoPayEnabled] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  // Auto-Pay Attempts Data
  const [autoPayAttempts] = useState([
    { id: 'AP001', client: 'Jean Claude', amount: 'RWF 35,000', status: 'Success', date: '2024-01-15 14:30', method: 'MTN MoMo' },
    { id: 'AP002', client: 'Alice Uwizera', amount: 'RWF 12,000', status: 'Failed', date: '2024-01-15 15:45', method: 'Airtel Money' },
    { id: 'AP003', client: 'Eric Mugisha', amount: 'RWF 8,000', status: 'Success', date: '2024-01-15 16:20', method: 'Bank Transfer' }
  ]);

  // Late Payments Data
  const [latePayments] = useState([
    { client: 'John Mwiza', amount: 'RWF 25,000', daysLate: 5, riskLevel: 'Medium' },
    { client: 'Marie Uwimana', amount: 'RWF 45,000', daysLate: 12, riskLevel: 'High' },
    { client: 'Paul Nzeyimana', amount: 'RWF 15,000', daysLate: 3, riskLevel: 'Low' }
  ]);

  // Fraud Alerts Data
  const [fraudAlerts] = useState([
    { client: 'Eric Mugisha', alert: 'Multiple failed payment attempts', severity: 'High', date: '2024-01-15' },
    { client: 'Unknown User', alert: 'Unusual claim pattern detected', severity: 'Medium', date: '2024-01-14' },
    { client: 'City Med Hospital', alert: 'Abnormal claim frequency', severity: 'Low', date: '2024-01-13' }
  ]);

  // AI Notifications
  const [notifications] = useState([
    { message: 'AI auto-pay failed for Alice Uwizera - Insufficient funds', time: '10 min ago', type: 'error' },
    { message: 'High-risk client flagged: Marie Uwimana', time: '25 min ago', type: 'warning' },
    { message: 'Auto-pay successful for Jean Claude', time: '1 hour ago', type: 'success' }
  ]);

  const handleManualAutoPay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      alert('AI Auto-Pay process completed');
    }, 2000);
  };

  const getStatusColor = (status) => {
    return status === 'Success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">AI Features Dashboard</h1>
        <p className="text-gray-600">Manage AI-powered payment automation and monitoring</p>
      </div>

      {/* Auto-Pay Control Panel */}
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">🤖 Auto-Pay Control Panel</h2>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleManualAutoPay}
              disabled={isProcessing}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {isProcessing ? 'Processing...' : '▶️ Run AI Auto-Pay'}
            </button>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-700">Auto-Pay Enabled:</span>
              <button 
                onClick={() => setAutoPayEnabled(!autoPayEnabled)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                  autoPayEnabled ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                  autoPayEnabled ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>
          </div>
        </div>

        {/* Auto-Pay Attempts Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-gray-500 text-left">
                <th className="pb-2">ID</th>
                <th className="pb-2">Client</th>
                <th className="pb-2">Amount</th>
                <th className="pb-2">Method</th>
                <th className="pb-2">Status</th>
                <th className="pb-2">Date/Time</th>
              </tr>
            </thead>
            <tbody>
              {autoPayAttempts.map((attempt) => (
                <tr key={attempt.id} className="border-b">
                  <td className="py-2 font-mono text-xs">{attempt.id}</td>
                  <td className="py-2 font-medium">{attempt.client}</td>
                  <td className="py-2">{attempt.amount}</td>
                  <td className="py-2">{attempt.method}</td>
                  <td className="py-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(attempt.status)}`}>
                      {attempt.status}
                    </span>
                  </td>
                  <td className="py-2 text-xs">{attempt.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Alerts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Late Payments */}
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">⚠️ Late Payments</h3>
          <div className="space-y-3">
            {latePayments.map((payment, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-900">{payment.client}</p>
                    <p className="text-sm text-gray-600">{payment.amount}</p>
                    <p className="text-xs text-red-600">{payment.daysLate} days overdue</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${getRiskColor(payment.riskLevel)}`}>
                    {payment.riskLevel} Risk
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fraud Detection */}
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">🚨 Fraud Detection</h3>
          <div className="space-y-3">
            {fraudAlerts.map((alert, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-900">{alert.client}</p>
                    <p className="text-sm text-gray-600">{alert.alert}</p>
                    <p className="text-xs text-gray-500">{alert.date}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${getSeverityColor(alert.severity)}`}>
                    {alert.severity}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Notifications */}
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">🔔 AI Notifications</h3>
        <div className="space-y-3">
          {notifications.map((notification, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className={`w-2 h-2 rounded-full mt-2 ${
                notification.type === 'error' ? 'bg-red-500' :
                notification.type === 'warning' ? 'bg-yellow-500' : 'bg-green-500'
              }`}></div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">{notification.message}</p>
                <p className="text-xs text-gray-500">{notification.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Analytics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-blue-700">87%</div>
          <div className="text-sm text-blue-600">Auto-Pay Success Rate</div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-yellow-700">3</div>
          <div className="text-sm text-yellow-600">High-Risk Clients</div>
        </div>
        <div className="bg-red-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-red-700">2</div>
          <div className="text-sm text-red-600">Fraud Alerts Today</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-green-700">RWF 2.3M</div>
          <div className="text-sm text-green-600">AI Processed Today</div>
        </div>
      </div>
    </div>
  );
}