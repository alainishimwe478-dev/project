import React, { useState, useEffect } from "react";
import TopBar from "../components/TopBar";
import SideMenu from "../components/SideMenu";
import BottomNav from "../components/BottomNav";
import { useDarkMode } from "../contexts/DarkModeContext";

export default function Settings() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isDark, toggleDarkMode } = useDarkMode();
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const savedLang = localStorage.getItem("lang");
    if (savedLang) setLanguage(savedLang);
  }, []);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <TopBar onMenu={() => setMenuOpen(true)} />
      <SideMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className="p-4 pb-28 space-y-4">
        <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          ⚙️ Settings
        </h2>

        {/* Language Settings */}
        <div className={`rounded-xl p-4 shadow ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          <p className={`font-medium mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            🌍 Language
          </p>

          <div className="space-y-2">
            <LangButton
              label="English"
              active={language === "en"}
              onClick={() => changeLanguage("en")}
              isDark={isDark}
            />
            <LangButton
              label="Français"
              active={language === "fr"}
              onClick={() => changeLanguage("fr")}
              isDark={isDark}
            />
            <LangButton
              label="Kinyarwanda"
              active={language === "rw"}
              onClick={() => changeLanguage("rw")}
              isDark={isDark}
            />
          </div>
        </div>

        {/* Dark Mode */}
        <div className={`rounded-xl p-4 shadow flex items-center justify-between ${
          isDark ? 'bg-gray-800' : 'bg-white'
        }`}>
          <span className={isDark ? 'text-white' : 'text-gray-900'}>
            🌙 Dark Mode
          </span>
          <button
            onClick={toggleDarkMode}
            className={`w-12 h-6 rounded-full relative transition-colors ${
              isDark ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                isDark ? 'translate-x-6' : 'translate-x-0.5'
              } shadow`}
            />
          </button>
        </div>

        {/* Logout Button */}
        <div className={`rounded-xl p-4 shadow ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          <button
            onClick={() => {
              localStorage.removeItem('token');
              window.location.href = '/login';
            }}
            className="w-full flex items-center justify-center gap-2 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
          >
            <span>🚪</span>
            Logout
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

function LangButton({ label, active, onClick, isDark }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-3 rounded-lg border transition-colors ${
        active
          ? "bg-blue-600 text-white border-blue-600"
          : isDark
          ? "border-gray-700 hover:bg-gray-700 text-gray-200"
          : "border-gray-200 hover:bg-gray-100 text-gray-900"
      }`}
    >
      {label}
    </button>
  );
}