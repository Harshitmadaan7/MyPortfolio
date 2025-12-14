// File: client/components/Layout.jsx
// Student: Harshit Madaan
// StudentID: 301493954
// Purpose: Main navigation + authentication buttons + layout wrapper

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Layout() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Load logged-in user from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/signin");
  };

  return (
    <>
      <header className="site-header">
        
        <div className="brand">
          <Link to="/" className="logo-link">
            <img src="/logo.jpeg" alt="logo" className="logo" />
            <span className="brand-name">Harshit M.</span>
          </Link>
        </div>

        
        <nav className="main-nav" aria-label="Main Navigation">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/project">Projects</Link>
          <Link to="/services">Services</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        
        <div className="auth-buttons">
          {!user ? (
            <>
              <Link to="/signin" className="nav-btn">Sign In</Link>
              <Link to="/signup" className="nav-btn nav-btn-outline">Sign Up</Link>
            </>
          ) : (
            <>
              <span className="welcome-text">Hi, {user.name}</span>

              <button className="nav-btn logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </header>

      
      <main id="main-content" className="page-container"></main>
    </>
  );
}
