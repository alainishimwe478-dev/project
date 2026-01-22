import React, { useState } from 'react';

export default function Notifications() {
  const [notifications, setNotifications] = useState([
    { 
      id: 1,
      message: "Jean Claude paid RWF 35,000", 
      time: "2 min ago", 
      read: false,
      type: "payment"
    },
    { 
      id: 2,
      message: "Pending claim from City Med Hospital", 
      time: "5 min ago", 
      read: false,
      type: "claim"
    },
    { 
      id: 3,
      message: "Alice Uwizera payment delayed", 
      time: "10 min ago", 
      read: false,
      type: "warning"
    },
    { 
      id: 4,
      message: "Eric Mugisha completed payment", 
      time: "15 min ago", 
      read: true,
      type: "payment"
    },
    { 
      id: 5,
      message: "High risk transaction detected", 
      time: "20 min ago", 
      read: true,
      type: "alert"
    }
  ]);

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, read: true }))
    );
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'payment': return '💰';
      case 'claim': return '📋';
      case 'warning': return '⚠️';
      case 'alert': return '🚨';
      default: return '🔔';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'payment': return 'bg-green-100 text-green-800';
      case 'claim': return 'bg-blue-100 text-blue-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'alert': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-600">Manage all system notifications</p>
        </div>
        <div className="flex items-center space-x-4">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
            {unreadCount} Unread
          </span>
          <button 
            onClick={markAllAsRead}
            className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
          >
            Mark All as Read
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        <div className="divide-y divide-gray-200">
          {notifications.map((notification) => (
            <div 
              key={notification.id}
              className={`p-4 hover:bg-gray-50 cursor-pointer ${
                !notification.read ? 'bg-blue-50 border-l-4 border-blue-500' : ''
              }`}
              onClick={() => markAsRead(notification.id)}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <span className="text-2xl">{getTypeIcon(notification.type)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className={`text-sm ${!notification.read ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>
                      {notification.message}
                    </p>
                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${getTypeColor(notification.type)}`}>
                      {notification.type}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs text-gray-500">{notification.time}</p>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}