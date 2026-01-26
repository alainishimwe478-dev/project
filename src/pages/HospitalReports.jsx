import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function HospitalReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/hospital/reports')
      .then(res => res.json())
      .then(data => {
        setReports(Array.isArray(data) ? data : data.reports || []);
        setLoading(false);
      })
      .catch(() => {
        console.log('Using default reports data');
        setReports([
          { id: 1, name: 'Monthly Revenue Report', type: 'Financial', date: 'Jan 2024', status: 'Generated' },
          { id: 2, name: 'Patient Statistics Report', type: 'Analytics', date: 'Jan 2024', status: 'Generated' },
          { id: 3, name: 'Insurance Claims Report', type: 'Claims', date: 'Dec 2023', status: 'Generated' },
          { id: 4, name: 'Department Performance', type: 'Performance', date: 'Jan 2024', status: 'Pending' }
        ]);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <Link to="/hospital-dashboard" className="text-blue-600 hover:text-blue-700">
            ← Back to Dashboard
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-sm text-gray-600">Total Reports</p>
            <p className="text-3xl font-bold text-blue-600">24</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-sm text-gray-600">This Month</p>
            <p className="text-3xl font-bold text-green-600">8</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-sm text-gray-600">Pending</p>
            <p className="text-3xl font-bold text-yellow-600">3</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-sm text-gray-600">Automated</p>
            <p className="text-3xl font-bold text-purple-600">12</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Available Reports</h2>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
              Generate New Report
            </button>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <span className="text-gray-500">Loading reports...</span>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-3 text-left">Report Name</th>
                    <th className="p-3 text-left">Type</th>
                    <th className="p-3 text-left">Date</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map((report, i) => (
                    <tr key={i} className="border-b hover:bg-gray-50">
                      <td className="p-3 font-medium">{report.name}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          report.type === 'Financial' ? 'bg-green-100 text-green-800' :
                          report.type === 'Analytics' ? 'bg-blue-100 text-blue-800' :
                          report.type === 'Claims' ? 'bg-purple-100 text-purple-800' :
                          'bg-orange-100 text-orange-800'
                        }`}>
                          {report.type}
                        </span>
                      </td>
                      <td className="p-3">{report.date}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          report.status === 'Generated' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {report.status}
                        </span>
                      </td>
                      <td className="p-3">
                        <button className="text-blue-600 hover:underline mr-2">Download</button>
                        <button className="text-green-600 hover:underline mr-2">View</button>
                        <button className="text-red-600 hover:underline">Delete</button>
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