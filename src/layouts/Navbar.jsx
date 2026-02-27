import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../App.css";

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  // Close sidebar when pressing Escape key and handle body scroll
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isSidebarOpen) {
        closeSidebar();
      }
    };

    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleEscape);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isSidebarOpen]);

  const handleLinkClick = (anchor) => {
    if (window.location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(anchor);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(anchor);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    closeSidebar();
  };

  const navigateToPage = (path) => {
    closeSidebar();
    navigate(path);
  };

  return (
    <>
      {/* Mobile Sidebar Navigation - RENDERED FIRST for proper layering */}
      <div className={`mobile-nav ${isSidebarOpen ? 'open' : ''}`}>
        <div className="mobile-nav-content">
          <h3>OWASP Top 10</h3>
          <ul className="vulnerability-list">
            <li>
              <a
                href="/broken-access-control"
                className="nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  navigateToPage('/broken-access-control');
                }}
              >
                <span className="vuln-number">1</span>
                Broken Access Control
              </a>
            </li>
            <li>
              <a
                href="/cryptographic-failures"
                className="nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  navigateToPage('/cryptographic-failures');
                }}
              >
                <span className="vuln-number">2</span>
                Cryptographic Failures
              </a>
            </li>
            <li>
              <a
                href="/injection"
                className="nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  navigateToPage('/injection');
                }}
              >
                <span className="vuln-number">3</span>
                Injection
              </a>
            </li>
            <li>
              <a
                href="/insecure-design"
                className="nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  navigateToPage('/insecure-design');
                }}
              >
                <span className="vuln-number">4</span>
                Insecure Design
              </a>
            </li>
            <li>
              <a
                href="/security-misconfiguration"
                className="nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  navigateToPage('/security-misconfiguration');
                }}
              >
                <span className="vuln-number">5</span>
                Security Misconfiguration
              </a>
            </li>
            <li>
              <a
                href="/vulnerable-components"
                className="nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  navigateToPage('/vulnerable-components');
                }}
              >
                <span className="vuln-number">6</span>
                Vulnerable Components
              </a>
            </li>
            <li>
              <a
                href="/authentication-failures"
                className="nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  navigateToPage('/authentication-failures');
                }}
              >
                <span className="vuln-number">7</span>
                Authentication Failures
              </a>
            </li>
            <li>
              <a
                href="/software-data-integrity"
                className="nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  navigateToPage('/software-data-integrity');
                }}
              >
                <span className="vuln-number">8</span>
                Software & Data Integrity
              </a>
            </li>
            <li>
              <a
                href="/security-logging-failures"
                className="nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  navigateToPage('/security-logging-failures');
                }}
              >
                <span className="vuln-number">9</span>
                Security Logging Failures
              </a>
            </li>
            <li>
              <a
                href="/server-side-request-forgery"
                className="nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  navigateToPage('/server-side-request-forgery');
                }}
              >
                <span className="vuln-number">10</span>
                Server-Side Request Forgery
              </a>
            </li>
            <li>
              <a
                href="/software-supply-chain-failures"
                className="nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  navigateToPage('/software-supply-chain-failures');
                }}
              >
                <span className="vuln-number" style={{ fontSize: '0.6rem' }}>NEW</span>
                Software Supply Chain Failures
              </a>
            </li>
            <li>
              <a
                href="/mishandling-exceptional-conditions"
                className="nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  navigateToPage('/mishandling-exceptional-conditions');
                }}
              >
                <span className="vuln-number" style={{ fontSize: '0.6rem' }}>NEW</span>
                Mishandling of Exceptional Conditions
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Overlay for mobile - RENDERED AFTER sidebar so it's underneath */}
      <div
        className={`sidebar-overlay ${isSidebarOpen ? 'open' : ''}`}
        onClick={closeSidebar}
      />

      {/* Main Navbar */}
      <div className='navbar'>
        <div className="align-left">
          {/* Hamburger Menu Button */}
          <button className="menu-btn" onClick={toggleSidebar}>
            {isSidebarOpen ? '✕' : '☰'}
          </button>

          {/* Logo */}
          <div className='logo' onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            <img src="/logo32.png" alt="Logo" />
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <ul className='desktop-nav-links'>
          <li>
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                navigate('/');
              }}
            >
              Home
            </a>
          </li>
          <li><a href="https://owasp.org/Top10/" target="_blank" rel="noopener noreferrer">Study Material</a></li>
          <li>
            <a
              href="/about"
              onClick={(e) => {
                e.preventDefault();
                navigate('/about');
              }}
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('contact');
              }}
            >
              Contact Us
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}