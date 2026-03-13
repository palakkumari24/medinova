import React from 'react';
import '../style.css';
import '../App.css';
import '../signup.css';

const Signup = () => {
  return (
    <>
      <section className="signup-section">
        <div className="signup-container">
          <h1>Create Your Account</h1>
          <form className="signup-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" required />
            </div>
            <button type="submit" className="btn btn-primary">Sign Up</button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Signup;
