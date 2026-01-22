import React, { useState } from 'react';
import { generateInvoice } from '../utils/invoiceGenerator';

export default function Invoices() {
  const [invoices] = useState([
    {
      id: "INV-001",
      user: "Jean Claude",
      service: "King Faisal Hospital",
      amount: 35000,
      date: "2024-01-12",
      status: "Paid",
      paymentMethod: "MoMo"
    },
    {
      id: "INV-002", 
      user: "Eric Mugisha",
      service: "Pharmacy BCM",
      amount: 8000,
      date: "2024-01-10",
      status: "Paid",
      paymentMethod: "Bank"
    },
    {
      id: "INV-003",
      user: "Alice Uwizera", 
      service: "Polyclinic Gikondo",
      amount: 12000,
      date: "2024-01-09",
      status: "Pending",
      paymentMethod: "MoMo"
    }
  ]);

  const [filter, setFilter] = useState("All");

  const filteredInvoices = invoices.filter(invoice => 
    filter === "All" || invoice.status === filter
  );

  const handleDownloadInvoice = (invoice) => {
    generateInvoice(invoice.user, invoice.amount, invoice.service, invoice.date);
  };

  const totalAmount = filteredInvoices.reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Invoice Management</h1>
          <p className="text-gray-600">Generate and manage payment invoices</p>
        </div>
        <div className="flex items-center space-x-4">
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 border rounded-md text-sm"
          >
            <option value="All">All Status</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-green-700">
            {filteredInvoices.filter(i => i.status === "Paid").length}
          </div>
          <div className="text-sm text-green-600">Paid Invoices</div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-yellow-700">
            {filteredInvoices.filter(i => i.status === "Pending").length}
          </div>
          <div className="text-sm text-yellow-600">Pending Invoices</div>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-blue-700">
            RWF {totalAmount.toLocaleString()}
          </div>
          <div className="text-sm text-blue-600">Total Amount</div>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">All Invoices</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-gray-500 text-left bg-gray-50">
                <th className="p-4">Invoice ID</th>
                <th className="p-4">User</th>
                <th className="p-4">Service</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Payment Method</th>
                <th className="p-4">Status</th>
                <th className="p-4">Date</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id} className="border-b hover:bg-gray-50">
                  <td className="p-4 font-mono text-xs">{invoice.id}</td>
                  <td className="p-4 font-medium">{invoice.user}</td>
                  <td className="p-4">{invoice.service}</td>
                  <td className="p-4 font-semibold">RWF {invoice.amount.toLocaleString()}</td>
                  <td className="p-4">{invoice.paymentMethod}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                      invoice.status === "Paid" 
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="p-4">{invoice.date}</td>
                  <td className="p-4">
                    <button 
                      onClick={() => handleDownloadInvoice(invoice)}
                      className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 mr-2"
                    >
                      📄 Download PDF
                    </button>
                    <button className="px-3 py-1 bg-gray-600 text-white text-xs rounded hover:bg-gray-700">
                      👁️ View
                    </button>
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