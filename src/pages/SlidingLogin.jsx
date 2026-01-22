import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import * as Components from "../components/Components";
import "./SlidingLogin.css";

function SlidingLogin() {
  const [signIn, toggle] = useState(true);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await login(loginData.email, loginData.password);
      if (result.success) {
        if (result.role === "ADMIN") {
          navigate('/admin');
        } else if (result.role === "USER") {
          navigate('/dashboard');
        }
      } else {
        alert('Login failed. Please check your credentials.');
      }
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
    <div className="min-h-screen relative bg-gradient-to-b from-[#1f3b63] to-[#1a4f7a] overflow-hidden">
      {/* Background planets */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-32 w-24 h-24 border border-white rounded-full" />
        <div className="absolute top-28 right-40 w-32 h-32 border border-white rounded-full" />
        <div className="absolute bottom-48 left-1/4 w-20 h-20 border border-white rounded-full" />
      </div>

      {/* Rocket */}
      <div className="absolute right-32 bottom-44 hidden md:block">
        <div className="relative">
          <div className="w-12 h-20 bg-orange-400 rounded-t-full mx-auto" />
          <div className="w-6 h-6 bg-orange-600 rounded-full mx-auto -mt-2" />
        </div>
      </div>

      {/* Sliding Login Container */}
      <div className="relative z-10 flex justify-center items-center min-h-screen py-20">
        <Components.Container>
          <Components.SignUpContainer signingIn={signIn}>
            <Components.Form onSubmit={handleSignUp}>
              <Components.Title>Create Account</Components.Title>
              <Components.Input 
                type="text" 
                placeholder="Name" 
                value={signupData.name}
                onChange={(e) => setSignupData({...signupData, name: e.target.value})}
              />
              <Components.Input 
                type="email" 
                placeholder="Email" 
                value={signupData.email}
                onChange={(e) => setSignupData({...signupData, email: e.target.value})}
              />
              <Components.Input 
                type="password" 
                placeholder="Password" 
                value={signupData.password}
                onChange={(e) => setSignupData({...signupData, password: e.target.value})}
              />
              <Components.Button type="submit">Sign Up</Components.Button>
            </Components.Form>
          </Components.SignUpContainer>
          
          <Components.SignInContainer signingIn={signIn}>
            <Components.Form onSubmit={handleSignIn}>
              <Components.Title>Sign in</Components.Title>
              <Components.Input 
                type="email" 
                placeholder="Email" 
                value={loginData.email}
                onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                required
              />
              <Components.Input 
                type="password" 
                placeholder="Password" 
                value={loginData.password}
                onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                required
              />
              <Components.Anchor href="#">Forgot your password?</Components.Anchor>
              <Components.Button type="submit" disabled={loading}>
                {loading ? 'Signing In...' : 'Sign In'}
              </Components.Button>
            </Components.Form>
          </Components.SignInContainer>
          
          <Components.OverlayContainer signingIn={signIn}>
            <Components.Overlay signingIn={signIn}>
              <Components.LeftOverlayPanel signingIn={signIn}>
                <Components.Title>Welcome Back!</Components.Title>
                <Components.Paragraph>
                  To keep connected with us please login with your personal info
                </Components.Paragraph>
                <Components.GhostButton onClick={() => toggle(true)}>
                  Sign In
                </Components.GhostButton>
              </Components.LeftOverlayPanel>
              <Components.RightOverlayPanel signingIn={signIn}>
                <Components.Title>Hello, Friend!</Components.Title>
                <Components.Paragraph>
                  Enter your personal details and start journey with us
                </Components.Paragraph>
                <Components.GhostButton onClick={() => toggle(false)}>
                  Sign Up
                </Components.GhostButton>
              </Components.RightOverlayPanel>
            </Components.Overlay>
          </Components.OverlayContainer>
        </Components.Container>
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

export default SlidingLogin;