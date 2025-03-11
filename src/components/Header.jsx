import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Link, useLocation } from "react-router-dom"; // Import useLocation
import Logo from "../assets/images/Logo_spotify.png";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const location = useLocation(); // Get current location

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const getLinkClass = (path) => {
    return location.pathname === path
      ? " text-green-500"
      : "";
  };
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <header
      ref={headerRef}
      className="sticky top-0 left-0 w-full bg-white/30 backdrop-blur-md shadow-md z-50"
    >
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="#" title="Home" className="flex">
              <img className="w-auto h-16 lg:h-20" src={Logo} alt="Logo" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            type="button"
            className="inline-flex p-2 text-black transition-all duration-300 rounded-md lg:hidden"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.svg
                  key="close"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.3 }}
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </motion.svg>
              ) : (
                <motion.svg
                  key="menu"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.3 }}
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 8h16M4 16h16"
                  />
                </motion.svg>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:ml-auto lg:space-x-10">
            {["/", "/feature", "/about", "/contact"].map((path, index) => {
              const linkText = ["Home", "Feature", "About Us", "Contact"][index];
              return (
                <Link
                  key={path}
                  to={path}
                  className={getLinkClass(path)}
                >
                  {linkText}
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <button
            onClick={handleLogout}
            className="group items-center justify-center hidden px-4 py-3 ml-10 text-base font-semibold text-green-600 transition-all duration-300 bg-white border border-transparent rounded-md lg:inline-flex hover:text-green-400"
            role="button"
          >
            
            Log Out
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute top-16 left-0 right-0 px-6 py-4 bg-white/30 backdrop-blur-md shadow-md lg:hidden"
          >
            <div className="flex flex-col space-y-4">
              {["/", "/feature", "/about", "/contact"].map((path, index) => {
                const linkText = ["Home", "Feature", "About Us", "Contact"][index];
                return (
                  <motion.a
                    key={path}
                    href={path}
                    className={getLinkClass(path)}
                    onClick={() => setIsMobileMenuOpen(false)}
                    whileTap={{ scale: 0.95 }}
                  >
                    {linkText}
                  </motion.a>
                );
              })}
            </div>

            <div className="mt-6">
              <motion.a
                href="#"
                className="inline-flex justify-center w-full px-4 py-3 text-base font-semibold text-white transition-all duration-300 bg-blue-600 border border-transparent rounded-md items-center hover:bg-blue-700 focus:bg-blue-700"
                role="button"
                onClick={() => setIsMobileMenuOpen(false)}
                whileTap={{ scale: 0.95 }}
              >
                Login
              </motion.a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
