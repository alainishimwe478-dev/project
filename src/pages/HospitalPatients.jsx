import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function HospitalPatients() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/hospital/patients')
      .then(res => res.json())
      .then(data => {
        setPatients(Array.isArray(data) ? data : data.patients || []);
        setLoading(false);
      })
      .catch(() => {
        console.log('Using default patients data');
        setPatients([
          { id: 1, name: 'Jean Paul Uwimana', age: 35, condition: 'Hypertension', lastVisit: '2024-01-15', status: 'Active' },
          { id: 2, name: 'Marie Mukamana', age: 28, condition: 'Diabetes', lastVisit: '2024-01-12', status: 'Active' },
          { id: 3, name: 'Claude Habimana', age: 42, condition: 'Heart Disease', lastVisit: '2024-01-10', status: 'Inactive' },
          { id: 4, name: 'Aline Uwimana', age: 31, condition: 'Asthma', lastVisit: '2024-01-08', status: 'Active' }
        ]);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Patient Management</h1>
          <Link to="/hospital-dashboard" className="text-blue-600 hover:text-blue-700">
            ← Back to Dashboard
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">All Patients</h2>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Add New Patient
            </button>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <span className="text-gray-500">Loading patients...</span>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-3 text-left">Patient Name</th>
                    <th className="p-3 text-left">Age</th>
                    <th className="p-3 text-left">Condition</th>
                    <th className="p-3 text-left">Last Visit</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map((patient, i) => (
                    <tr key={i} className="border-b hover:bg-gray-50">
                      <td className="p-3 font-medium">{patient.name}</td>
                      <td className="p-3">{patient.age}</td>
                      <td className="p-3">{patient.condition}</td>
                      <td className="p-3">{patient.lastVisit}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          patient.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {patient.status}
                        </span>
                      </td>
                      <td className="p-3">
                        <button className="text-blue-600 hover:underline mr-2">View</button>
                        <button className="text-green-600 hover:underline">Edit</button>
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