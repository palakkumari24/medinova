import React from 'react';
import { Link } from 'react-router-dom';
import '../style.css';
import '../App.css';
import '../specialist.css';

const Specialist = () => {
  return (
    <>
      <section className="specialist-hero">
        <div className="hero-content">
          <h1>Find Your Perfect Specialist</h1>
          <p>
            Browse through our network of verified doctors and specialists. Book appointments, read reviews, and get the care you need.
          </p>
        </div>
      </section>
      <section className="specialists-section">
        <div className="container">
          <p>Specialist page content - to be implemented with doctor listings</p>
        </div>
      </section>
    </>
  );
};

export default Specialist;
