import React from 'react';
import { Link } from 'react-router-dom';

export default function Homepage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">R</span>
                </div>
                <span className="font-bold text-xl text-gray-900">HealthPay AI</span>
              </div>
              <div className="hidden md:flex space-x-6">
                <a href="#home" className="text-gray-700 hover:text-blue-600 font-medium">Home</a>
                <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 font-medium">How It Works</a>
                <a href="#benefits" className="text-gray-700 hover:text-blue-600 font-medium">Benefits</a>
                <a href="#hospitals" className="text-gray-700 hover:text-blue-600 font-medium">Hospitals</a>
                <a href="#contact" className="text-gray-700 hover:text-blue-600 font-medium">Contact</a>
              </div>
            </div>
            <div className="flex space-x-3">
              <Link to="/login" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Login
              </Link>
              <Link to="/register" className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                Register
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="bg-gradient-to-r from-blue-500 to-green-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Smart Health Insurance Payments Powered by AI</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Automated, secure, and real-time payments for Rwanda's health insurance system.
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/register" className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
              Get Started
            </Link>
            <Link to="/dashboard" className="px-8 py-3 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors">
              View Dashboard Demo
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">How HealthPay AI Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gray-50 rounded-xl shadow-lg">
              <div className="text-6xl mb-4">🧠</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">AI Analysis</h3>
              <p className="text-gray-600">Predicts late payments and detects fraudulent claims using advanced machine learning algorithms.</p>
            </div>
            <div className="text-center p-8 bg-gray-50 rounded-xl shadow-lg">
              <div className="text-6xl mb-4">💳</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Smart Payments</h3>
              <p className="text-gray-600">Auto-deducts from bank or MoMo accounts without USSD codes or manual steps.</p>
            </div>
            <div className="text-center p-8 bg-gray-50 rounded-xl shadow-lg">
              <div className="text-6xl mb-4">📊</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Admin Control</h3>
              <p className="text-gray-600">Real-time dashboard with alerts, user growth tracking, and comprehensive reports.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section id="benefits" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">Key Features</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">AI Payment Prediction</h3>
              <p className="text-gray-600">Predict payment behaviors and optimize collection strategies.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🚨</div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">AI Alerts & Notifications</h3>
              <p className="text-gray-600">Real-time alerts for payment issues and system updates.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Fraud Detection</h3>
              <p className="text-gray-600">Advanced AI algorithms to detect and prevent fraudulent activities.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Real-Time Analytics</h3>
              <p className="text-gray-600">Comprehensive analytics and reporting for better decision making.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🧾</div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">PDF Invoices & Reports</h3>
              <p className="text-gray-600">Generate professional invoices and detailed reports automatically.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🏥</div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Direct Hospital Payments</h3>
              <p className="text-gray-600">Seamless payments directly to healthcare providers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Governance Section */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-12">Trust & Governance</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-xl font-bold mb-2">Secure & Government-Ready</h3>
              <p className="text-blue-100">Built with government-grade security standards.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-xl font-bold mb-2">Audit Logs</h3>
              <p className="text-blue-100">Complete transparency with detailed audit trails.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-xl font-bold mb-2">Data Encryption</h3>
              <p className="text-blue-100">End-to-end encryption for all sensitive data.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-xl font-bold mb-2">RSSB Compliance</h3>
              <p className="text-blue-100">Fully compliant with RSSB standards and regulations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-green-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Health Insurance Payments?</h2>
          <p className="text-xl mb-8">Join HealthPay AI today and experience the future of automated health insurance payments.</p>
          <Link to="/register" className="px-8 py-3 bg-white text-green-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
            Join HealthPay AI Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-6 mb-4 md:mb-0">
              <a href="#about" className="text-gray-300 hover:text-white">About RSSB</a>
              <a href="#privacy" className="text-gray-300 hover:text-white">Privacy Policy</a>
              <a href="#terms" className="text-gray-300 hover:text-white">Terms</a>
              <a href="#contact" className="text-gray-300 hover:text-white">Contact</a>
            </div>
            <div className="text-gray-300">
              © 2024 HealthPay AI - RSSB Rwanda
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}