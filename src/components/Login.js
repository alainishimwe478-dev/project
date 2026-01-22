import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { login } from "../utils/auth";
import Rocket from "./Rocket";

export default function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const ADMIN_ID = "1199980076099093";
  const ADMIN_PASSWORD = "admin123";

  const handleLogin = () => {
    if (!id || !password) {
      setError("All fields are required");
      return;
    }

    if (id === ADMIN_ID && password === ADMIN_PASSWORD) {
      login({ id, role: "Admin" });
      navigate("/admin-dashboard");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
      bg-gradient-to-b from-[#1e3c72] to-[#2a5298] relative overflow-hidden">

      <Rocket />

      <div className="absolute bottom-[-60px] w-full h-[200px] bg-white rounded-t-[100%]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-[340px] bg-white/10 backdrop-blur-xl 
          rounded-2xl p-8 text-white shadow-2xl"
      >
        <h2 className="text-xl font-semibold text-center tracking-wide">
          USER LOGIN
        </h2>
        <p className="text-sm text-white/70 text-center mb-6">
          Welcome to RSSB HealthPay
        </p>

        <input
          className="input"
          placeholder="Enter your ID"
          onChange={(e) => {
            setId(e.target.value);
            setError("");
          }}
        />

        <input
          type="password"
          className="input"
          placeholder="Enter your password"
          onChange={(e) => {
            setPassword(e.target.value);
            setError("");
          }}
        />

        {error && (
          <p className="text-red-400 text-xs mb-3 text-center">
            {error}
          </p>
        )}

        <button
          onClick={handleLogin}
          className="w-full py-3 rounded-full bg-yellow-400 
            text-black font-semibold hover:bg-yellow-500 transition"
        >
          LOGIN
        </button>
      </motion.div>
    </div>
  );
}
