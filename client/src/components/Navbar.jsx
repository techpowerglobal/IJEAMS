import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [authorOpen, setAuthorOpen] = useState(false);
  const [archiveOpen, setArchiveOpen] =useState(false);

  return (
    <header className="navbar">
      <div className="nav-container">
        {/* Logo */}
        <Link to="/" className="nav-logo">
          <img src="/ijems-logo.jpg" alt="IJAEMS" />
          <span>IJAEMS</span>
        </Link>

        {/* Navigation Links */}
        <nav className={`nav-links ${isOpen ? "open" : ""}`}>
          <Link to="/">Home</Link>

          {/* About Dropdown */}
          <div
            className="dropdown"
            onMouseEnter={() => setAboutOpen(true)}
            onMouseLeave={() => setAboutOpen(false)}
          >
           <span className="dropdown-toggle">About ▾</span>
            {aboutOpen && (
              <div className="dropdown-menu">
                <Link to="/about-mission">Our Mission</Link>
                <Link to="/about-vision">Our Vision</Link>
              </div>
            )}
          </div>

          <Link to="/editorial-board">Editorial Board</Link>

          {/* Author Guidelines Dropdown */}
          <div
            className="dropdown"
            onMouseEnter={() => setAuthorOpen(true)}
            onMouseLeave={() => setAuthorOpen(false)}
          >
            <span className="dropdown-toggle">Author Guidelines ▾</span>
            {authorOpen && (
              <div className="dropdown-menu">
                <Link to="/author">Instruction to Authors</Link>
                {/* <Link to="/paper-submit">Online Paper Submission</Link> */}
                <Link to="/editoral-process">Editorial Process</Link>
                <Link to="/ethics">Publication Ethics</Link>
                <Link to="/article">Article Processing Charge</Link>
                <Link to="/indexing">Indexing and Abstracting</Link>
              </div>
            )}
          </div>

          <Link to="/aim-scope">Aim and Scope</Link>
          {/* <Link to="/current-issue">Current Issue</Link> */}


          <div
            className="dropdown"
            onMouseEnter={() => setArchiveOpen(true)}
            onMouseLeave={() => setArchiveOpen(false)}
          >
            <span className="dropdown-toggle">Archive ▾</span>
            {archiveOpen && (
              <div className="dropdown-menu">
                <Link to="/current-issue">Current Issue</Link>
                <Link to="/past-issue">Past Issue</Link>
              </div>
            )}
          </div>
          <Link to="/contact">Contact</Link>
            <span className="e-issn">E-ISSN: 3107-5843</span>
          <Link to="/account" className="login-btn">Account</Link>
        </nav>

        {/* Hamburger Menu for Mobile */}
        <button
          className="hamburger"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}
