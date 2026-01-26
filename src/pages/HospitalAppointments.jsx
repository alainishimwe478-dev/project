import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function HospitalAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/hospital/appointments')
      .then(res => res.json())
      .then(data => {
        setAppointments(Array.isArray(data) ? data : data.appointments || []);
        setLoading(false);
      })
      .catch(() => {
        console.log('Using default appointments data');
        setAppointments([
          { id: 1, patient: 'Jean Paul Uwimana', doctor: 'Dr. Mukamana', date: '2024-01-25', time: '10:00 AM', type: 'Consultation', status: 'Scheduled' },
          { id: 2, patient: 'Marie Mukamana', doctor: 'Dr. Nshimiyimana', date: '2024-01-25', time: '2:30 PM', type: 'Follow-up', status: 'Confirmed' },
          { id: 3, patient: 'Claude Habimana', doctor: 'Dr. Uwimana', date: '2024-01-26', time: '9:00 AM', type: 'Surgery', status: 'Pending' },
          { id: 4, patient: 'Aline Uwimana', doctor: 'Dr. Mukamana', date: '2024-01-26', time: '11:30 AM', type: 'Check-up', status: 'Scheduled' }
        ]);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Appointments</h1>
          <Link to="/hospital-dashboard" className="text-blue-600 hover:text-blue-700">
            ← Back to Dashboard
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">All Appointments</h2>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
              Schedule New Appointment
            </button>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <span className="text-gray-500">Loading appointments...</span>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-3 text-left">Patient</th>
                    <th className="p-3 text-left">Doctor</th>
                    <th className="p-3 text-left">Date</th>
                    <th className="p-3 text-left">Time</th>
                    <th className="p-3 text-left">Type</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appointment, i) => (
                    <tr key={i} className="border-b hover:bg-gray-50">
                      <td className="p-3 font-medium">{appointment.patient}</td>
                      <td className="p-3">{appointment.doctor}</td>
                      <td className="p-3">{appointment.date}</td>
                      <td className="p-3">{appointment.time}</td>
                      <td className="p-3">{appointment.type}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          appointment.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                          appointment.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {appointment.status}
                        </span>
                      </td>
                      <td className="p-3">
                        <button className="text-blue-600 hover:underline mr-2">Edit</button>
                        <button className="text-red-600 hover:underline">Cancel</button>
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