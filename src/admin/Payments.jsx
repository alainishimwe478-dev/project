import React from 'react';
import PaymentAuditTrail from '../components/PaymentAuditTrail';

export default function Payments() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Payments Management</h1>
        <p className="text-gray-600">Monitor and manage all payment transactions</p>
      </div>
      
      <PaymentAuditTrail />
    </div>
  );
}