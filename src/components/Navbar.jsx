import React from "react";

export default function Navbar({
  onHealthPayAIClick,
  onManageUsersClick,
  onLogoutClick,
}) {
  return (
    <nav className="bg-white dark:bg-gray-800 shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                RSSB HealthPay - Admin
              </h1>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={onHealthPayAIClick}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              🤖 HealthPay AI
            </button>
            <button
              onClick={onManageUsersClick}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Manage Users
            </button>
            <button
              onClick={onLogoutClick}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
