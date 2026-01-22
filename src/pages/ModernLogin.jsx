import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function ModernLogin() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(loginData.email, loginData.password);
      navigate('/admin');
    } catch (error) {
      alert('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    alert('Sign up functionality coming soon!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 flex items-center justify-center p-4">
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-white opacity-10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-white opacity-10 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white opacity-5 rounded-full blur-2xl animate-spin-slow"></div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-violet-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl">🚀</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h1>
            <p className="text-white/70">
              {isSignUp ? 'Join us today' : 'Sign in to your account'}
            </p>
          </div>

          {/* Toggle Buttons */}
          <div className="flex bg-white/10 rounded-2xl p-1 mb-6">
            <button
              onClick={() => setIsSignUp(false)}
              className={`flex-1 py-2 px-4 rounded-xl text-sm font-medium transition-all ${
                !isSignUp 
                  ? 'bg-white text-gray-900 shadow-lg' 
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsSignUp(true)}
              className={`flex-1 py-2 px-4 rounded-xl text-sm font-medium transition-all ${
                isSignUp 
                  ? 'bg-white text-gray-900 shadow-lg' 
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Forms */}
          {isSignUp ? (
            <form onSubmit={handleSignUp} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={signupData.name}
                  onChange={(e) => setSignupData({...signupData, name: e.target.value})}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={signupData.email}
                  onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  value={signupData.password}
                  onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-pink-500 to-violet-500 text-white font-semibold rounded-xl hover:from-pink-600 hover:to-violet-600 transition-all transform hover:scale-105 shadow-lg"
              >
                Create Account
              </button>
            </form>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={loginData.email}
                  onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                  required
                />
              </div>
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center text-white/70">
                  <input type="checkbox" className="mr-2 rounded" />
                  Remember me
                </label>
                <a href="#" className="text-white/70 hover:text-white">
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-pink-500 to-violet-500 text-white font-semibold rounded-xl hover:from-pink-600 hover:to-violet-600 transition-all transform hover:scale-105 shadow-lg disabled:opacity-50"
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>
          )}

          {/* Social Login */}
          <div className="mt-6 pt-6 border-t border-white/20">
            <p className="text-center text-white/70 text-sm mb-4">Or continue with</p>
            <div className="flex space-x-3">
              <button className="flex-1 py-2 px-4 bg-white/10 border border-white/20 rounded-xl text-white/70 hover:text-white hover:bg-white/20 transition-all">
                Google
              </button>
              <button className="flex-1 py-2 px-4 bg-white/10 border border-white/20 rounded-xl text-white/70 hover:text-white hover:bg-white/20 transition-all">
                GitHub
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}