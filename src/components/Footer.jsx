import React from "react";
import rssbLogo from "../images/images.png";

function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8 mt-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <img
              src={rssbLogo}
              alt="RSSB Logo"
              className="h-10 w-auto object-contain"
            />
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-lg">HealthPay AI</span>
              <span className="text-xs text-gray-400">Powered by RSSB</span>
            </div>
          </div>
          <div className="flex space-x-6 mb-4 md:mb-0">
            <a href="#about" className="hover:text-white">About RSSB</a>
            <a href="#privacy" className="hover:text-white">Privacy Policy</a>
            <a href="#terms" className="hover:text-white">Terms</a>
            <a href="#contact" className="hover:text-white">Contact</a>
          </div>
          <div className="text-sm">
            © 2024 Rwanda Social Security Board (RSSB). HealthPay AI Platform.
          </div>
        </div>
        <p className="text-gray-400 text-sm mt-4 text-center">
          An RSSB digital innovation for automated health insurance payments.
        </p>
      </div>
    </footer>
  );
}

export default Footer;