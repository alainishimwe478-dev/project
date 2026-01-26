import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function PatientDashboard() {
  const [patientData, setPatientData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/patient/dashboard')
      .then(res => res.json())
      .then(data => {
        setPatientData(data);
        setLoading(false);
      })
      .catch(() => {
        console.log('Using default patient data');
        setPatientData({
          coverageBalance: 'RWF 120,000',
          monthlySpending: 'RWF 45,000',
          nextAppointment: 'Jan 25, 2024',
          activeClaims: 2,
          recentVisits: [
            { type: '🏥 General Checkup', hospital: 'CHUK', date: 'Today', cost: 'RWF 15,000' },
            { type: '💊 Prescription', hospital: 'Pharmacy Plus', date: 'Yesterday', cost: 'RWF 8,000' },
            { type: '🩺 Consultation', hospital: 'Health Center', date: '3 days ago', cost: 'RWF 12,000' }
          ],
          upcomingAppointments: [
            { hospital: 'CHUK', date: 'Jan 25, 2024', time: '10:00 AM', doctor: 'Dr. Mukamana' },
            { hospital: 'King Faisal', date: 'Jan 28, 2024', time: '2:30 PM', doctor: 'Dr. Nshimiyimana' }
          ]
        });
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Patient Dashboard</h1>
          <Link to="/hospital-dashboard" className="text-blue-600 hover:text-blue-700">
            ← Back to Hospital
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Health Status Card */}
        <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-xl p-6 text-white mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span>🏥</span>
            <span className="font-semibold text-lg">Health Status</span>
          </div>
          <p>Your health coverage is active. Next premium payment due in 12 days.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-xl p-6 shadow">
            <p className="text-sm text-gray-500">Coverage Balance</p>
            <h3 className="text-green-600 font-bold text-2xl">{patientData.coverageBalance || 'RWF 120,000'}</h3>
          </div>
          <div className="bg-white rounded-xl p-6 shadow">
            <p className="text-sm text-gray-500">This Month</p>
            <h3 className="text-blue-600 font-bold text-2xl">{patientData.monthlySpending || 'RWF 45,000'}</h3>
          </div>
          <div className="bg-white rounded-xl p-6 shadow">
            <p className="text-sm text-gray-500">Next Appointment</p>
            <h3 className="text-purple-600 font-bold text-lg">{patientData.nextAppointment || 'Jan 25, 2024'}</h3>
          </div>
          <div className="bg-white rounded-xl p-6 shadow">
            <p className="text-sm text-gray-500">Active Claims</p>
            <h3 className="text-orange-600 font-bold text-2xl">{patientData.activeClaims || '2'}</h3>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-6 shadow mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link to="/appointments" className="bg-blue-600 text-white rounded-lg p-4 text-center hover:bg-blue-700 transition">
              📅 Book Appointment
            </Link>
            <Link to="/claims" className="bg-green-600 text-white rounded-lg p-4 text-center hover:bg-green-700 transition">
              📄 Submit Claim
            </Link>
            <Link to="/payments" className="bg-purple-600 text-white rounded-lg p-4 text-center hover:bg-purple-700 transition">
              💳 View Payments
            </Link>
            <Link to="/profile" className="bg-gray-600 text-white rounded-lg p-4 text-center hover:bg-gray-700 transition">
              👤 Update Profile
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Visits */}
          <div className="bg-white rounded-xl p-6 shadow">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Visits</h2>
            <div className="space-y-4">
              {(patientData.recentVisits || []).map((visit, i) => (
                <div key={i} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{visit.type}</p>
                    <p className="text-sm text-gray-600">{visit.hospital} • {visit.date}</p>
                  </div>
                  <span className="font-medium text-gray-900">{visit.cost}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Appointments */}
          <div className="bg-white rounded-xl p-6 shadow">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Upcoming Appointments</h2>
            <div className="space-y-4">
              {(patientData.upcomingAppointments || []).map((appointment, i) => (
                <div key={i} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{appointment.hospital}</p>
                    <p className="text-sm text-gray-600">with {appointment.doctor}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{appointment.date}</p>
                    <p className="text-sm text-gray-600">{appointment.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}