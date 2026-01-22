import React, { useState } from "react";
import BottomNav from "../components/BottomNav";

export default function NotificationSettings() {
  const [settings, setSettings] = useState({
    lowBalance: true,
    fraudWarnings: true,
    coverageExpiry: true,
    monthlyReport: false,
    paymentConfirm: true,
    systemUpdates: false
  });

  const toggleSetting = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-28">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-6 text-white">
        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-white/20 rounded-lg">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-xl font-semibold">Notifications</h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        <div className="bg-white rounded-xl shadow divide-y">
          <Toggle 
            label="Low balance alerts" 
            desc="Get notified when coverage is running low"
            checked={settings.lowBalance}
            onChange={() => toggleSetting('lowBalance')}
          />
          <Toggle 
            label="Fraud warnings" 
            desc="Immediate alerts for suspicious activity"
            checked={settings.fraudWarnings}
            onChange={() => toggleSetting('fraudWarnings')}
          />
          <Toggle 
            label="Coverage expiry reminders" 
            desc="Reminders before coverage expires"
            checked={settings.coverageExpiry}
            onChange={() => toggleSetting('coverageExpiry')}
          />
          <Toggle 
            label="Monthly spending report" 
            desc="Summary of your monthly healthcare spending"
            checked={settings.monthlyReport}
            onChange={() => toggleSetting('monthlyReport')}
          />
          <Toggle 
            label="Payment confirmations" 
            desc="Confirm successful payments and transactions"
            checked={settings.paymentConfirm}
            onChange={() => toggleSetting('paymentConfirm')}
          />
          <Toggle 
            label="System updates" 
            desc="App updates and maintenance notifications"
            checked={settings.systemUpdates}
            onChange={() => toggleSetting('systemUpdates')}
          />
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

function Toggle({ label, desc, checked, onChange }) {
  return (
    <div className="flex justify-between items-center p-4">
      <div className="flex-1">
        <p className="font-medium">{label}</p>
        <p className="text-sm text-gray-500">{desc}</p>
      </div>
      <button
        onClick={onChange}
        className={`w-12 h-6 rounded-full relative transition-colors ${
          checked ? 'bg-blue-600' : 'bg-gray-300'
        }`}
      >
        <div
          className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
            checked ? 'translate-x-6' : 'translate-x-0.5'
          } shadow`}
        />
      </button>
    </div>
  );
}