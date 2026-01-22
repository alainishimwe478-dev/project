import React from "react";

export default function AdminPayments() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Payments Management</h1>
      
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Payments</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">King Faisal Hospital</p>
              <p className="text-sm text-gray-500">Jean Claude - Jan 12, 2024</p>
            </div>
            <span className="font-semibold text-green-600">RWF 35,000</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">Pharmacy BCM</p>
              <p className="text-sm text-gray-500">Eric Mugisha - Jan 10, 2024</p>
            </div>
            <span className="font-semibold text-green-600">RWF 8,000</span>
          </div>
        </div>
      </div>
    </div>
  );
}