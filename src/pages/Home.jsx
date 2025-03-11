import React from "react";
import Header from "../components/Header";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

const Home = () => {
  const location = useLocation();
  const fromLogin = location.state?.fromLogin;
  const Myname = localStorage.getItem('username')
  const pass = localStorage.getItem('password')
  return (
    <div className="text-white">
      <div class="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      <Header />

      <h1>This my name {Myname}</h1>
      <h1>This my pass {pass}</h1>
    </div>
  );
};

export default Home;
