import React, { useState } from 'react';
import axios from 'axios';
import e from 'express';

const RegistrationForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleRegistration = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/user', { email, password, name });

      console.log(response.data); // Handle success response
    } catch (error) {
      console.error(error.response.data); // Handle error response
    }
  };

  return (
    <form>
      <h3>Sign Up</h3>
      <div className="mb-3">
        <label>ame</label>
        <input
          type="text"
          className="form-control"
          placeholder="First name"
          value={name}
          onChange={(e) => setName(e.target.value)} required
        />
      </div>
      <div className="mb-3">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} required

        />
      </div>
      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} required

        />
      </div>
      <div className="d-grid">
        <button onSubmit={handleRegistration} type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </div>
      <p className="forgot-password text-right">
        Already registered <a href="/sign-in">sign in?</a>
      </p>
    </form>
  )
};

export default RegistrationForm;
