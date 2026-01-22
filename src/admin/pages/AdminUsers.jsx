import React from "react";

export default function AdminUsers() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Users Management</h1>
      
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Active Users</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">Jean Claude</p>
              <p className="text-sm text-gray-500">jean.claude@email.com</p>
            </div>
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Active</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">Alice Uwizera</p>
              <p className="text-sm text-gray-500">alice.uwizera@email.com</p>
            </div>
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Active</span>
          </div>
        </div>
      </div>
    </div>
  );
}