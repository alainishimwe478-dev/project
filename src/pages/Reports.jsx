import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';

export default function Reports() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [reports, setReports] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/reports')
      .then(res => res.json())
      .then(data => {
        setReports(data.reports || []);
        setStats(data.stats || {});
        setLoading(false);
      })
      .catch(() => {
        console.log('Using default reports data');
        setReports([
          { id: 1, name: 'Monthly Payment Report', type: 'Financial', date: 'Jan 2024', status: 'Generated' },
          { id: 2, name: 'Claims Analysis Report', type: 'Claims', date: 'Jan 2024', status: 'Generated' },
          { id: 3, name: 'Hospital Performance Report', type: 'Performance', date: 'Dec 2023', status: 'Generated' },
          { id: 4, name: 'Fraud Detection Report', type: 'Security', date: 'Jan 2024', status: 'Pending' }
        ]);
        setStats({
          totalReports: 24,
          monthlyReports: 8,
          pendingReports: 3,
          totalRevenue: 'RWF 2.4B'
        });
        setLoading(false);
      });
  }, []);

  const StatCard = ({ title, value, color = 'blue' }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow border border-gray-200 dark:border-gray-700">
      <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
      <h2 className={`text-2xl font-bold text-${color}-600 dark:text-${color}-400`}>{value}</h2>
    </div>
  );

  return (
    <div className="flex">
      <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
      <div className={`flex-1 ${sidebarCollapsed ? 'ml-20' : 'ml-64'} transition-all duration-300`}>
        <div className="space-y-6 bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-[#003A8F] dark:text-blue-400">Reports & Analytics</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Generate and view system reports</p>
            </div>
            <button className="bg-[#003A8F] text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Generate Report
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatCard title="Total Reports" value={stats.totalReports || '24'} />
            <StatCard title="Monthly Reports" value={stats.monthlyReports || '8'} />
            <StatCard title="Pending Reports" value={stats.pendingReports || '3'} color="yellow" />
            <StatCard title="Total Revenue" value={stats.totalRevenue || 'RWF 2.4B'} color="green" />
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-[#003A8F] dark:text-blue-400">Recent Reports</h3>
              <select className="text-sm border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                <option>All Types</option>
                <option>Financial</option>
                <option>Claims</option>
                <option>Performance</option>
                <option>Security</option>
              </select>
            </div>
            
            {loading ? (
              <div className="text-center py-8">
                <span className="text-gray-500 dark:text-gray-400">Loading reports...</span>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-[#003A8F] text-white">
                    <tr>
                      <th className="p-3 text-left">Report Name</th>
                      <th className="p-3 text-left">Type</th>
                      <th className="p-3 text-left">Date</th>
                      <th className="p-3 text-left">Status</th>
                      <th className="p-3 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="dark:text-gray-300">
                    {reports.map((report, i) => (
                      <tr key={i} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="p-3 font-medium">{report.name}</td>
                        <td className="p-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            report.type === 'Financial' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                            report.type === 'Claims' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
                            report.type === 'Performance' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300' :
                            'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                          }`}>
                            {report.type}
                          </span>
                        </td>
                        <td className="p-3">{report.date}</td>
                        <td className="p-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            report.status === 'Generated' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                            'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                          }`}>
                            {report.status}
                          </span>
                        </td>
                        <td className="p-3">
                          <button className="text-[#003A8F] hover:underline mr-2">Download</button>
                          <button className="text-blue-600 hover:underline mr-2">View</button>
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
    </div>
  );
}