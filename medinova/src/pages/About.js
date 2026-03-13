import React from 'react';
import { Link } from 'react-router-dom';
import '../style.css';
import '../App.css';
import '../about.css';

const About = () => {
  return (
    <>
      <section className="hero">
        <div className="hero-left">
          <div className="hero-kicker">
            <span className="kicker-dot"></span>
            Our Story
          </div>
          <h1 className="hero-title">
            A Connected Healthcare experience built for <span>everyone</span>
          </h1>
          <p className="hero-subtitle">
            Health Sync was started by physicians and technologists who believed
            modern healthcare should feel personal, proactive, and always
            accessible. Today we partner with leading hospitals to bring
            coordinated care, emergency support, and AI-powered insights to
            millions of patients.
          </p>
          <div className="hero-buttons">
            <Link to="/subscription" className="btn btn-primary">Explore Plans</Link>
            <Link to="/#contact" className="btn btn-outline">Talk with Us</Link>
          </div>
          <div className="hero-stats">
            <div className="stat-card">
              <h3>1M+</h3>
              <p>Appointments Managed</p>
            </div>
            <div className="stat-card">
              <h3>120+</h3>
              <p>City Partnerships</p>
            </div>
            <div className="stat-card">
              <h3>4.9★</h3>
              <p>Patient Satisfaction</p>
            </div>
          </div>
        </div>
        <div className="hero-right">
          <div className="hero-photo-card">
            <img src="/photo-1487260211189-670c54da558d.jpeg" alt="Healthcare team" />
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
