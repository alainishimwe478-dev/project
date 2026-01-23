import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import rssbLogo from '../images/images.png';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('patient');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password, userType });
    
    // Redirect based on user type
    if (userType === 'admin') {
      navigate('/admin-dashboard');
    } else if (userType === 'hospital') {
      navigate('/hospital-dashboard');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <img
            src={rssbLogo}
            alt="RSSB Logo"
            className="h-16 mx-auto mb-4 object-contain"
          />
          <h2 className="text-3xl font-bold text-gray-900">HealthPay AI</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              User Type
            </label>
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="patient">Patient</option>
              <option value="hospital">Hospital</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          
          <button
            type="submit"
            className="w-full bg-[#003A8F] text-white py-2 px-4 rounded-md hover:bg-[#002F73] transition-colors"
          >
            Login
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-600 hover:text-blue-700">
              Register here
            </Link>
          </p>
          <Link to="/" className="text-blue-600 hover:text-blue-700 block mt-2">
            ← Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}