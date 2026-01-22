import React, { useState } from 'react';

export default function AIControlPanel() {
  const [autoPayBank, setAutoPayBank] = useState(true);
  const [autoPayMoMo, setAutoPayMoMo] = useState(true);
  const [reminderDays, setReminderDays] = useState(7);
  const [retryHours, setRetryHours] = useState(24);
  const [maxRetries, setMaxRetries] = useState(3);
  const [fraudLevel, setFraudLevel] = useState('Medium');

  const [aiDecisions] = useState([
    { user: 'Jean Claude', decision: 'Auto-deducted', reason: 'Salary detected', status: 'success' },
    { user: 'Alice Uwizera', decision: 'Blocked', reason: 'Insufficient balance', status: 'blocked' },
    { user: 'Eric Mugisha', decision: 'Flagged', reason: 'Duplicate claim', status: 'warning' },
    { user: 'Thierry Habimana', decision: 'Approved', reason: 'Regular pattern', status: 'success' },
    { user: 'Amahle Hluphi', decision: 'Manual Review', reason: 'High amount', status: 'pending' }
  ]);

  const handleSaveSettings = () => {
    const settings = {
      autoPayBank,
      autoPayMoMo,
      reminderDays,
      retryHours,
      maxRetries,
      fraudLevel
    };
    console.log('AI Settings saved:', settings);
    alert('AI settings saved successfully!');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-800';
      case 'blocked': return 'bg-red-100 text-red-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">🤖 HealthPay AI Control Panel</h1>
        <p className="text-gray-600">Configure and monitor AI behavior for automated payments and fraud detection</p>
      </div>

      {/* AI Auto-Payment Control */}
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">🔄 Auto Payment Control</h2>
        <div className="space-y-3">
          <label className="flex items-center justify-between">
            <span className="text-gray-700">Enable Bank Auto-Deduction</span>
            <input 
              type="checkbox" 
              checked={autoPayBank}
              onChange={(e) => setAutoPayBank(e.target.checked)}
              className="w-5 h-5 text-blue-600"
            />
          </label>
          <label className="flex items-center justify-between">
            <span className="text-gray-700">Enable MoMo Auto-Deduction</span>
            <input 
              type="checkbox" 
              checked={autoPayMoMo}
              onChange={(e) => setAutoPayMoMo(e.target.checked)}
              className="w-5 h-5 text-blue-600"
            />
          </label>
        </div>
      </div>

      {/* Payment Reminder Rules */}
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">⏰ Payment Reminder Rules</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Send reminder before due date (days)
            </label>
            <input
              type="number"
              value={reminderDays}
              onChange={(e) => setReminderDays(e.target.value)}
              className="w-full border rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Retry failed payment after (hours)
            </label>
            <input
              type="number"
              value={retryHours}
              onChange={(e) => setRetryHours(e.target.value)}
              className="w-full border rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Max retry attempts
            </label>
            <input
              type="number"
              value={maxRetries}
              onChange={(e) => setMaxRetries(e.target.value)}
              className="w-full border rounded-md px-3 py-2"
            />
          </div>
        </div>
      </div>

      {/* Fraud Detection Sensitivity */}
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">🛡️ Fraud Detection Level</h2>
        <div className="grid grid-cols-3 gap-4">
          {['Low', 'Medium', 'High'].map((level) => (
            <label key={level} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="fraudLevel"
                value={level}
                checked={fraudLevel === level}
                onChange={(e) => setFraudLevel(e.target.value)}
                className="text-blue-600"
              />
              <span className={`px-3 py-2 rounded-lg text-sm font-medium ${
                fraudLevel === level 
                  ? 'bg-blue-100 text-blue-800' 
                  : 'bg-gray-100 text-gray-700'
              }`}>
                {level}
              </span>
            </label>
          ))}
        </div>
        <div className="mt-3 text-sm text-gray-600">
          <p><strong>Low:</strong> Fewer alerts, more automated approvals</p>
          <p><strong>Medium:</strong> Balanced detection and user experience</p>
          <p><strong>High:</strong> Strict monitoring, more manual reviews</p>
        </div>
      </div>

      {/* AI Decision Transparency */}
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">🔍 AI Decision Transparency</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-gray-500 text-left">
                <th className="pb-3">User</th>
                <th className="pb-3">AI Decision</th>
                <th className="pb-3">Reason</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {aiDecisions.map((decision, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-3 font-medium">{decision.user}</td>
                  <td className="py-3">{decision.decision}</td>
                  <td className="py-3 text-gray-600">{decision.reason}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusColor(decision.status)}`}>
                      {decision.status}
                    </span>
                  </td>
                  <td className="py-3">
                    <button className="px-3 py-1 bg-gray-600 text-white text-xs rounded hover:bg-gray-700">
                      Override
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Save Settings */}
      <div className="flex justify-end">
        <button 
          onClick={handleSaveSettings}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          💾 Save AI Settings
        </button>
      </div>

      {/* AI Logic Explanation */}
      <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
        <h3 className="font-semibold text-blue-800 mb-2">🧠 AI Decision Flow</h3>
        <div className="text-sm text-blue-700">
          <p>1. Admin sets AI rules → 2. AI analyzes user behavior → 3. AI decides: Pay/Notify/Block → 4. Admin can review & override</p>
        </div>
      </div>
    </div>
  );
}