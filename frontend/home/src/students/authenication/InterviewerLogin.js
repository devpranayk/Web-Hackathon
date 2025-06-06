import React, { useState } from 'react';
import './css/interview.css';
import getCSRFToken from '../interviewer/token';
import { useNavigate } from 'react-router-dom';

const InterviewerLogin = () => {
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
   const navigate=useNavigate()
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setError('');
    setLoading(true); // Start loading indicator

    // Prepare login data
    const loginData = { username, password };

    try {
      // Send login request to the backend API
      const response = await fetch('http://localhost:8000/api/interview-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCSRFToken(), 
        },
        body: JSON.stringify(loginData),
      });

      const result = await response.json();

      // Check if the login was successful
      if (response.ok) {
        // Store the JWT token (for example, in localStorage or state)
        localStorage.setItem('interviewerToken', result.access);
        setSuccessMessage('Login successful!');
        console.log(result)
        setusername(''); 
        setPassword('');
        navigate('/inter')
      } else {
        setError(result.error || 'Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('There was an error processing your request. Please try again later.');
    } finally {
      setLoading(false); // Stop loading indicator
    }
  };

  return (
    <div className="interviewer-login-form">
      <h2>Interviewer Login</h2>
      {successMessage && <div className="success-message">{successMessage}</div>}
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            value={username}
            onChange={(e) => setusername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default InterviewerLogin;
