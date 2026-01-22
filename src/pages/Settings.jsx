import React, { useState } from "react";
import TopBar from "../components/TopBar";
import SideMenu from "../components/SideMenu";
import BottomNav from "../components/BottomNav";
import { useDarkMode } from "../contexts/DarkModeContext";

export default function Settings() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isDark, toggleDarkMode } = useDarkMode();

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <TopBar onMenu={() => setMenuOpen(true)} />
      <SideMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className="p-4 pb-28">
        <h1 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Settings</h1>

        <div className={`rounded-xl shadow divide-y ${isDark ? 'bg-gray-800 divide-gray-700' : 'bg-white divide-gray-200'}`}>
          <SettingItem label="Notifications" desc="Manage alerts & reminders" icon="🔔" isDark={isDark} />
          <SettingItem label="Language" desc="Change app language" icon="🌐" isDark={isDark} />
          <SettingItem label="Privacy" desc="Data visibility settings" icon="🛡️" isDark={isDark} />
          <SettingItem label="Security (View Only)" desc="Password & device info" icon="🔐" isDark={isDark} />
          <SettingItem label="Help & Support" desc="Contact RSSB support" icon="📞" isDark={isDark} />
          
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xl">🌙</span>
                <div>
                  <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Dark Mode</p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Toggle dark theme</p>
                </div>
              </div>
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
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

function SettingItem({ label, desc, icon, isDark }) {
  return (
    <button className={`w-full flex items-center justify-between p-4 ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
      <div className="flex items-center gap-3">
        <span className="text-xl">{icon}</span>
        <div className="text-left">
          <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{label}</p>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{desc}</p>
        </div>
      </div>
      <span className={isDark ? 'text-gray-400' : 'text-gray-400'}>›</span>
    </button>
  );
}