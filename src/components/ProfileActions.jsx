import React from "react";

export default function ProfileSettings() {
  return (
    <div className="bg-white rounded-xl shadow divide-y">
      <SettingItem title="Notifications" desc="Manage alerts & reminders" icon="🔔" />
      <SettingItem title="Security" desc="Password & device info" icon="🔐" />
      <SettingItem title="Preferences" desc="Language & appearance" icon="⚙️" />
      <SettingItem title="Privacy" desc="Data visibility settings" icon="🛡️" />
      <SettingItem title="Help & Support" desc="Contact RSSB support" icon="📞" />
    </div>
  );
}

function SettingItem({ title, desc, icon }) {
  return (
    <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50">
      <div className="flex items-center gap-3">
        <span className="text-xl">{icon}</span>
        <div className="text-left">
          <p className="font-medium">{title}</p>
          <p className="text-sm text-gray-500">{desc}</p>
        </div>
      </div>
      <span className="text-gray-400">›</span>
    </button>
  );
}