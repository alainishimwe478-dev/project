import React, { useState, useEffect } from 'react';

function AIRecommendations({ userData }) {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate AI analysis based on user data
    const generateRecommendations = () => {
      const aiInsights = [];

      // Health-based recommendations
      if (userData.claimsHistory?.length > 0) {
        const recentClaims = userData.claimsHistory.filter(claim =>
          new Date(claim.date) > new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)
        );

        if (recentClaims.some(claim => claim.type.includes('Emergency'))) {
          aiInsights.push({
            id: 1,
            category: 'health',
            priority: 'high',
            title: 'Emergency Care Pattern Detected',
            message: 'You\'ve had multiple emergency visits recently. Consider scheduling preventive care appointments.',
            action: 'Book preventive check-up',
            icon: '🚨',
            color: 'red'
          });
        }

        if (recentClaims.some(claim => claim.type.includes('Prescription'))) {
          aiInsights.push({
            id: 2,
            category: 'health',
            priority: 'medium',
            title: 'Medication Management',
            message: 'Regular prescription claims detected. Our pharmacy discount program could save you up to 30%.',
            action: 'Enroll in pharmacy program',
            icon: '💊',
            color: 'blue'
          });
        }
      }

      // Financial recommendations
      if (userData.paymentHistory) {
        const latePayments = userData.paymentHistory.filter(payment => payment.status === 'late');
        if (latePayments.length > 0) {
          aiInsights.push({
            id: 3,
            category: 'financial',
            priority: 'high',
            title: 'Payment Optimization',
            message: `You've had ${latePayments.length} late payments. Setting up auto-payment could save you penalty fees.`,
            action: 'Setup auto-payment',
            icon: '💰',
            color: 'green'
          });
        }
      }

      // Coverage optimization
      if (userData.coverage < 80) {
        aiInsights.push({
          id: 4,
          category: 'coverage',
          priority: 'medium',
          title: 'Coverage Enhancement',
          message: 'Your current coverage is below optimal. Consider upgrading to comprehensive coverage for better protection.',
          action: 'Explore coverage options',
          icon: '🛡️',
          color: 'purple'
        });
      }

      // Wellness recommendations
      aiInsights.push({
        id: 5,
        category: 'wellness',
        priority: 'low',
        title: 'Wellness Program Available',
        message: 'Join our AI-powered wellness program for personalized health goals and rewards.',
        action: 'Start wellness journey',
        icon: '🌟',
        color: 'orange'
      });

      // Seasonal health tips
      const currentMonth = new Date().getMonth();
      if (currentMonth >= 11 || currentMonth <= 1) { // Winter
        aiInsights.push({
          id: 6,
          category: 'seasonal',
          priority: 'low',
          title: 'Winter Health Tips',
          message: 'Stay healthy this winter with flu shots and vitamin D supplements. Your coverage includes preventive care.',
          action: 'Schedule flu shot',
          icon: '❄️',
          color: 'cyan'
        });
      }

      setRecommendations(aiInsights);
      setLoading(false);
    };

    // Simulate API call delay
    setTimeout(generateRecommendations, 1500);
  }, [userData]);

  const getColorClasses = (color) => {
    const colors = {
      red: 'border-red-500 bg-red-50',
      blue: 'border-blue-500 bg-blue-50',
      green: 'border-green-500 bg-green-50',
      purple: 'border-purple-500 bg-purple-50',
      orange: 'border-orange-500 bg-orange-50',
      cyan: 'border-cyan-500 bg-cyan-50'
    };
    return colors[color] || colors.blue;
  };

  const getPriorityBadge = (priority) => {
    const badges = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-gray-100 text-gray-800'
    };
    return badges[priority] || badges.low;
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-center space-x-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          <span className="text-gray-600">AI analyzing your data...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">AI-Powered Insights</h2>
            <p className="text-sm text-gray-600">Personalized recommendations based on your health data</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Powered by</span>
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">AI</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {recommendations.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🤖</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No recommendations yet</h3>
            <p className="text-gray-600">As you use the system more, AI will provide personalized insights.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {recommendations.map((rec) => (
              <div key={rec.id} className={`p-4 rounded-lg border-l-4 ${getColorClasses(rec.color)}`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className="text-2xl">{rec.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-medium text-gray-900">{rec.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityBadge(rec.priority)}`}>
                          {rec.priority}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 mb-3">{rec.message}</p>
                      <button className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">
                        {rec.action} →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Last updated: {new Date().toLocaleDateString()}</span>
            <button className="text-blue-600 hover:text-blue-800 font-medium">
              Refresh insights
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AIRecommendations;
