// src/components/HeroSection.jsx
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import "../styles/heroSection.css";

const HeroSection = () => {
  const [quote, setQuote] = useState("");

  const quotes = [
    "Programming isn’t about what you know; it’s about what you can figure out.",
    "Programming is not just typing code, it’s thinking in logic.",
    "Every great programmer was once a beginner.",
    "Code is the bridge between imagination and reality.",
    "First, solve the problem. Then, write the code.",
  ];

  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  return (
    <header className="hero-section position-relative bg-lg-light">
      <div className="bg-circle bg-1"></div>
      <div className="bg-circle bg-2"></div>

      <div className="container py-5 d-flex flex-column-reverse flex-lg-row align-items-center justify-content-between">
        {/* Text section */}
        <div className="hero-text text-center text-lg-start mt-4  mt-lg-0">
          <h1 className="display-3 display-lg-4 fw-bold">
            Hi, I'm <span className="gradient-text">Rabia <br /> Zia Nezami</span>
          </h1>
          <h4 className="text-secondary my-5">Frontend Developer</h4>
          <p className="quote p-3 rounded">"{quote}"</p>
          <div className="d-flex flex-column flex-md-row gap-3 mt-4 justify-content-center justify-content-lg-start">
            <a href="#projects" className="btn btn-primary btn-lg">View Projects</a>
            <a href="#contact" className="btn btn-outline btn-lg">Contact Me</a>
          </div>
        </div>

        {/* SVG / Icon section */}
        <div className="hero-image d-flex justify-content-center mb-4 mb-lg-0">
          <div className="profile-image d-flex align-items-center justify-content-center">
            <FontAwesomeIcon icon={faCode} className="code-icon" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeroSection;
