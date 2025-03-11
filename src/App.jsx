import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Login from "./auth/Login";
import Home from "./pages/Home";
import './loading.css';
import Signup from "./auth/Signup";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<ProtectedRoute component={Home} />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
};

// Protected Route Wrapper: Redirects if not logged in
const ProtectedRoute = ({ component: Component }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem("username");

    setTimeout(() => {
      if (!user) {
        navigate("/login");
      }
      setLoading(false);
    }, 1000); // Simulating network delay
  }, [navigate]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="loader"></div>
      </div>
    );
  }

  return <Component />;
};

export default App;
