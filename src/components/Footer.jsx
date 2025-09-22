import React, { useState } from "react";
import "./Footer.css";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Handle newsletter subscription logic here
    console.log("Subscribing email:", email);
    setEmail("");
    // You can add actual subscription logic here
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left Section - Logo and Description */}
        <div className="footer-about">
          <div className="footer-logo">
            <img src="/ijems-logo.jpg" alt="IJAEMS Logo" />
          </div>
        </div>

        {/* Middle Section - Useful Links */}
        <div className="footer-links">
          <h4>Useful Links</h4>
          <div className="links-grid">
            <div className="links-column">
              <ul>
                <li><a href="/our-mission">Our Mission</a></li>
                <li><a href="/privacy-policy">Privacy Policy</a></li>
                <li><a href="/aim-and-scope">Aim and Scope</a></li>
              </ul>
            </div>
            <div className="links-column">
              <ul>
                
                <li><a href="/contact">Contact</a></li>
                <li><a href="/vision">Vision</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Section - Newsletter */}
        <div className="footer-newsletter">
          <h4>Join Our Newsletter Now</h4>
          <form onSubmit={handleSubscribe} className="newsletter-form">
            <input
              type="email"
              placeholder="Enter your mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="newsletter-input"
            />
            <button type="submit" className="newsletter-btn">
              SUBSCRIBE
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="footer-bottom">
        <p>
          Copyright ©2025 All rights reserved{" "}
          <a href="https://ijaems.in" target="_blank" rel="noopener noreferrer">
            ijaems.in
          </a>
        </p>
      </div>
    </footer>
  );
}