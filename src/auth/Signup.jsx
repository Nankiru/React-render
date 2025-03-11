import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState(""); // 'error' or 'success'
  const navigate = useNavigate(); // React Router navigation

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password || !confirmPassword) {
      setAlertType("error");
      setAlertMessage("All fields are required!");
      return;
    }

    if (password !== confirmPassword) {
      setAlertType("error");
      setAlertMessage("Passwords don't match!");
      return;
    }

    // Save data to localStorage
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);

    // Show success message
    setAlertType("success");
    setAlertMessage("Signup successful! Redirecting...");

    // Redirect to login page after 2 seconds
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-900">
      <div className="w-[320px] rounded-lg bg-gray-900 p-8 text-gray-100 relative">
        <p className="text-center text-xl font-bold">Sign Up</p>

        {/* Animated Alert */}
        {alertMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`absolute top-[-50px] left-0 w-full py-2 text-center rounded-md 
            ${alertType === "error" ? "bg-red-500 text-white" : "bg-green-500 text-white"}`}
          >
            {alertMessage}
          </motion.div>
        )}

        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="mt-1 text-sm">
            <label className="block text-gray-400 mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-md border border-gray-600 bg-gray-900 p-3 text-gray-100"
              placeholder="Enter your username"
            />
          </div>

          <div className="mt-4 text-sm">
            <label className="block text-gray-400 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-gray-600 bg-gray-900 p-3 text-gray-100"
              placeholder="Enter your password"
            />
          </div>

          <div className="mt-4 text-sm">
            <label className="block text-gray-400 mb-1">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-md border border-gray-600 bg-gray-900 p-3 text-gray-100"
              placeholder="Confirm your password"
            />
          </div>

          <button
            type="submit"
            className="mt-6 w-full bg-indigo-500 py-3 text-center text-gray-900 font-semibold rounded-md hover:bg-indigo-400"
          >
            Sign Up
          </button>
        </form>
        <small>
          Already have an account?{" "}
          <Link to="/login" className="underline">
            Sign In
          </Link>
        </small>
      </div>
    </div>
  );
};

export default Signup;
