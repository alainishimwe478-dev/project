import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function HospitalBilling() {
  const [billings, setBillings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/hospital/billing')
      .then(res => res.json())
      .then(data => {
        setBillings(Array.isArray(data) ? data : data.billings || []);
        setLoading(false);
      })
      .catch(() => {
        console.log('Using default billing data');
        setBillings([
          { id: 1, patient: 'Jean Paul Uwimana', service: 'Consultation', amount: 'RWF 25,000', date: '2024-01-15', status: 'Paid', insurance: 'RSSB' },
          { id: 2, patient: 'Marie Mukamana', service: 'Surgery', amount: 'RWF 150,000', date: '2024-01-12', status: 'Pending', insurance: 'RSSB' },
          { id: 3, patient: 'Claude Habimana', service: 'Lab Tests', amount: 'RWF 35,000', date: '2024-01-10', status: 'Paid', insurance: 'Private' },
          { id: 4, patient: 'Aline Uwimana', service: 'X-Ray', amount: 'RWF 15,000', date: '2024-01-08', status: 'Processing', insurance: 'RSSB' }
        ]);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Billing & Claims</h1>
          <Link to="/hospital-dashboard" className="text-blue-600 hover:text-blue-700">
            ← Back to Dashboard
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-sm text-gray-600">Total Revenue</p>
            <p className="text-3xl font-bold text-green-600">RWF 2.4M</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-sm text-gray-600">Pending Claims</p>
            <p className="text-3xl font-bold text-yellow-600">RWF 450K</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-sm text-gray-600">This Month</p>
            <p className="text-3xl font-bold text-blue-600">RWF 180K</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Recent Billing</h2>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
              Generate Invoice
            </button>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <span className="text-gray-500">Loading billing data...</span>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-3 text-left">Patient</th>
                    <th className="p-3 text-left">Service</th>
                    <th className="p-3 text-left">Amount</th>
                    <th className="p-3 text-left">Date</th>
                    <th className="p-3 text-left">Insurance</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {billings.map((billing, i) => (
                    <tr key={i} className="border-b hover:bg-gray-50">
                      <td className="p-3 font-medium">{billing.patient}</td>
                      <td className="p-3">{billing.service}</td>
                      <td className="p-3 font-medium">{billing.amount}</td>
                      <td className="p-3">{billing.date}</td>
                      <td className="p-3">{billing.insurance}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          billing.status === 'Paid' ? 'bg-green-100 text-green-800' :
                          billing.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {billing.status}
                        </span>
                      </td>
                      <td className="p-3">
                        <button className="text-blue-600 hover:underline mr-2">View</button>
                        <button className="text-green-600 hover:underline">Process</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}