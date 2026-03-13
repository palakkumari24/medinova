import React from 'react';
import '../style.css';
import '../App.css';
import '../login.css';

const Login = () => {
  return (
    <>
      <section className="login-section">
        <div className="login-container">
          <h1>Login to Medinova.ai</h1>
          <form className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" required />
            </div>
            <button type="submit" className="btn btn-primary">Log In</button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
