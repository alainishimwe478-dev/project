import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';

export default function Hospitals() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/hospitals')
      .then(res => res.json())
      .then(data => {
        setHospitals(Array.isArray(data) ? data : data.hospitals || []);
        setLoading(false);
      })
      .catch(() => {
        console.log('Using default hospital data');
        setHospitals([
          { id: 1, name: 'CHUK', location: 'Kigali', type: 'Public', status: 'Active', patients: 1250 },
          { id: 2, name: 'King Faisal Hospital', location: 'Kigali', type: 'Private', status: 'Active', patients: 890 },
          { id: 3, name: 'Ruhengeri Hospital', location: 'Musanze', type: 'Public', status: 'Active', patients: 650 },
          { id: 4, name: 'Butaro Hospital', location: 'Burera', type: 'Public', status: 'Active', patients: 420 },
          { id: 5, name: 'Kibagabaga Hospital', location: 'Kigali', type: 'Public', status: 'Active', patients: 780 }
        ]);
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
              <h1 className="text-3xl font-bold text-[#003A8F] dark:text-blue-400">Hospitals Management</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Manage and monitor healthcare facilities</p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-[#003A8F] dark:text-blue-400">Registered Hospitals</h3>
              <button className="bg-[#003A8F] text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Add Hospital
              </button>
            </div>
            
            {loading ? (
              <div className="text-center py-8">
                <span className="text-gray-500 dark:text-gray-400">Loading hospitals...</span>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-[#003A8F] text-white">
                    <tr>
                      <th className="p-3 text-left">Hospital Name</th>
                      <th className="p-3 text-left">Location</th>
                      <th className="p-3 text-left">Type</th>
                      <th className="p-3 text-left">Patients</th>
                      <th className="p-3 text-left">Status</th>
                      <th className="p-3 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="dark:text-gray-300">
                    {hospitals.map((hospital, i) => (
                      <tr key={i} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="p-3 font-medium">{hospital.name}</td>
                        <td className="p-3">{hospital.location}</td>
                        <td className="p-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            hospital.type === 'Public' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
                            'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                          }`}>
                            {hospital.type}
                          </span>
                        </td>
                        <td className="p-3">{hospital.patients}</td>
                        <td className="p-3">
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                            {hospital.status}
                          </span>
                        </td>
                        <td className="p-3">
                          <button className="text-[#003A8F] hover:underline mr-2">Edit</button>
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