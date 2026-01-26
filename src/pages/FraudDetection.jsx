import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';

export default function FraudDetection() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex">
      <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
      <div className={`flex-1 ${sidebarCollapsed ? 'ml-20' : 'ml-64'} transition-all duration-300`}>
        <div className="space-y-6 bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors p-6">
          <h1 className="text-3xl font-bold text-[#003A8F] dark:text-blue-400">Fraud Detection</h1>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700">
            <p className="text-gray-600 dark:text-gray-300">Fraud detection system coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
}