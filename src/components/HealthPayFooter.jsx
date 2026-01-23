import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  ArrowUp,
  Send,
} from "lucide-react";

export default function HealthPayFooter() {
  return (
    <footer className="bg-[#1f2a27] text-gray-300 relative">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand & Contact */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#0E9F6E] flex items-center justify-center text-white font-bold text-sm">
              HP
            </div>
            <span className="text-xl font-semibold text-white">
              HealthPay AI
            </span>
          </div>

          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="text-[#0E9F6E] mt-1" />
              Kigali, Rwanda
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="text-[#0E9F6E]" />
              support@healthpay.ai
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="text-[#0E9F6E]" />
              +250 7XX XXX XXX
            </li>
          </ul>
        </div>

        {/* Information */}
        <div>
          <h4 className="text-white font-semibold mb-4">Information</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-[#0E9F6E]">About Us</a></li>
            <li><a href="#" className="hover:text-[#0E9F6E]">How It Works</a></li>
            <li><a href="#" className="hover:text-[#0E9F6E]">AI Technology</a></li>
            <li><a href="#" className="hover:text-[#0E9F6E]">Blog & Updates</a></li>
            <li><a href="#" className="hover:text-[#0E9F6E]">Contact Us</a></li>
          </ul>
        </div>

        {/* Category */}
        <div>
          <h4 className="text-white font-semibold mb-4">Category</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-[#0E9F6E]">Patients</a></li>
            <li><a href="#" className="hover:text-[#0E9F6E]">Hospitals & Clinics</a></li>
            <li><a href="#" className="hover:text-[#0E9F6E]">Insurance (RSSB)</a></li>
            <li><a href="#" className="hover:text-[#0E9F6E]">Government Partners</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-white font-semibold mb-4">
            Sign Up for Information
          </h4>

          <div className="flex items-center bg-white rounded-full overflow-hidden">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 text-sm text-gray-700 focus:outline-none"
            />
            <button className="bg-[#0E9F6E] p-3 hover:bg-[#0B7F58] transition">
              <Send size={18} className="text-white" />
            </button>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4 mt-6">
            <SocialIcon label="X" />
            <SocialIcon label="in" />
            <SocialIcon label="f" />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-4 text-sm flex flex-col md:flex-row justify-between items-center px-6">
        <span>© {new Date().getFullYear()} HealthPay AI. All Rights Reserved.</span>

        <div className="flex gap-6 mt-2 md:mt-0">
          <a href="#" className="hover:text-[#0E9F6E]">Policy</a>
          <a href="#" className="hover:text-[#0E9F6E]">Terms of Use</a>
        </div>
      </div>

      {/* Scroll to Top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="absolute right-6 bottom-6 w-10 h-10 rounded-full border border-[#0E9F6E] text-[#0E9F6E] hover:bg-[#0E9F6E] hover:text-white transition flex items-center justify-center"
      >
        <ArrowUp size={18} />
      </button>
    </footer>
  );
}

function SocialIcon({ label }) {
  return (
    <div className="w-10 h-10 rounded-full border border-[#0E9F6E] text-[#0E9F6E] hover:bg-[#0E9F6E] hover:text-white transition flex items-center justify-center cursor-pointer font-semibold text-sm">
      {label}
    </div>
  );
}
