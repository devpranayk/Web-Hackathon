import React, { useState } from "react";
import "./css/interview.css";
import getCSRFToken from "../interviewer/token";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar";
const FacultyLogin = () => {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setError("");
    setLoading(true);

    const loginData = { username, password };

    try {
      const response = await fetch("http://localhost:8000/api/faculty-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCSRFToken(),
        },
        body: JSON.stringify(loginData),
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem("facultyToken", result.access);
        setSuccessMessage("Login successful!");
        setusername("");
        setPassword("");
        navigate("/faculty");
      } else {
        setError(result.error || "Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("There was an error processing your request. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Navbar val={0}/>
    <div className="interviewer-login-container">
    <div className="form-container">
    <p className="title">Staff Login</p>
  
    <form className="form" onSubmit={handleSubmit}>
      {/* Success/Error Messages */}
      {successMessage && <div className="success-message">{successMessage}</div>}
      {error && <div className="error-message">{error}</div>}
      
      {/* Username Input Group */}
      <div className="input-group">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          placeholder=""
          value={username}
          onChange={(e) => setusername(e.target.value)}
          required
        />
      </div>
      
      {/* Password Input Group */}
      <div className="input-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder=""
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        </div>
        
      {/* Submit Button */}
      <button className="sign" type="submit" disabled={loading}>
        {loading ? "Logging in..." : "Sign in"}
      </button>
    </form>
  </div>
  </div>
  
  </>
  );
};

export default FacultyLogin;
