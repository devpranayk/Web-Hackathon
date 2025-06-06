import React, { useState } from 'react';
import './css/Auth.css';
import getCSRFToken from '../interviewer/token'

function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '', 
    password: '',
    re_password: '',
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate password match before sending the request
    if (formData.password !== formData.re_password) {
      setError('Passwords do not match!');
      return;
    }

    try {
      const csrftoken = getCSRFToken(); 
      const response = await fetch('http://localhost:8000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken, 
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data); 
        setError(null);
        setFormData({
          username: '',
          email: '',
          password: '',
          re_password: '',
        });
      } else {
        const data = await response.json();
        console.log(data);
        setError(data.error || 'Something went wrong');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while processing your request');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="signup">
      {error && <div className="error" style={{color:"red"}}>{error}</div>}
      <div className="field">
        <input
          type="text"
          placeholder="Email Address"
          required
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div className="field">
        <input
          type="text"
          placeholder="Username"
          required
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
      </div>
      <div className="field">
        <input
          type="password"
          placeholder="Password"
          required
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <div className="field">
        <input
          type="password"
          placeholder="Confirm password"
          required
          name="re_password"
          value={formData.re_password}
          onChange={handleChange}
        />
      </div>
      
      <div className="field btn">
        <div className="btn-layer"></div>
        <input type="submit" value="Signup" />
      </div>
    </form>
  );
}

export default Signup;