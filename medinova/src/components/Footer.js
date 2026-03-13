import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../style.css';
import '../App.css';

const Footer = () => {
  const statNumbersRef = useRef([]);

  useEffect(() => {
    // Animate stats counter
    const observerOptions = {
      threshold: 0.5,
      rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
          entry.target.classList.add('animated');
          const target = parseInt(entry.target.dataset.count);
          animateCounter(entry.target, target);
        }
      });
    }, observerOptions);

    statNumbersRef.current.forEach(stat => {
      if (stat) observer.observe(stat);
    });

    return () => {
      statNumbersRef.current.forEach(stat => {
        if (stat) observer.unobserve(stat);
      });
    };
  }, []);

  const animateCounter = (element, target) => {
    let current = 0;
    const increment = target / 50;
    const duration = 2000;
    const stepTime = duration / 50;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target.toLocaleString();
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current).toLocaleString();
      }
    }, stepTime);
  };

  return (
    <footer id="contact" className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="nav-brand">
            <div className="brand-icon">
              <span>💙</span>
            </div>
            <div className="brand-text">
              <span className="brand-label">Medinova.ai</span>
            </div>
          </div>
          <p>
            Your trusted healthcare companion providing smart medical support,
            online consultations, and emergency services for better health
            management.
          </p>
          <div className="footer-socials">
            <a href="#" aria-label="Facebook">f</a>
            <a href="#" aria-label="Twitter">t</a>
            <a href="#" aria-label="Instagram">in</a>
            <a href="#" aria-label="LinkedIn">li</a>
          </div>
        </div>
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/specialist">Specialist</Link></li>
            <li><Link to="/appointment">Appointment</Link></li>
            <li><Link to="/questions">Questions</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </div>
        <div className="footer-contact">
          <h4>Contact Info</h4>
          <ul>
            <li>📞 +91 987654321</li>
            <li>✉ support@medinova.ai</li>
            <li>📍 123 Healthcare Ave, Medical City</li>
            <li>⏰ 24/7 Emergency Support</li>
          </ul>
        </div>
        <div className="footer-stats">
          <h4>Hospital Statistics</h4>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-icon">👥</div>
              <div className="stat-content">
                <h3 className="stat-number" ref={el => statNumbersRef.current[0] = el} data-count="50000">0</h3>
                <p>Total Patients</p>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">🛏️</div>
              <div className="stat-content">
                <h3 className="stat-number" ref={el => statNumbersRef.current[1] = el} data-count="250">0</h3>
                <p>Available Beds</p>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">💚</div>
              <div className="stat-content">
                <h3 className="stat-number" ref={el => statNumbersRef.current[2] = el} data-count="98">0</h3>
                <p>Recovery Rate %</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Medinova.ai. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
