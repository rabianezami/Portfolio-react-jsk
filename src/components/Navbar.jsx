
import React from "react";
import '../styles/navbar.css';
import { FaMoon, FaSun } from "react-icons/fa";
 
const Navbar = ({ darkMode, toggleDarkMode }) => {
  const links = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`navbar fixed-top glass-navbar ${
        darkMode ? "navbar-dark" : "navbar-light"
      }`}
    >
      <div className="container d-flex justify-content-between align-items-center py-2">
        {/* برند سمت چپ */}
        <a className="navbar-brand fw-bold fs-2" href="#home">
          Rabia
        </a>

        {/* لینک‌ها وسط (md و بالاتر) */}
        <ul className="navbar-nav mx-auto d-none d-md-flex flex-row gap-3">
          {links.map((l) => (
            <li className="nav-item" key={l.name}>
              <a className="nav-link px-3 fw-medium" href={l.href}>
                {l.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Dark Mode toggle سمت راست */}
        <button
          onClick={toggleDarkMode}
          className="theme-toggle"
          aria-label="Toggle dark mode"
        >
          {darkMode ? < FaSun /> : <FaMoon /> }
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
