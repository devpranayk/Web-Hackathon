import React, { useState } from 'react';
import './css/Auth.css'
import getCSRFToken from '../interviewer/token'
import { useNavigate } from 'react-router-dom';

function Login() {
 const navigate = useNavigate();
const [formData, setFormData] = useState({
  username: '',
  
  password: '',
  
});

 const [error, setError] = useState(null);
 

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData({ ...formData, [name]: value });
};
    const handleSubmit = async (event) => {
      event.preventDefault();
      
      try { 
        const response = await fetch('http://localhost:8000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCSRFToken(), 
          },
          body: JSON.stringify(formData) 
        });
    
        if (response.ok) {
          const data = await response.json();
          localStorage.setItem('token', data.access);
          setError(null);
          setFormData({
            username: '',
            
            password: '',
            
          });
          navigate("/profile")
       
          
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
    <form onSubmit={handleSubmit} className="login">
      <div className="field">
        <input
          type="text"
          name="username"
          placeholder="Username"
          required
          value={formData.username}
          onChange={handleChange}
        />
      </div>
      <div className="field">
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      {error && <div className="error" style={{color:"red"}}>{error}</div>}
      <div className="pass-link">
        <a href="#">Forgot password?</a>
      </div>
      <div className="field btn">
        <div className="btn-layer"></div>
        <input type="submit" value="Login" />
      </div>
      
    </form>
  );
}


export default Login