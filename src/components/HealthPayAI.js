import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { predictPaymentRisk, calculatePredictionStats, getAIRecommendedActions } from '../utils/paymentPrediction';

function HealthPayAI({ onClose }) {
  const navigate = useNavigate();
  const [citizens, setCitizens] = useState([]);
  const [selectedCitizen, setSelectedCitizen] = useState(null);
  const [aiPredictions, setAiPredictions] = useState({
    totalInsured: 0,
    pendingPayments: 0,
    predictedDefaulters: 0,
    totalRevenue: 0
  });

  useEffect(() => {
    // Add ESC key listener to close modal
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscKey);

    // Mock citizen data with payment status and AI prediction factors
    const mockCitizens = [
      {
        id: 1,
        nationalId: '1199000000000001',
        name: 'Alain Mugabo',
        phone: '+250788123456',
        insuranceStatus: 'EXPIRED',
        lastPayment: '2024-11-15',
        amountDue: 3000,
        daysOverdue: 15,
        // AI prediction factors
        missedPayments: 3,
        averageDelay: 10,
        income: 'LOW',
        reminderIgnored: true
      },
      {
        id: 2,
        nationalId: '1199000000000002',
        name: 'Marie Uwimana',
        phone: '+250788234567',
        insuranceStatus: 'ACTIVE',
        lastPayment: '2024-12-01',
        amountDue: 0,
        daysOverdue: 0,
        // AI prediction factors
        missedPayments: 0,
        averageDelay: 1,
        income: 'MEDIUM',
        reminderIgnored: false
      },
      {
        id: 3,
        nationalId: '1199000000000003',
        name: 'Jean Baptiste',
        phone: '+250788345678',
        insuranceStatus: 'EXPIRING_SOON',
        lastPayment: '2024-11-25',
        amountDue: 3000,
        daysOverdue: 5,
        // AI prediction factors
        missedPayments: 1,
        averageDelay: 4,
        income: 'MEDIUM',
        reminderIgnored: false
      },
      {
        id: 4,
        nationalId: '1199000000000004',
        name: 'Grace Mukamana',
        phone: '+250788456789',
        insuranceStatus: 'EXPIRED',
        lastPayment: '2024-10-15',
        amountDue: 3000,
        daysOverdue: 45,
        // AI prediction factors
        missedPayments: 4,
        averageDelay: 15,
        income: 'LOW',
        reminderIgnored: true
      }
    ];

    // Calculate risk levels dynamically using AI prediction
    const citizensWithRisk = mockCitizens.map(citizen => ({
      ...citizen,
      riskLevel: predictPaymentRisk(citizen)
    }));

    setCitizens(citizensWithRisk);

    // Calculate AI predictions using the prediction stats function
    const predictionStats = calculatePredictionStats(citizensWithRisk);
    setAiPredictions({
      totalInsured: predictionStats.totalCitizens,
      pendingPayments: mockCitizens.filter(c => c.amountDue > 0).length,
      predictedDefaulters: predictionStats.predictedDefaulters,
      totalRevenue: mockCitizens.reduce((sum, c) => sum + (c.amountDue || 0), 0)
    });
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'ACTIVE': return 'bg-green-100 text-green-800';
      case 'EXPIRING_SOON': return 'bg-yellow-100 text-yellow-800';
      case 'EXPIRED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'HIGH': return 'bg-red-100 text-red-800';
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-800';
      case 'LOW': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const sendPaymentReminder = (citizen) => {
    const actions = getAIRecommendedActions(citizen.riskLevel, citizen);

    actions.forEach(action => {
      switch (action.type) {
        case 'AUTO_SMS':
          alert(`🚨 AUTO SMS ALERT: ${action.message}`);
          break;
        case 'OFFICER_ALERT':
          alert(`👮 OFFICER ALERT: ${action.message}`);
          break;
        case 'REMINDER_SMS':
          alert(`📱 REMINDER SMS: ${action.message}`);
          break;
        case 'MONITOR':
          alert(`👁️ MONITORING: ${action.message}`);
          break;
        default:
          break;
      }
    });
  };

  const initiatePayment = (citizen) => {
    setSelectedCitizen(citizen);
  };

  const processPayment = (method) => {
    if (!selectedCitizen) return;

    // Simulate payment processing
    alert(`Processing payment of ${selectedCitizen.amountDue} RWF via ${method}...`);

    // Update citizen status
    setCitizens(citizens.map(c =>
      c.id === selectedCitizen.id
        ? { ...c, insuranceStatus: 'ACTIVE', amountDue: 0, lastPayment: new Date().toISOString().split('T')[0] }
        : c
    ));

    setSelectedCitizen(null);
    alert('Payment successful! Insurance status updated.');
  };

  const handleOverlayClick = (e) => {
    // Close modal when clicking on the overlay (outside the modal content)
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" style={{ top: '64px', paddingTop: '1rem', paddingBottom: '1rem' }} onClick={handleOverlayClick}>
      <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full mx-4 max-h-[calc(100vh-96px)] overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 text-white p-4 rounded-t-lg">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">🤖 HealthPay AI Dashboard</h3>
            <button onClick={onClose} className="text-white hover:text-gray-200 text-xl">
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          {/* AI Predictions Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                  👥
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-blue-900">{aiPredictions.totalInsured}</h3>
                  <p className="text-sm text-blue-700">Total Insured Citizens</p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
                  ⏳
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-yellow-900">{aiPredictions.pendingPayments}</h3>
                  <p className="text-sm text-yellow-700">Pending Payments</p>
                </div>
              </div>
            </div>

            <div className="bg-red-50 p-6 rounded-lg border border-red-200">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
                  ⚠️
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-red-900">{aiPredictions.predictedDefaulters}</h3>
                  <p className="text-sm text-red-700">Predicted Defaulters</p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                  💰
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-green-900">{aiPredictions.totalRevenue} RWF</h3>
                  <p className="text-sm text-green-700">Revenue Due</p>
                </div>
              </div>
            </div>
          </div>

          {/* Citizens Table */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <h4 className="text-lg font-medium text-gray-900">🤖 AI-Monitored Citizens</h4>
              <p className="text-sm text-gray-600">AI predicts payment behavior and sends automated reminders</p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Citizen
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Insurance Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount Due
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Risk Level
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      AI Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {citizens.map((citizen) => (
                    <tr key={citizen.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{citizen.name}</div>
                            <div className="text-sm text-gray-500">{citizen.nationalId}</div>
                            <div className="text-sm text-gray-500">{citizen.phone}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(citizen.insuranceStatus)}`}>
                          {citizen.insuranceStatus}
                        </span>
                        {citizen.daysOverdue > 0 && (
                          <div className="text-xs text-red-600 mt-1">
                            {citizen.daysOverdue} days overdue
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {citizen.amountDue > 0 ? `${citizen.amountDue} RWF` : 'Paid'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRiskColor(citizen.riskLevel)}`}>
                          {citizen.riskLevel}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        {citizen.amountDue > 0 && (
                          <>
                            <button
                              onClick={() => sendPaymentReminder(citizen)}
                              className="text-blue-600 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded-md text-xs font-medium transition-colors"
                            >
                              📱 Send Reminder
                            </button>
                            <button
                              onClick={() => initiatePayment(citizen)}
                              className="text-green-600 hover:text-green-900 bg-green-50 hover:bg-green-100 px-3 py-1 rounded-md text-xs font-medium transition-colors"
                            >
                              💳 Collect Payment
                            </button>
                          </>
                        )}
                        {citizen.amountDue === 0 && (
                          <span className="text-green-600 text-xs">✅ Up to date</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* AI Insights */}
          <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-200">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">🧠 AI Insights & Predictions</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-medium text-gray-800 mb-2">📈 Payment Trends</h5>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 85% of citizens pay within 30 days of reminder</li>
                  <li>• High-risk citizens need 2-3 reminders</li>
                  <li>• Mobile money payments are 95% successful</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-gray-800 mb-2">🎯 AI Recommendations</h5>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Send reminders 7 days before expiry</li>
                  <li>• Prioritize high-risk citizens for follow-up</li>
                  <li>• Offer payment plans for overdue amounts</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Cancel Button */}
          <div className="mt-6 flex justify-center">
            <button
              onClick={onClose}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-md font-medium text-lg transition-colors shadow-lg"
            >
              ❌ Close AI Dashboard
            </button>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {selectedCitizen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="bg-green-600 text-white p-4 rounded-t-lg">
              <h3 className="text-lg font-semibold">💳 Process Payment</h3>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <h4 className="font-medium text-gray-900">{selectedCitizen.name}</h4>
                <p className="text-sm text-gray-600">Amount: {selectedCitizen.amountDue} RWF</p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => processPayment('MTN Mobile Money')}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-4 rounded-md font-medium transition-colors"
                >
                  📱 MTN Mobile Money
                </button>
                <button
                  onClick={() => processPayment('Airtel Money')}
                  className="w-full bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded-md font-medium transition-colors"
                >
                  📱 Airtel Money
                </button>
                <button
                  onClick={() => processPayment('Bank Transfer')}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-md font-medium transition-colors"
                >
                  🏦 Bank Transfer
                </button>
              </div>

              <div className="mt-6 flex space-x-3">
                <button
                  onClick={() => setSelectedCitizen(null)}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HealthPayAI;
