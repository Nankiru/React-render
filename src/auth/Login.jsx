import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [networkSlow, setNetworkSlow] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
    setNetworkSlow(false); // Reset network slow state before submitting.

    // Simulate network delay check (e.g., 2 seconds threshold)
    const networkDelayThreshold = 2000; // 2 seconds
    const startTime = Date.now();

    // Simulate network request
    setTimeout(() => {
      const responseTime = Date.now() - startTime;

      // Check if network delay exceeds threshold (slow connection)
      if (responseTime > networkDelayThreshold) {
        setNetworkSlow(true); // Indicate network is slow
      }

      // Simulate checking credentials (example using localStorage)
      const storedUsername = localStorage.getItem("username");
      const storedPassword = localStorage.getItem("password");

      if (storedUsername !== username || storedPassword !== password) {
        setError("Invalid username or password.");
        setLoading(false);
      } else {
        localStorage.setItem("username", username); // Store credentials after successful login
        navigate("/home");
      }
    }, 3000); // Simulate a 3-second network delay for testing purposes
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="w-80 p-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-center text-xl font-bold">Login</h2>
        
        {/* Network slow alert animation */}
        {networkSlow && (
          <motion.div
            className="bg-yellow-500 text-white p-3 rounded-lg mt-3"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            Network is slow. Please wait...
          </motion.div>
        )}

        {/* Error alert animation */}
        {error && (
          <motion.div
            className="bg-red-500 text-white p-3 rounded-lg mt-3"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 mt-3 bg-gray-700 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mt-3 bg-gray-700 rounded"
          />
          <button
            type="submit"
            className="w-full mt-4 p-2 bg-indigo-500 rounded hover:bg-indigo-400"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <small>Don't have account?<Link to="/signup" className="underline"> Sign Up</Link></small>
      </div>
    </div>
  );
};

export default Login;
