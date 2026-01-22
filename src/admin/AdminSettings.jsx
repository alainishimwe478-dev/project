import React, { useState, useEffect } from "react";

function AdminSettingsRealtime({ addNotification }) {
  // --- Language Settings ---
  const [systemLanguage, setSystemLanguage] = useState("English");
  
  // --- Notification Settings ---
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(true);

  // --- Dashboard Settings ---
  const [defaultView, setDefaultView] = useState("Dashboard");
  const [theme, setTheme] = useState("Light");

  // --- System Settings ---
  const [paymentLimit, setPaymentLimit] = useState(50000); // RWF
  const [autoMoMoDeduction, setAutoMoMoDeduction] = useState(true);

  // --- Auto-save effect ---
  useEffect(() => {
    const timer = setTimeout(() => {
      saveSettings();
    }, 1000); // auto-save 1 second after change

    return () => clearTimeout(timer);
  }, [systemLanguage, emailAlerts, smsAlerts, pushNotifications, defaultView, theme, paymentLimit, autoMoMoDeduction]);

  const saveSettings = () => {
    const settings = {
      language: systemLanguage,
      notifications: { emailAlerts, smsAlerts, pushNotifications },
      dashboard: { defaultView, theme },
      system: { paymentLimit, autoMoMoDeduction },
    };

    // Save to localStorage for system-wide language
    localStorage.setItem('systemLanguage', systemLanguage);
    
    // Simulate API save
    console.log("Settings auto-saved:", settings);

    // Trigger a notification in the admin dashboard
    if (addNotification) {
      addNotification({
        message: `Admin settings updated successfully - Language: ${systemLanguage}`,
        time: new Date().toLocaleTimeString(),
        read: false,
      });
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Admin Settings</h1>

      {/* System Language */}
      <div className="bg-white rounded-lg p-6 shadow-sm border space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">🌍 System Language</h2>
        <p className="text-sm text-gray-600">Set the default language for the entire RSSB HealthPay system</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => setSystemLanguage("English")}
            className={`p-4 rounded-lg border-2 transition-colors ${
              systemLanguage === "English"
                ? "border-blue-500 bg-blue-50 text-blue-700"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="text-2xl mb-2">🇺🇸</div>
            <div className="font-medium">English</div>
            <div className="text-sm text-gray-500">Default language</div>
          </button>
          
          <button
            onClick={() => setSystemLanguage("Kinyarwanda")}
            className={`p-4 rounded-lg border-2 transition-colors ${
              systemLanguage === "Kinyarwanda"
                ? "border-blue-500 bg-blue-50 text-blue-700"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="text-2xl mb-2">🇷🇼</div>
            <div className="font-medium">Kinyarwanda</div>
            <div className="text-sm text-gray-500">Ikinyarwanda</div>
          </button>
          
          <button
            onClick={() => setSystemLanguage("French")}
            className={`p-4 rounded-lg border-2 transition-colors ${
              systemLanguage === "French"
                ? "border-blue-500 bg-blue-50 text-blue-700"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="text-2xl mb-2">🇫🇷</div>
            <div className="font-medium">Français</div>
            <div className="text-sm text-gray-500">French language</div>
          </button>
        </div>
        <div className="bg-blue-50 p-3 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Current System Language:</strong> {systemLanguage}
          </p>
          <p className="text-xs text-blue-600 mt-1">
            This will affect all users, admin panels, and system messages.
          </p>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-lg p-6 shadow-sm border space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">🔔 Notifications</h2>
        <label className="flex items-center justify-between">
          <span>Email Alerts</span>
          <input type="checkbox" checked={emailAlerts} onChange={() => setEmailAlerts(!emailAlerts)} className="w-5 h-5" />
        </label>
        <label className="flex items-center justify-between">
          <span>SMS Alerts</span>
          <input type="checkbox" checked={smsAlerts} onChange={() => setSmsAlerts(!smsAlerts)} className="w-5 h-5" />
        </label>
        <label className="flex items-center justify-between">
          <span>Push Notifications</span>
          <input type="checkbox" checked={pushNotifications} onChange={() => setPushNotifications(!pushNotifications)} className="w-5 h-5" />
        </label>
      </div>

      {/* Dashboard */}
      <div className="bg-white rounded-lg p-6 shadow-sm border space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">📊 Dashboard</h2>
        <div className="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Default View</label>
            <select value={defaultView} onChange={(e) => setDefaultView(e.target.value)} className="mt-1 block w-full border rounded-md px-3 py-2">
              <option>Dashboard</option>
              <option>Payments</option>
              <option>Claims</option>
              <option>Reports</option>
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Theme</label>
            <select value={theme} onChange={(e) => setTheme(e.target.value)} className="mt-1 block w-full border rounded-md px-3 py-2">
              <option>Light</option>
              <option>Dark</option>
            </select>
          </div>
        </div>
      </div>

      {/* System */}
      <div className="bg-white rounded-lg p-6 shadow-sm border space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">⚙️ System</h2>
        <div className="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Default Payment Limit (RWF)</label>
            <input
              type="number"
              value={paymentLimit}
              onChange={(e) => setPaymentLimit(Number(e.target.value))}
              className="mt-1 block w-full border rounded-md px-3 py-2"
            />
          </div>

          <div className="flex-1 flex items-center justify-between">
            <span className="text-gray-700 font-medium">Auto MoMo Deduction</span>
            <input type="checkbox" checked={autoMoMoDeduction} onChange={() => setAutoMoMoDeduction(!autoMoMoDeduction)} className="w-5 h-5" />
          </div>
        </div>
      </div>

      <div className="bg-green-50 p-4 rounded-lg">
        <p className="text-sm text-green-800">
          ✅ All changes are auto-saved in real-time and applied system-wide.
        </p>
      </div>
    </div>
  );
}

export default AdminSettingsRealtime;