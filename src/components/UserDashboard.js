import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AIChatbot from './AIChatbot';
import PaymentProcessor from './PaymentProcessor';
import ClaimsManager from './ClaimsManager';
import AIRecommendations from './AIRecommendations';

function UserDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showChatbot, setShowChatbot] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showClaims, setShowClaims] = useState(false);
  const [showInsuranceInfo, setShowInsuranceInfo] = useState(false);
  const [balance, setBalance] = useState(1250.75);
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user') || 'null');
    if (!userData) {
      navigate('/login');
      return;
    }
    setUser(userData);
    setIsLoading(false);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 animate-fade-in">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-gray-900">RSSB HealthPay</h1>
              </div>
            </div>
            <div className="flex items-center">
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
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome, {user?.name}!</h1>
            <p className="text-gray-600">Manage your health insurance and payments</p>
          </div>

          {/* Coverage Balance */}
          <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200 mb-8">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Coverage Balance</h3>
                  <p className="text-sm text-gray-500">Active until {user?.coverageExpiry}</p>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-bold text-gray-900">RW {user?.coverageBalance?.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-200 cursor-pointer group" onClick={() => setShowPayment(true)}>
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center group-hover:bg-green-600 transition-colors">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900 group-hover:text-green-600 transition-colors">Pay Medical Bill</h3>
                    <p className="text-sm text-gray-500">Pay your medical bills quickly</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                <button className="text-sm font-medium text-green-600 hover:text-green-500 flex items-center">
                  Pay now
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-200 cursor-pointer group" onClick={() => setShowInsuranceInfo(true)}>
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors">My Insurance Info</h3>
                    <p className="text-sm text-gray-500">View your insurance details</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                <button className="text-sm font-medium text-blue-600 hover:text-blue-500 flex items-center">
                  View info
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Recent Payments */}
          <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200 mb-8">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Payments</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">Medical Consultation</p>
                      <p className="text-xs text-gray-500">Jan 15, 2024</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">RW 25,000</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">Prescription</p>
                      <p className="text-xs text-gray-500">Jan 10, 2024</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">RW 15,000</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">Hospital Stay</p>
                      <p className="text-xs text-gray-500">Jan 5, 2024</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">RW 75,000</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Coverage Status</h3>
                    <p className="text-sm text-gray-500">Active insurance plan</p>
                  </div>
                </div>
                <div className="mt-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Active
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Next Payment</h3>
                    <p className="text-sm text-gray-500">Due in 15 days</p>
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-2xl font-bold text-gray-900">$45.00</span>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Claims This Year</h3>
                    <p className="text-sm text-gray-500">Total submitted</p>
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-2xl font-bold text-gray-900">3</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-200 cursor-pointer group">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-indigo-500 rounded-lg flex items-center justify-center group-hover:bg-indigo-600 transition-colors">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900 group-hover:text-indigo-600 transition-colors">Health Records</h3>
                    <p className="text-sm text-gray-500">View and manage your medical records</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500 flex items-center">
                  View details
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-200 cursor-pointer group" onClick={() => setShowPayment(true)}>
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center group-hover:bg-green-600 transition-colors">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900 group-hover:text-green-600 transition-colors">Make Payment</h3>
                    <p className="text-sm text-gray-500">Pay your insurance premiums</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                <button className="text-sm font-medium text-green-600 hover:text-green-500 flex items-center">
                  Pay now
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-200 cursor-pointer group" onClick={() => setShowClaims(true)}>
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center group-hover:bg-purple-600 transition-colors">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900 group-hover:text-purple-600 transition-colors">Claims Manager</h3>
                    <p className="text-sm text-gray-500">Submit and track your claims</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                <button className="text-sm font-medium text-purple-600 hover:text-purple-500 flex items-center">
                  Manage claims
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-200 cursor-pointer group" onClick={() => setShowChatbot(true)}>
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                      🤖
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors">AI Assistant</h3>
                    <p className="text-sm text-gray-500">Get instant help and answers</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                <button className="text-sm font-medium text-blue-600 hover:text-blue-500 flex items-center">
                  Ask AI
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* AI Recommendations */}
          <div className="mb-8">
            <AIRecommendations userData={{
              claimsHistory: [
                { type: 'Medical Consultation', amount: 150, date: '2024-01-15', status: 'approved' },
                { type: 'Prescription', amount: 75, date: '2024-01-10', status: 'approved' },
                { type: 'Hospital Stay', amount: 500, date: '2024-01-05', status: 'approved' }
              ],
              paymentHistory: [
                { amount: 45, date: '2024-01-01', status: 'paid' },
                { amount: 45, date: '2023-12-01', status: 'late' }
              ],
              coverage: 85
            }} />
          </div>
        </div>
      </main>

      {/* Modals */}
      <AIChatbot isOpen={showChatbot} onClose={() => setShowChatbot(false)} />
      <PaymentProcessor
        isOpen={showPayment}
        onClose={() => setShowPayment(false)}
        onPaymentSuccess={(amount) => {
          alert(`Payment of $${amount} processed successfully!`);
          setBalance(prev => prev - amount);
        }}
      />
      <ClaimsManager isOpen={showClaims} onClose={() => setShowClaims(false)} />

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex justify-around">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center px-3 py-2 rounded-md transition-colors ${
              activeTab === 'home' ? 'text-blue-600' : 'text-gray-600'
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-xs mt-1">Home</span>
          </button>
          <button
            onClick={() => setActiveTab('payments')}
            className={`flex flex-col items-center px-3 py-2 rounded-md transition-colors ${
              activeTab === 'payments' ? 'text-blue-600' : 'text-gray-600'
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="text-xs mt-1">Payments</span>
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex flex-col items-center px-3 py-2 rounded-md transition-colors ${
              activeTab === 'history' ? 'text-blue-600' : 'text-gray-600'
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-xs mt-1">History</span>
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center px-3 py-2 rounded-md transition-colors ${
              activeTab === 'profile' ? 'text-blue-600' : 'text-gray-600'
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-xs mt-1">Profile</span>
          </button>
        </div>
      </nav>
    </div>
  );
}

export default UserDashboard;
