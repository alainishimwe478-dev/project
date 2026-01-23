import React, { useState } from 'react';
import PaymentAuditTrail from '../components/PaymentAuditTrail';

export default function Payments() {
  const [payments] = useState([
    { id: 1, user: 'John Doe', amount: 15000, status: 'Completed', date: '2024-01-15', method: 'MoMo' },
    { id: 2, user: 'Jane Smith', amount: 12000, status: 'Pending', date: '2024-01-14', method: 'Bank' },
    { id: 3, user: 'Bob Wilson', amount: 18000, status: 'Failed', date: '2024-01-13', method: 'MoMo' }
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Payments Management</h1>
        <p className="text-gray-600">Monitor and manage all payment transactions</p>
      </div>
      
      {/* Payment Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Total Payments</h3>
          <p className="text-2xl font-bold text-gray-900">1,234</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Completed</h3>
          <p className="text-2xl font-bold text-green-600">1,156</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Pending</h3>
          <p className="text-2xl font-bold text-yellow-600">45</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Failed</h3>
          <p className="text-2xl font-bold text-red-600">33</p>
        </div>
      </div>

      {/* Recent Payments */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">Recent Payments</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Method</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {payments.map((payment) => (
                <tr key={payment.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{payment.user}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.amount.toLocaleString()} RWF</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      payment.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      payment.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.method}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <PaymentAuditTrail />
    </div>
  );
}