import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/navbar.css";
import { FaMoon, FaSun, FaBars, FaTimes } from "react-icons/fa";

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav
      className={`navbar fixed-top glass-navbar ${
        darkMode ? "navbar-dark" : "navbar-light"
      }`}
    >
      <div className="container d-flex justify-content-between align-items-center py-2">
        {/* برند سمت چپ */}
        <NavLink to="/" className="navbar-brand fw-bold fs-2">
          Rabia
        </NavLink>

        {/* لینک‌ها وسط (فقط برای دسکتاپ) */}
        <ul className="navbar-nav mx-auto d-none d-md-flex flex-row gap-3">
          {links.map((l) => (
            <li className="nav-item" key={l.name}>
              <NavLink
                to={l.path}
                className={({ isActive }) =>
                  "nav-link px-3 fw-medium" + (isActive ? " active" : "")
                }
              >
                {l.name}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="d-flex align-items-center gap-2">
          {/* Dark Mode toggle سمت راست */}
          <button
            onClick={toggleDarkMode}
            className="theme-toggle"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>

          {/* دکمه برگر (فقط در موبایل) */}
          <button
            className="burger-btn d-md-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* منوی موبایل */}
      {menuOpen && (
        <div className="mobile-menu d-md-none py-3">
          <ul className="navbar-nav flex-column justify-content-center align-items-center gap-3">
            {links.map((l) => (
              <li className="nav-item " key={l.name}>
                <NavLink
                  to={l.path}
                  className={({ isActive }) =>
                    "nav-link fw-medium" + (isActive ? " active" : "")
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  {l.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
