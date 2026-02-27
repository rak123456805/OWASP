import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function Footer() {
  const navigate = useNavigate();

  const handleLinkClick = (e, path) => {
    e.preventDefault();
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Logo Section */}
        <div className="footer-logo-section">
          <div
            onClick={() => navigate('/')}
            style={{ cursor: 'pointer' }}
          >
            <img src="/logo32.png" alt="XploitSim Logo" className="footer-logo" />
          </div>
          <p style={{ marginTop: '10px', fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}>
            Empowering safer web development through interactive learning.
          </p>
        </div>

        {/* Quick Links Section */}
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/" onClick={(e) => handleLinkClick(e, '/')}>Home</a></li>
            <li><a href="https://owasp.org/Top10/" target="_blank" rel="noopener noreferrer">Study Material</a></li>
            <li><a href="/about" onClick={(e) => handleLinkClick(e, '/about')}>About</a></li>
            <li><a href="#contact">Contact Us</a></li>
          </ul>
        </div>

      </div>

      {/* Bottom Copyright Section */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} XploitSim. All rights reserved.</p>
      </div>
    </footer>
  );
}