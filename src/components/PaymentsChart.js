import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const paymentData = [
  { month: "Jan", payments: 1200000, claims: 800000 },
  { month: "Feb", payments: 950000, claims: 600000 },
  { month: "Mar", payments: 1350000, claims: 900000 },
  { month: "Apr", payments: 900000, claims: 500000 },
];

function PaymentsChart() {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Analytics</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={paymentData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="payments" fill="#4F46E5" name="Payments" />
          <Bar dataKey="claims" fill="#10B981" name="Claims" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PaymentsChart;