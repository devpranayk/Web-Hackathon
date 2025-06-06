import React, { useState, useEffect } from 'react';
import './css/Auth.css'
import Signup from './Signup';
import Login from './Login';

import { useNavigate } from 'react-router-dom';
function Authenication() {
  const [activeForm, setActiveForm] = useState('login');
  const [userType, setUserType] = useState(null); 
  const navigate=useNavigate()
  
  const handleUserTypeSelection = (type) => {
    setUserType(type);
    setActiveForm('login');
  };

  const handleFormSwitch = (form) => {
    setActiveForm(form);
  };

  
  useEffect(() => {
    if (userType) {
      document.title = activeForm === 'login' ? `${userType} Login` : `${userType} Signup`;
    }
  }, [activeForm, userType]);

  return (
    <div className='auth'>
      <div className="wrapper">
        {/* User type selection prompt */}
        {userType === null ? (
          <div className="user-type-selection">
            <button onClick={() => handleUserTypeSelection('student')}>I am a Student</button>
            <button onClick={() => handleUserTypeSelection('interviewer')}>I am an Interviewer</button>
          </div>
        ) : (
          <>
            <div className="title-text">
              <div className={`title ${activeForm === 'login' ? 'active' : ''}`}> 
                {activeForm === 'login' ? `${userType} Login` : `${userType} Signup`}
              </div>
            </div>

            <div className="form-container">
              <div className="slide-controls">
            
                {userType === 'student' && (
                  <input
                    type="radio"
                    name="slide"
                    id="login"
                    checked={activeForm === 'login'}
                    onChange={() => handleFormSwitch('login')}
                  />
                )}
                <input
                  type="radio"
                  name="slide"
                  id="signup"
                  checked={activeForm === 'signup'}
                  onChange={() => handleFormSwitch('signup')}
                />
                <label
                  htmlFor="login"
                  className={`slide ${activeForm === 'login' ? 'login active' : 'login'}`}
                >
                  Login
                </label>
                <label
                  htmlFor="signup"
                  className={`slide ${activeForm === 'signup' ? 'signup active' : 'signup'}`}
                >
                  Signup
                </label>
                <div className="slider-tab"></div>
              </div>
              <div className="form-inner">
                {activeForm === 'login' && userType === 'student' && <Login />}
                {activeForm === 'login' && userType === 'interviewer' && navigate('/in')}
                {activeForm === 'signup' && <Signup />}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Authenication;
