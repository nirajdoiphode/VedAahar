import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";

const Navbar = ({ isLoggedIn, handleLogout }) => {
  const [hoverLogout, setHoverLogout] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // ✅ FIX 1: Initialize username immediately
  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );

  // ✅ FIX 2: Sync when login state changes
  useEffect(() => {
    if (isLoggedIn) {
      const storedUsername = localStorage.getItem("username") || "";
      setUsername(storedUsername);
    } else {
      setUsername("");
    }

    // ✅ FIX 3: Reset hover state when login changes
    setHoverLogout(false);
  }, [isLoggedIn]);

  const closeMenu = () => setMenuOpen(false);

  const scrollToSection = (id) => {
    closeMenu();

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({
          behavior: "smooth",
        });
      }, 300);
    } else {
      document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-custom fixed-top shadow-sm">
      <div className="container">
        <button
          className="navbar-brand fw-bold btn btn-link text-decoration-none"
          onClick={() => scrollToSection("home")}
        >
          🌿 VedAahar
        </button>

        <button
          className="navbar-toggler"
          type="button"
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}>
          <ul className="navbar-nav ms-auto text-center text-lg-start">
            <li className="nav-item">
              <button
                className="nav-link btn btn-link"
                onClick={() => scrollToSection("home")}
              >
                Home
              </button>
            </li>

            <li className="nav-item">
              <button
                className="nav-link btn btn-link"
                onClick={() => scrollToSection("features")}
              >
                Features
              </button>
            </li>

            <li className="nav-item">
              <button
                className="nav-link btn btn-link"
                onClick={() => scrollToSection("how-it-works")}
              >
                How It Works
              </button>
            </li>

            <li className="nav-item">
              <NavLink
                to="/contact"
                className="btn btn-contact mt-2 mt-lg-0 ms-lg-2"
                onClick={closeMenu}
              >
                Contact
              </NavLink>
            </li>
          </ul>

          <div className="d-flex justify-content-center mt-3 mt-lg-0 ms-lg-3">
            {isLoggedIn ? (
              <button
                className={`btn ${
                  hoverLogout ? "btn-danger" : "btn-success"
                } rounded-pill px-4`}
                onMouseEnter={() => setHoverLogout(true)}
                onMouseLeave={() => setHoverLogout(false)}
                onClick={() => {
                  handleLogout();
                  closeMenu();
                }}
              >
                {hoverLogout ? "Logout" : (username || "User")}
              </button>
            ) : (
              <NavLink
                to="/login"
                className="btn btn-success rounded-pill px-4"
                onClick={closeMenu}
              >
                Login
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;