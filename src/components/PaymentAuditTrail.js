import React, { useState, useEffect } from 'react';

const PaymentAuditTrail = () => {
  const [payments] = useState([
    {
      id: "PAY-001",
      user: "Jean Claude",
      service: "King Faisal Hospital",
      method: "MoMo",
      amount: 35000,
      status: "Completed",
      date: "2024-01-12"
    },
    {
      id: "PAY-002",
      user: "Eric Mugisha",
      service: "Pharmacy BCM",
      method: "Bank",
      amount: 8000,
      status: "Completed",
      date: "2024-01-10"
    },
    {
      id: "PAY-003",
      user: "Alice Uwizera",
      service: "Polyclinic Gikondo",
      method: "MoMo",
      amount: 12000,
      status: "Pending",
      date: "2024-01-09"
    },
    {
      id: "PAY-004",
      user: "Amahle Hluphi",
      service: "Pharmacy",
      method: "MoMo",
      amount: 13000,
      status: "Failed",
      date: "2024-01-06"
    }
  ]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [filters, setFilters] = useState({
    status: 'all',
    method: 'all',
    dateRange: '7days'
  });

  // Mock payment data with audit trail
  useEffect(() => {
    const mockPayments = [
      {
        id: 'PAY001',
        user: 'John Mukamana',
        amount: 'RWF 25,000',
        method: 'MoMo',
        provider: 'MTN',
        status: 'Completed',
        purpose: 'Hospital Consultation',
        date: '2024-01-15',
        time: '14:30',
        transactionId: 'MTN240115143001',
        auditTrail: [
          { timestamp: '2024-01-15 14:30:01', action: 'Payment initiated', status: 'Pending' },
          { timestamp: '2024-01-15 14:30:15', action: 'MoMo verification', status: 'Processing' },
          { timestamp: '2024-01-15 14:30:45', action: 'Payment confirmed', status: 'Completed' }
        ]
      }
    ];
    setFilteredPayments(mockPayments);
  }, []);

  // Filter payments based on selected filters
  useEffect(() => {
    let filtered = payments;
    
    if (filters.status !== 'all') {
      filtered = filtered.filter(payment => payment.status.toLowerCase() === filters.status);
    }
    
    if (filters.method !== 'all') {
      filtered = filtered.filter(payment => payment.method.toLowerCase() === filters.method);
    }
    
    setFilteredPayments(filtered);
  }, [filters, payments]);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMethodIcon = (method) => {
    return method === 'MoMo' ? '📱' : '🏦';
  };

  const exportToCSV = () => {
    const headers = ['ID', 'User', 'Amount', 'Method', 'Provider', 'Status', 'Purpose', 'Date', 'Time', 'Transaction ID'];
    const csvContent = [
      headers.join(','),
      ...filteredPayments.map(payment => [
        payment.id,
        payment.user,
        payment.amount,
        payment.method,
        payment.provider,
        payment.status,
        payment.purpose,
        payment.date,
        payment.time,
        payment.transactionId
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `payment-audit-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const [selectedPayment, setSelectedPayment] = useState(null);

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Payment Audit Trail</h2>
        <button 
          onClick={exportToCSV}
          className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 flex items-center space-x-2"
        >
          <span>📊</span>
          <span>Export CSV</span>
        </button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select 
            value={filters.status}
            onChange={(e) => setFilters({...filters, status: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
          <select 
            value={filters.method}
            onChange={(e) => setFilters({...filters, method: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="all">All Methods</option>
            <option value="momo">MoMo</option>
            <option value="bank">Bank</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
          <select 
            value={filters.dateRange}
            onChange={(e) => setFilters({...filters, dateRange: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="7days">Last 7 days</option>
            <option value="30days">Last 30 days</option>
            <option value="90days">Last 90 days</option>
          </select>
        </div>
      </div>

      {/* Payment Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600">Completed</p>
              <p className="text-2xl font-bold text-green-700">
                {(filteredPayments || []).filter(p => p.status === 'Completed').length}
              </p>
            </div>
            <div className="text-green-500 text-2xl">✅</div>
          </div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-yellow-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-700">
                {(filteredPayments || []).filter(p => p.status === 'Pending').length}
              </p>
            </div>
            <div className="text-yellow-500 text-2xl">⏳</div>
          </div>
        </div>
        <div className="bg-red-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-red-600">Failed</p>
              <p className="text-2xl font-bold text-red-700">
                {(filteredPayments || []).filter(p => p.status === 'Failed').length}
              </p>
            </div>
            <div className="text-red-500 text-2xl">❌</div>
          </div>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600">Total</p>
              <p className="text-2xl font-bold text-blue-700">{(filteredPayments || []).length}</p>
            </div>
            <div className="text-blue-500 text-2xl">💳</div>
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b bg-gray-50">
              <th className="p-3">Payment ID</th>
              <th className="p-3">User</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Method</th>
              <th className="p-3">Status</th>
              <th className="p-3">Purpose</th>
              <th className="p-3">Date/Time</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {(filteredPayments || []).map((payment) => (
              <tr key={payment.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="p-3 font-mono text-xs">{payment.id}</td>
                <td className="p-3 font-medium text-gray-900">{payment.user}</td>
                <td className="p-3 font-semibold">{payment.amount}</td>
                <td className="p-3">
                  <div className="flex items-center space-x-2">
                    <span>{getMethodIcon(payment.method)}</span>
                    <div>
                      <div className="font-medium">{payment.method}</div>
                      <div className="text-xs text-gray-500">{payment.provider}</div>
                    </div>
                  </div>
                </td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                    {payment.status}
                  </span>
                </td>
                <td className="p-3 text-gray-600">{payment.purpose}</td>
                <td className="p-3">
                  <div className="text-gray-900">{payment.date}</div>
                  <div className="text-xs text-gray-500">{payment.time}</div>
                </td>
                <td className="p-3">
                  <button 
                    onClick={() => setSelectedPayment(payment)}
                    className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                  >
                    View Trail
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Full Payments Table */}
      <div className="bg-white rounded-lg p-6 shadow-sm border mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            All Payments
          </h2>
          <button 
            onClick={exportToCSV}
            className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
          >
            Export CSV
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-gray-500 text-left">
                <th className="pb-3">Payment ID</th>
                <th className="pb-3">User</th>
                <th className="pb-3">Service</th>
                <th className="pb-3">Method</th>
                <th className="pb-3">Amount</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Date</th>
                <th className="pb-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {(payments || []).map((payment, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="py-3 font-medium text-gray-900">
                    {payment.id}
                  </td>
                  <td className="py-3">{payment.user}</td>
                  <td className="py-3">{payment.purpose}</td>
                  <td className="py-3">{payment.method}</td>
                  <td className="py-3 font-medium">
                    {payment.amount}
                  </td>
                  <td className="py-3">
                    <span
                      className={`px-2 py-1 text-xs rounded-full font-medium ${
                        payment.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : payment.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {payment.status}
                    </span>
                  </td>
                  <td className="py-3 text-gray-500">
                    {payment.date}
                  </td>
                  <td className="py-3">
                    <button 
                      onClick={() => setSelectedPayment(payment)}
                      className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Audit Trail Modal */}
      {selectedPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-96 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Payment Audit Trail - {selectedPayment.id}</h3>
              <button 
                onClick={() => setSelectedPayment(null)}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ×
              </button>
            </div>
            
            <div className="mb-4 p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><strong>User:</strong> {selectedPayment.user}</div>
                <div><strong>Amount:</strong> {selectedPayment.amount}</div>
                <div><strong>Method:</strong> {selectedPayment.method} ({selectedPayment.provider})</div>
                <div><strong>Transaction ID:</strong> {selectedPayment.transactionId}</div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Transaction Timeline</h4>
              {selectedPayment.auditTrail.map((entry, index) => (
                <div key={index} className="flex items-start space-x-3 pb-3 border-b border-gray-100 last:border-b-0">
                  <div className={`w-3 h-3 rounded-full mt-1 ${getStatusColor(entry.status).replace('bg-', 'bg-').replace('text-', 'border-')}`}></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900">{entry.action}</p>
                        <p className="text-xs text-gray-500">{entry.timestamp}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(entry.status)}`}>
                        {entry.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentAuditTrail;