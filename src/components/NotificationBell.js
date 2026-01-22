import React, { useState, useEffect } from "react";

function NotificationBell({ notifications, onMarkAsRead }) {
  const [open, setOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="relative">
      {/* Bell Icon */}
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-full hover:bg-gray-100"
      >
        <span className="text-xl">🔔</span>
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-600 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white border rounded-lg shadow-lg z-50">
          <div className="p-3 border-b flex justify-between items-center">
            <span className="font-semibold text-gray-900">Notifications</span>
            <button
              onClick={() => onMarkAsRead()}
              className="text-sm text-blue-600 hover:underline"
            >
              Mark all as read
            </button>
          </div>

          <div className="max-h-64 overflow-y-auto">
            {notifications.length === 0 && (
              <p className="text-gray-500 text-sm p-3">No notifications</p>
            )}
            {notifications.map((note, index) => (
              <div
                key={index}
                className={`p-3 border-b hover:bg-gray-50 cursor-pointer ${
                  note.read ? "bg-gray-50" : "bg-gray-100"
                }`}
              >
                <p className="text-sm text-gray-900">{note.message}</p>
                <p className="text-xs text-gray-500">{note.time}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default NotificationBell;