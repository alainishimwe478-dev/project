import React, { useState, useEffect } from 'react';
import PaymentsChart from '../components/PaymentsChart';
import { autoDeductMoMo, checkLatePayments, detectFraud } from '../utils/autoDeduct';
import { generateInvoice } from '../utils/invoiceGenerator';

export default function AdvancedDashboard() {
  const [payments, setPayments] = useState([
    {
      id: "PAY-001",
      user: "Jean Claude",
      phone: "+250788123456",
      amount: 35000,
      status: "Completed",
      dueDate: "2024-01-10",
      failedAttempts: 0
    },
    {
      id: "PAY-002",
      user: "Alice Uwizera",
      phone: "+250788654321",
      amount: 12000,
      status: "Pending",
      dueDate: "2024-01-08",
      failedAttempts: 2
    }
  ]);

  const [notifications, setNotifications] = useState([]);

  const addNotification = (notification) => {
    setNotifications(prev => [notification, ...prev]);
  };

  const handleAutoDeduct = async (payment) => {
    const success = await autoDeductMoMo(payment.phone, payment.amount);
    if (success) {
      setPayments(prev => 
        prev.map(p => p.id === payment.id ? {...p, status: "Completed"} : p)
      );
      addNotification({
        message: `✅ Auto-deducted RWF ${payment.amount.toLocaleString()} from ${payment.user}`,
        time: new Date().toLocaleTimeString(),
        read: false
      });
      generateInvoice(payment.user, payment.amount, "Healthcare Service", new Date().toLocaleDateString());
    }
  };

  const runAIChecks = () => {
    const latePayments = checkLatePayments(payments);
    const fraudAlerts = detectFraud(payments);

    latePayments.forEach(payment => {
      addNotification({
        message: `⚠️ ${payment.user} payment is late!`,
        time: new Date().toLocaleTimeString(),
        read: false
      });
    });

    fraudAlerts.forEach(payment => {
      addNotification({
        message: `🚨 Possible fraud detected for ${payment.user}`,
        time: new Date().toLocaleTimeString(),
        read: false
      });
    });
  };

  useEffect(() => {
    const interval = setInterval(runAIChecks, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, [payments]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Advanced Admin Dashboard</h1>
        <button 
          onClick={runAIChecks}
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
        >
          🤖 Run AI Checks
        </button>
      </div>

      {/* Analytics Chart */}
      <PaymentsChart />

      {/* AI Alerts & Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Auto-Deduct Actions</h3>
          <div className="space-y-3">
            {payments.filter(p => p.status === "Pending").map(payment => (
              <div key={payment.id} className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                <div>
                  <p className="font-medium">{payment.user}</p>
                  <p className="text-sm text-gray-600">RWF {payment.amount.toLocaleString()}</p>
                </div>
                <button 
                  onClick={() => handleAutoDeduct(payment)}
                  className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                >
                  Auto-Deduct
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent AI Alerts</h3>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {notifications.slice(0, 5).map((notification, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-900">{notification.message}</p>
                <p className="text-xs text-gray-500">{notification.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Payment Status Overview */}
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Management</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-gray-500 text-left">
                <th className="pb-3">User</th>
                <th className="pb-3">Amount</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Due Date</th>
                <th className="pb-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {payments.map(payment => (
                <tr key={payment.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 font-medium">{payment.user}</td>
                  <td className="py-3">RWF {payment.amount.toLocaleString()}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      payment.status === "Completed" 
                        ? "bg-green-100 text-green-700" 
                        : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="py-3">{payment.dueDate}</td>
                  <td className="py-3">
                    <button 
                      onClick={() => generateInvoice(payment.user, payment.amount, "Healthcare Service", new Date().toLocaleDateString())}
                      className="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 mr-2"
                    >
                      📄 Invoice
                    </button>
                    {payment.status === "Pending" && (
                      <button 
                        onClick={() => handleAutoDeduct(payment)}
                        className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                      >
                        💳 Auto-Pay
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}