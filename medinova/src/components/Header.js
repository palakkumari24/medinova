import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../style.css';
import '../App.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <header className="header">
      <nav className="navbar">
        <div className="nav-brand">
          <Link to="/" className="nav-brand-link">
            <div className="brand-icon">
              <span>💙</span>
            </div>
            <div className="brand-text">
              <span className="brand-label">Medinova.ai</span>
            </div>
          </Link>
        </div>
        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <li>
            <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/specialist" className={`nav-link ${isActive('/specialist')}`}>
              Specialist
            </Link>
          </li>
          <li>
            <Link to="/questions" className={`nav-link ${isActive('/questions')}`}>
              Questions
            </Link>
          </li>
          <li>
            <Link to="/voice-input" className={`nav-link ${isActive('/voice-input')}`}>
              Voice Input
            </Link>
          </li>
          <li>
            <Link to="/about" className={`nav-link ${isActive('/about')}`}>
              About
            </Link>
          </li>
        </ul>
        <div className="nav-actions">
          <div className="language-selector">
            <button className="lang-btn active" data-lang="en">EN</button>
            <button className="lang-btn" data-lang="hi">हिं</button>
          </div>
          <Link to="/login" className="nav-login">Log in</Link>
          <Link to="/signup" className="btn btn-outline nav-signup">Sign Up</Link>
          <Link to="/appointment" className="btn btn-primary nav-cta">
            Book Appointment
          </Link>
        </div>
        <div className="hamburger" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>
    </header>
  );
};

export default Header;
