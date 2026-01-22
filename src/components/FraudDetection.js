import React, { useState, useEffect } from 'react';

const FraudDetection = () => {
  const [fraudAlerts, setFraudAlerts] = useState([]);
  const [delayAnalysis, setDelayAnalysis] = useState([]);
  const [riskMetrics, setRiskMetrics] = useState({});

  useEffect(() => {
    const mockFraudAlerts = [
      {
        id: 'FRAUD001',
        type: 'Suspicious Pattern',
        severity: 'High',
        user: 'Unknown User',
        description: 'Multiple failed payment attempts from same device',
        amount: 'RWF 50,000',
        timestamp: '2024-01-15 16:45:00',
        riskScore: 85,
        status: 'Under Review'
      },
      {
        id: 'FRAUD002',
        type: 'Velocity Check',
        severity: 'Medium',
        user: 'Jean Baptiste',
        description: 'Unusual payment frequency detected',
        amount: 'RWF 120,000',
        timestamp: '2024-01-15 14:20:00',
        riskScore: 65,
        status: 'Flagged'
      }
    ];

    const mockDelayAnalysis = [
      {
        provider: 'MTN MoMo',
        avgDelay: '2.3 seconds',
        successRate: '98.5%',
        delayTrend: 'Stable',
        issues: 0
      },
      {
        provider: 'Airtel Money',
        avgDelay: '4.7 seconds',
        successRate: '96.2%',
        delayTrend: 'Increasing',
        issues: 2
      }
    ];

    const mockRiskMetrics = {
      totalTransactions: 1247,
      flaggedTransactions: 23,
      riskScore: 12.5,
      fraudPrevented: 'RWF 2.3M',
      falsePositives: 3
    };

    setFraudAlerts(mockFraudAlerts);
    setDelayAnalysis(mockDelayAnalysis);
    setRiskMetrics(mockRiskMetrics);
  }, []);

  const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTrendColor = (trend) => {
    switch (trend.toLowerCase()) {
      case 'increasing': return 'text-red-600';
      case 'decreasing': return 'text-green-600';
      case 'stable': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  const getRiskScoreColor = (score) => {
    if (score >= 80) return 'text-red-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className="space-y-6">
      {/* Risk Overview */}
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">AI Fraud & Risk Analysis</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-blue-700">{riskMetrics.totalTransactions}</div>
            <div className="text-sm text-blue-600">Total Transactions</div>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-yellow-700">{riskMetrics.flaggedTransactions}</div>
            <div className="text-sm text-yellow-600">Flagged</div>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-red-700">{riskMetrics.riskScore}%</div>
            <div className="text-sm text-red-600">Risk Score</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-green-700">{riskMetrics.fraudPrevented}</div>
            <div className="text-sm text-green-600">Fraud Prevented</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-purple-700">{riskMetrics.falsePositives}</div>
            <div className="text-sm text-purple-600">False Positives</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fraud Alerts */}
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Fraud Alerts</h3>
            <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
              {fraudAlerts.length} Active
            </span>
          </div>
          <div className="space-y-4">
            {fraudAlerts.map((alert) => (
              <div key={alert.id} className={`p-4 rounded-lg border ${getSeverityColor(alert.severity)}`}>
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">🚨</span>
                    <div>
                      <h4 className="font-medium">{alert.type}</h4>
                      <p className="text-sm opacity-75">{alert.user}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-bold ${getRiskScoreColor(alert.riskScore)}`}>
                      {alert.riskScore}%
                    </div>
                    <div className="text-xs opacity-75">Risk Score</div>
                  </div>
                </div>
                <p className="text-sm mb-2">{alert.description}</p>
                <div className="flex justify-between items-center text-xs">
                  <span className="font-medium">{alert.amount}</span>
                  <span className="opacity-75">{alert.timestamp}</span>
                </div>
                <div className="mt-2 flex space-x-2">
                  <button className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700">
                    Block
                  </button>
                  <button className="px-3 py-1 bg-gray-600 text-white text-xs rounded hover:bg-gray-700">
                    Review
                  </button>
                  <button className="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700">
                    Approve
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Delay Analysis */}
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Delay Analysis</h3>
          <div className="space-y-4">
            {delayAnalysis.map((provider, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium text-gray-900">{provider.provider}</h4>
                  {provider.issues > 0 && (
                    <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                      {provider.issues} Issues
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="text-gray-500">Avg Delay</div>
                    <div className="font-medium">{provider.avgDelay}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Success Rate</div>
                    <div className="font-medium">{provider.successRate}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Trend</div>
                    <div className={`font-medium ${getTrendColor(provider.delayTrend)}`}>
                      {provider.delayTrend}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Insights & Recommendations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">🤖 Pattern Detection</h4>
            <div className="space-y-2 text-sm">
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="font-medium text-blue-900">Peak Transaction Hours</div>
                <div className="text-blue-700">2:00 PM - 4:00 PM shows 40% higher activity</div>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg">
                <div className="font-medium text-yellow-900">Unusual Patterns</div>
                <div className="text-yellow-700">3 users with repeated failed attempts detected</div>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">📊 Recommendations</h4>
            <div className="space-y-2 text-sm">
              <div className="p-3 bg-purple-50 rounded-lg">
                <div className="font-medium text-purple-900">System Optimization</div>
                <div className="text-purple-700">Consider load balancing during peak hours</div>
              </div>
              <div className="p-3 bg-red-50 rounded-lg">
                <div className="font-medium text-red-900">Security Enhancement</div>
                <div className="text-red-700">Implement additional verification for high-risk transactions</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FraudDetection;