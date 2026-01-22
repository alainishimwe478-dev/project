import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await login(username, password);
      navigate('/admin');
    } catch (error) {
      alert('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen relative bg-gradient-to-b from-[#1f3b63] to-[#1a4f7a] overflow-hidden">

      {/* Background planets */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-32 w-24 h-24 border border-white rounded-full" />
        <div className="absolute top-28 right-40 w-32 h-32 border border-white rounded-full" />
        <div className="absolute bottom-48 left-1/4 w-20 h-20 border border-white rounded-full" />
      </div>

      {/* Login Card */}
      <div className="relative z-10 flex justify-center pt-20">
        <div className="w-[380px] bg-[#244f7d]/90 backdrop-blur-xl 
          rounded-2xl p-10 shadow-2xl text-white">

          <h1 className="text-2xl font-bold text-center tracking-wide">
            USER LOGIN
          </h1>
          <p className="text-center text-sm text-white/80 mt-1 mb-8">
            Welcome to the website
          </p>

          <form onSubmit={handleLogin}>
          {/* Username */}}
          <div className="relative mb-5">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              👤
            </span>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full pl-12 pr-4 py-3 rounded-full 
                bg-gray-100 text-gray-700 outline-none"
            />
          </div>

          {/* Password */}
          <div className="relative mb-4">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              🔒
            </span>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-12 pr-4 py-3 rounded-full 
                bg-gray-100 text-gray-700 outline-none"
            />
          </div>

          {/* Remember + Forgot */}
          <div className="flex justify-between items-center text-sm text-white/80 mb-6">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-yellow-400" />
              Remember
            </label>
            <a href="#" className="hover:underline">
              Forget Password ?
            </a>
          </div>

          {/* Login Button */}
          <button 
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full bg-[#ffbf3f] 
            text-[#1f3b63] font-semibold hover:bg-yellow-300 transition disabled:opacity-50">
            {loading ? 'LOGGING IN...' : 'LOGIN'}
          </button>
          </form>
        </div>
      </div>

      {/* Rocket */}
      <div className="absolute right-32 bottom-44 hidden md:block">
        <div className="relative">
          <div className="w-12 h-20 bg-orange-400 rounded-t-full mx-auto" />
          <div className="w-6 h-6 bg-orange-600 rounded-full mx-auto -mt-2" />
        </div>
      </div>

      {/* Clouds / Waves */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 160" className="w-full">
          <path
            fill="#ffffff"
            d="M0,96L60,112C120,128,240,160,360,149.3C480,139,600,85,720,69.3C840,53,960,75,1080,96C1200,117,1320,139,1380,149.3L1440,160L1440,0L0,0Z"
          />
        </svg>
      </div>

      {/* Bottom Features */}
      <div className="relative bg-white pt-12 pb-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-6 text-center">
          {["Sample Text Here", "Sample Text Here", "Sample Text Here"].map(
            (title, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center text-white font-bold">
                  ★
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-700">{title}</h3>
                  <p className="text-sm text-gray-500">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}