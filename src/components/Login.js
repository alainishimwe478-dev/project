import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../utils/auth';

function Login() {
  const [formData, setFormData] = useState({
    nationalId: '',
    password: '',
    role: 'User'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (user) {
      navigate(`/${user.role.toLowerCase()}-dashboard`);
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nationalId.trim()) {
      newErrors.nationalId = 'National ID is required';
    } else if (formData.nationalId.length < 16) {
      newErrors.nationalId = 'National ID must be at least 16 characters';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Call login function with fraud check
      const user = await login(formData.nationalId, formData.password);

      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify(user));

      // Navigate to appropriate dashboard based on role
      navigate(`/${user.role.toLowerCase()}-dashboard`);
    } catch (error) {
      setErrors({ general: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 animate-fade-in">
        <div className="text-center">
          <div className="mb-8">
            <div className="mx-auto h-24 w-24 bg-white rounded-full flex items-center justify-center mb-4 shadow-xl border-4 border-blue-100">
              <div className="text-center">
                <div className="text-xl font-bold text-blue-700 leading-tight">RSSB</div>
                <div className="w-8 h-0.5 bg-blue-600 mx-auto mt-1"></div>
                <div className="text-xs text-blue-600 font-semibold mt-1 tracking-wider">HEALTHPAY</div>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">RSSB HealthPay</h1>
            <p className="text-blue-100 text-sm">Rwanda Social Security Board</p>
          </div>
          <h2 className="text-2xl font-bold text-white">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="space-y-4">
            <div>
              <label htmlFor="nationalId" className="sr-only">
                National ID
              </label>
              <input
                id="nationalId"
                name="nationalId"
                type="text"
                autoComplete="nationalId"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="National ID"
                value={formData.nationalId}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
