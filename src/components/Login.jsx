import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import rssbLogo from '../images/images.png';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('patient');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    // Valid credentials database
    const validCredentials = {
      'claude@gmail.com': { password: 'claude@123', name: 'Claude', role: 'user' },
      'admin@rssb.rw': { password: 'admin123', name: 'Admin User', role: 'admin' },
      'hospital@rssb.rw': { password: 'hospital123', name: 'Hospital User', role: 'hospital' }
    };
    
    // Check if email exists
    if (!validCredentials[email]) {
      setError('Invalid email address');
      setLoading(false);
      return;
    }
    
    // Check if password matches
    if (validCredentials[email].password !== password) {
      setError('Invalid password');
      setLoading(false);
      return;
    }
    
    // Successful login
    const userData = {
      name: validCredentials[email].name,
      email: email,
      role: validCredentials[email].role
    };
    
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', `token-${Date.now()}`);
    
    // Redirect based on role
    setTimeout(() => {
      if (userData.role === 'admin') {
        navigate('/admin-dashboard');
      } else if (userData.role === 'hospital') {
        navigate('/hospital-dashboard');
      } else {
        navigate('/dashboard');
      }
      setLoading(false);
    }, 1000);
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
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
              {error}
            </div>
          )}
          
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
              disabled={loading}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={loading}
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#003A8F] text-white py-2 px-4 rounded-md hover:bg-[#002F73] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-md text-sm text-blue-700">
            <p className="font-semibold mb-2">Test Credentials:</p>
            <p><strong>User:</strong> claude@gmail.com / claude@123</p>
            <p><strong>Admin:</strong> admin@rssb.rw / admin123</p>
            <p><strong>Hospital:</strong> hospital@rssb.rw / hospital123</p>
          </div>
          
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