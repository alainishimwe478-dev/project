// Homepage.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import rssbLogo from "../images/images.png";
import testimonialImg from "../images/1.jpg";
import HealthPayFooter from "./HealthPayFooter";

export default function Homepage() {
  return (
    <div className="min-h-screen bg-white text-gray-800">

      {/* ================= NAVBAR ================= */}
      <nav className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src={rssbLogo} alt="RSSB" className="h-10" />
            <div>
              <p className="font-bold text-lg text-[#003A8F]">HealthPay AI</p>
              <p className="text-xs text-gray-500">Powered by RSSB</p>
            </div>
          </div>

          <div className="hidden md:flex gap-6 font-medium">
            <a href="#home" className="hover:text-[#003A8F]">Home</a>
            <a href="#how-it-works" className="hover:text-[#003A8F]">How it works</a>
            <a href="#features" className="hover:text-[#003A8F]">Features</a>
            <a href="#impact" className="hover:text-[#003A8F]">Impact</a>
          </div>

          <div className="flex gap-3">
            <Link to="/login" className="px-4 py-2 bg-[#003A8F] text-white rounded-lg">
              Login
            </Link>
            <Link to="/register" className="px-4 py-2 bg-[#F5C400] text-[#003A8F] font-semibold rounded-lg">
              Register
            </Link>
          </div>
        </div>
      </nav>

      {/* ================= HERO ================= */}
      <section
        id="home"
        className="bg-gradient-to-r from-[#003A8F] to-[#002F73] text-white py-28"
      >
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          
          {/* Left */}
          <div>
            <h1 className="text-5xl font-bold leading-tight mb-6">
              Simplify Your Health Payments. <br />
              Accelerate Your Care Access.
            </h1>

            <p className="text-lg text-blue-100 mb-8">
              HealthPay AI automates health insurance payments, detects fraud,
              and ensures faster access to healthcare — securely and transparently.
            </p>

            <div className="flex gap-4">
              <Link
                to="/register"
                className="bg-white text-[#003A8F] px-8 py-3 rounded-lg font-semibold"
              >
                Get Started
              </Link>
              <a
                href="#how-it-works"
                className="border border-white px-8 py-3 rounded-lg"
              >
                Explore How It Works
              </a>
            </div>

            <div className="mt-8 space-y-2 text-sm">
              <p>✔ Instant claim validation</p>
              <p>✔ AI fraud detection</p>
              <p>✔ EN • FR • RW support</p>
              <p>✔ Real-time tracking</p>
            </div>
          </div>

          {/* Right – AI Orbit */}
          <div className="relative h-96 hidden md:flex justify-center items-center">
            <div className="w-40 h-40 bg-white/20 rounded-full flex flex-col items-center justify-center border-2 border-white">
              <span className="text-4xl">🤖</span>
              <p className="font-bold text-sm mt-2">HealthPay AI Core</p>
            </div>

            <span className="absolute top-4 left-10">🧑⚕️</span>
            <span className="absolute top-4 right-10">👩💼</span>
            <span className="absolute bottom-4 left-10">🏥</span>
            <span className="absolute bottom-4 right-10">🏛️</span>
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section id="how-it-works" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-[#003A8F]">
            How HealthPay AI Works
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "🧠", title: "AI Analysis", desc: "Detects fraud and predicts risks automatically." },
              { icon: "💳", title: "Smart Payments", desc: "Auto-deducts payments securely." },
              { icon: "📊", title: "Admin Control", desc: "Real-time dashboards & reports." }
            ].map((item, i) => (
              <div key={i} className="bg-gray-50 p-8 rounded-xl shadow text-center">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= DASHBOARD PREVIEW ================= */}
      <section className="flex flex-col md:flex-row">
        <div className="md:w-1/2 bg-[#003A8F] text-white p-12">
          <h2 className="text-4xl font-bold mb-4">See HealthPay AI in Action</h2>
          <p className="mb-6 text-lg">
            Monitor payments, AI alerts, and hospital claims in real-time.
          </p>
          <Link
            to="/admin-dashboard"
            className="bg-[#F5C400] text-[#003A8F] px-6 py-3 rounded-lg font-semibold"
          >
            Explore Dashboard
          </Link>
        </div>

        <div className="md:w-1/2 flex justify-center items-center p-12 bg-gray-50">
          <div className="bg-white w-full max-w-md rounded-xl shadow">
            <div className="bg-[#003A8F] text-white p-4 rounded-t-xl">
              HealthPay AI Dashboard
            </div>
            <div className="p-4 grid grid-cols-2 gap-4">
              <div className="bg-gray-100 p-4 rounded">
                <p className="text-xs">Total Payments</p>
                <p className="font-bold text-[#003A8F]">RWF 1.2M</p>
              </div>
              <div className="bg-gray-100 p-4 rounded">
                <p className="text-xs">Active Users</p>
                <p className="font-bold text-[#003A8F]">8,450</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= IMPACT ================= */}
      <section id="impact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-12 text-[#003A8F]">Our Impact</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { value: "15K+", label: "Payments Processed" },
              { value: "3K+", label: "Active Users" },
              { value: "500+", label: "Hospitals Connected" }
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="bg-gray-50 p-8 rounded-xl shadow"
              >
                <p className="text-5xl font-bold text-[#003A8F]">{s.value}</p>
                <p className="mt-2 text-gray-600">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIAL ================= */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <img
            src={testimonialImg}
            alt="RSSB Director"
            className="rounded-xl shadow-lg"
          />

          <div className="bg-white p-10 rounded-xl shadow border-t-4 border-[#F5C400]">
            <h3 className="text-xl font-bold text-[#003A8F]">
              Regis Rugemanshuro
            </h3>
            <p className="text-sm mb-4">Director General · RSSB</p>

            <p className="text-gray-700 leading-relaxed">
              "HealthPay AI is transforming Rwanda's digital health payments,
              ensuring transparency, speed, and universal healthcare access."
            </p>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-16 bg-[#003A8F] text-white text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Transform Health Payments?
        </h2>
        <p className="mb-8">
          Join HealthPay AI and experience the future of healthcare finance.
        </p>
        <Link
          to="/register"
          className="bg-[#F5C400] text-[#003A8F] px-8 py-3 rounded-lg font-semibold"
        >
          Join HealthPay AI
        </Link>
      </section>

      {/* ================= FOOTER ================= */}
      <HealthPayFooter />
    </div>
  );
}