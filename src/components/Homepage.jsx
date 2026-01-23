// Homepage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import rssbLogo from '../images/images.png';
import testimonialImg from '../images/1.jpg';
import HealthPayFooter from './HealthPayFooter';

export default function Homepage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-3">
                <img
                  src={rssbLogo}
                  alt="RSSB Logo"
                  className="h-10 w-auto object-contain"
                />
                <div className="flex flex-col leading-tight">
                  <span className="font-bold text-xl text-gray-900">HealthPay AI</span>
                  <span className="text-xs text-gray-500">Powered by RSSB</span>
                </div>
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
              <Link to="/login" className="px-4 py-2 bg-[#003A8F] text-white rounded-lg hover:bg-[#002F73] transition-colors">
                Login
              </Link>
              <Link to="/register" className="px-4 py-2 bg-[#F5C400] text-[#003A8F] font-semibold rounded-lg hover:bg-[#E6B800] transition-colors">
                Register
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="bg-gradient-to-r from-[#003A8F] to-[#002F73] text-white py-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <img
                src={rssbLogo}
                alt="RSSB Official Logo"
                className="h-16 mb-6 object-contain"
              />
              <h1 className="text-5xl font-bold mb-6 leading-tight text-white">
                Simplify Your Health Payments.
                <br />
                Accelerate Your Care Access.
              </h1>
              <p className="text-lg mb-8 text-white">
                At HealthPay AI, we transform complex health insurance and medical payments into a secure, intelligent, and stress-free experience, ensuring faster approvals, transparent costs, and seamless access to healthcare.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register" className="px-8 py-3 bg-white text-[#003A8F] font-semibold rounded-lg hover:bg-gray-100 transition-colors text-center">
                  Get Started with HealthPay AI
                </Link>
                <Link to="#how-it-works" className="px-8 py-3 bg-[#002F73] text-white font-semibold rounded-lg hover:bg-[#001F4D] transition-colors text-center">
                  Explore How It Works
                </Link>
              </div>
              {/* Supporting Features */}
              <div className="mt-10 space-y-2 text-sm">
                <p className="flex items-center"><span className="mr-2">✔</span> Instant claim validation</p>
                <p className="flex items-center"><span className="mr-2">✔</span> AI fraud detection</p>
                <p className="flex items-center"><span className="mr-2">✔</span> Multi-language support (EN • FR • RW)</p>
                <p className="flex items-center"><span className="mr-2">✔</span> Real-time payment tracking</p>
              </div>
            </div>
            
            {/* Right - Floating Icons */}
            <div className="relative h-96 hidden md:flex items-center justify-center">
              {/* Center Circle */}
              <div className="absolute w-40 h-40 bg-white bg-opacity-20 rounded-full flex flex-col items-center justify-center border-2 border-white">
                <div className="text-4xl mb-2">🤖</div>
                <p className="text-sm font-bold text-center">HealthPay AI Core</p>
                <p className="text-xs text-center mt-1">AI-Driven Health Payments</p>
              </div>
              
              {/* Floating Icons */}
              <div className="absolute top-0 left-0 text-5xl animate-bounce" style={{animationDelay: '0s'}}>🧑⚕️</div>
              <div className="absolute top-0 right-0 text-5xl animate-bounce" style={{animationDelay: '0.2s'}}>👩💼</div>
              <div className="absolute bottom-0 left-0 text-5xl animate-bounce" style={{animationDelay: '0.4s'}}>🏥</div>
              <div className="absolute bottom-0 right-0 text-5xl animate-bounce" style={{animationDelay: '0.6s'}}>🏛️</div>
              
              {/* Labels */}
              <p className="absolute top-20 left-0 text-xs font-semibold">Healthcare Providers</p>
              <p className="absolute top-20 right-0 text-xs font-semibold text-right">Patients</p>
              <p className="absolute bottom-20 left-0 text-xs font-semibold">Hospitals & Clinics</p>
              <p className="absolute bottom-20 right-0 text-xs font-semibold text-right">RSSB Authority</p>
            </div>
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
      <section className="py-20 bg-[#003A8F] text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-blue-200 text-lg mb-12">Official RSSB Digital Health Payment Infrastructure</p>
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

      {/* Testimonials Section */}
      <section className="py-24 bg-[#F3F6FA] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="relative flex flex-col lg:flex-row items-center justify-center gap-12">
            {/* Vertical Label */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="hidden lg:block absolute -left-10 top-1/2 -translate-y-1/2"
            >
              <span
                className="tracking-widest font-semibold text-lg"
                style={{ writingMode: "vertical-rl", color: "#003A8F" }}
              >
                TESTIMONIALS
              </span>
            </motion.div>

            {/* Image Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative z-10"
            >
              <div className="bg-white p-2 shadow-xl rounded-lg border-2 border-[#F5C400]">
                <img
                  src={testimonialImg}
                  alt="HealthPay AI Testimonial"
                  className="w-72 h-80 object-cover rounded-md"
                />
              </div>
            </motion.div>

            {/* Content Card */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white shadow-xl rounded-xl p-10 max-w-xl relative border-t-4 border-[#F5C400]"
            >
              <h3 className="text-xl font-bold mb-1 text-[#003A8F]">
                Regis Rugemanshuro
              </h3>
              <p className="text-sm mb-6 text-[#002F73]">
                Director General · RSSB
              </p>

              <p className="text-gray-700 leading-relaxed">
                "<strong style={{ color: "#003A8F" }}>HealthPay AI</strong> represents a transformative step in Rwanda's
                digital health infrastructure. By automating payment processing and
                integrating AI-driven fraud detection, we're ensuring that every
                Rwandan receives quality healthcare without financial barriers. This
                innovation strengthens RSSB's mission to provide universal health coverage."
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-[#003A8F] text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Health Insurance Payments?</h2>
          <p className="text-xl mb-8">Join HealthPay AI today and experience the future of automated health insurance payments.</p>
          <Link to="/register" className="px-8 py-3 bg-[#F5C400] text-[#003A8F] font-semibold rounded-lg hover:bg-[#E6B800] transition-colors">
            Join HealthPay AI Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <HealthPayFooter />
    </div>
  );
}
