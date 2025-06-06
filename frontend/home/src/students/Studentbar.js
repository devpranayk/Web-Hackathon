import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserProfile from './userprofile';
import JobData from './jobdata.js';
import DropdownMenu from './resources.js';
import JobStatus from './JobStaus.js';
import Navbar from '../navbar.js'
import './css/profile.css'

const StudentSidebar = () => {
  const [activeOption, setActiveOption] = useState("option1");
  const showContent = (optionId) => setActiveOption(optionId);

  return (
    <div style={{backgroundColor:"rgb(154 135 188)"}}>
   <Navbar val={1} state={true}/>

    {/* Main Layout */}
    <div className="container">
      {/* Sidebar */}
      <aside className="menu">
        <button className="menu-item" onClick={() => showContent("option1")}>
          Profile
        </button>
        <button className="menu-item" onClick={() => showContent("option2")}>
          Companies
        </button>
        <button className="menu-item" onClick={() => showContent("option3")}>
          Applications
        </button>
        <button className="menu-item" onClick={() => showContent("option4")}>
          Preparation
        </button>
        
      </aside>
      <section className="content">
    {activeOption === "option1" && <UserProfile/>}
    {activeOption === "option2" && <JobData/>}
    {activeOption === "option3" && <JobStatus/>} 
    {activeOption === "option4" && <DropdownMenu/>} 


   
      </section>
    </div>
    
  </div>
  );
};

export default StudentSidebar;