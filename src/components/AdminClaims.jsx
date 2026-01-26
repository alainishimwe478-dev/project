import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function AdminClaims() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/claims')
      .then(res => res.json())
      .then(data => {
        setClaims(data);
        setLoading(false);
      })
      .catch(() => {
        console.log('Using default claims data');
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex">
      <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
      <div className={`flex-1 ${sidebarCollapsed ? 'ml-20' : 'ml-64'} transition-all duration-300`}>
        <div className="space-y-6 bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-[#003A8F] dark:text-blue-400">Claims Management</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Monitor and manage insurance claims</p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-[#003A8F] dark:text-blue-400">Recent Claims</h3>
            </div>
            
            {loading ? (
              <div className="text-center py-8">
                <span className="text-gray-500 dark:text-gray-400">Loading claims...</span>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-[#003A8F] text-white">
                    <tr>
                      <th className="p-3 text-left">Claim ID</th>
                      <th className="p-3 text-left">Patient</th>
                      <th className="p-3 text-left">Type</th>
                      <th className="p-3 text-left">Amount</th>
                      <th className="p-3 text-left">Date</th>
                      <th className="p-3 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody className="dark:text-gray-300">
                    {claims.length > 0 ? claims.map((claim, i) => (
                      <tr key={i} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="p-3">{claim.id || `CLM-${1000 + i}`}</td>
                        <td className="p-3">{claim.patient || claim.userName}</td>
                        <td className="p-3">{claim.type || claim.description}</td>
                        <td className="p-3">{claim.amount || 'N/A'}</td>
                        <td className="p-3">{claim.date || claim.createdAt}</td>
                        <td className="p-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            claim.status === 'Approved' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                            claim.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                            'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                          }`}>
                            {claim.status}
                          </span>
                        </td>
                      </tr>
                    )) : [
                      { id: 'CLM-1001', patient: 'John Doe', type: 'Medical Claim', amount: 'RWF 50,000', date: 'Jan 15, 2024', status: 'Approved' },
                      { id: 'CLM-1002', patient: 'Jane Smith', type: 'Pharmacy Claim', amount: 'RWF 25,000', date: 'Jan 12, 2024', status: 'Pending' },
                      { id: 'CLM-1003', patient: 'Bob Johnson', type: 'Consultation', amount: 'RWF 15,000', date: 'Jan 10, 2024', status: 'Rejected' }
                    ].map((claim, i) => (
                      <tr key={i} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="p-3">{claim.id}</td>
                        <td className="p-3">{claim.patient}</td>
                        <td className="p-3">{claim.type}</td>
                        <td className="p-3">{claim.amount}</td>
                        <td className="p-3">{claim.date}</td>
                        <td className="p-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            claim.status === 'Approved' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                            claim.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                            'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                          }`}>
                            {claim.status}
                          </span>
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
    </div>
  );
}