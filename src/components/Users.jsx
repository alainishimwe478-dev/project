import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function Users() {
  const [users] = useState([
    {
      id: 1,
      name: "Jean Paul Uwimana",
      email: "jean.uwimana@gmail.com",
      role: "Patient",
      status: "Active",
      joinDate: "2024-01-15",
      totalPayments: "RWF 245,000",
      lastLogin: "2024-01-20"
    },
    {
      id: 2,
      name: "Aline Mukamana",
      email: "aline.mukamana@yahoo.com",
      role: "Patient",
      status: "Active",
      joinDate: "2024-01-10",
      totalPayments: "RWF 180,500",
      lastLogin: "2024-01-19"
    },
    {
      id: 3,
      name: "Dr. Eric Nshimiyimana",
      email: "eric.nshimi@chuk.rw",
      role: "Hospital Admin",
      status: "Active",
      joinDate: "2023-12-05",
      totalPayments: "RWF 2,450,000",
      lastLogin: "2024-01-20"
    },
    {
      id: 4,
      name: "Marie Uwimana",
      email: "marie.uwimana@hotmail.com",
      role: "Patient",
      status: "Inactive",
      joinDate: "2023-11-20",
      totalPayments: "RWF 95,000",
      lastLogin: "2024-01-10"
    },
    {
      id: 5,
      name: "Claude Habimana",
      email: "claude.habimana@gmail.com",
      role: "Patient",
      status: "Active",
      joinDate: "2024-01-08",
      totalPayments: "RWF 320,000",
      lastLogin: "2024-01-20"
    }
  ]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Users Management</h1>
            <Link to="/" className="text-blue-600 hover:text-blue-700">
              ← Back to Homepage
            </Link>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-sm text-gray-600">Total Users</p>
              <p className="text-3xl font-bold text-blue-600">{users.length}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-sm text-gray-600">Active Users</p>
              <p className="text-3xl font-bold text-green-600">
                {users.filter(user => user.status === 'Active').length}
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-sm text-gray-600">Hospital Admins</p>
              <p className="text-3xl font-bold text-purple-600">
                {users.filter(user => user.role === 'Hospital Admin').length}
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-sm text-gray-600">Patients</p>
              <p className="text-3xl font-bold text-orange-600">
                {users.filter(user => user.role === 'Patient').length}
              </p>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">All Users</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Join Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Payments
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Login
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          user.role === 'Hospital Admin' 
                            ? 'bg-purple-100 text-purple-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          user.status === 'Active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {user.joinDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {user.totalPayments}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.lastLogin}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}