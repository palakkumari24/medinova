import React from 'react';
import '../style.css';
import '../App.css';
import '../appointment.css';

const Appointment = () => {
  return (
    <>
      <section className="appointment-hero">
        <div className="appointment-hero-content">
          <p className="hero-kicker">
            <span className="kicker-dot"></span>
            Instant scheduling with verified clinicians
          </p>
          <h1>Plan Your Next Visit In Minutes</h1>
          <p>
            Tell us what you need, choose the best slot, and receive
            confirmation from our care concierge. Emergency-ready, HIPAA
            compliant, and available in over 120 cities.
          </p>
        </div>
      </section>
      <section className="appointment-section">
        <div className="container">
          <p>Appointment booking form - to be implemented</p>
        </div>
      </section>
    </>
  );
};

export default Appointment;
