import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import JobPost from './JobPost'
import './css/profile.css'
import Navbar from '../navbar.js'
import Applications from './JobApplicationUpdate';
import PostedJobs from './PostedJobs.js'

function InterViewSideBar()
{
    const [activeOption, setActiveOption] = useState("option1");
    const showContent = (optionId) => setActiveOption(optionId);
  
    return (
      <div style={{backgroundColor: "rgb(154, 135, 188)"}}>
      {/* Navbar */}
     <Navbar val={1} state={false}/>
  
      {/* Main Layout */}
      <div className="container">
        {/* Sidebar */}
        <aside className="menu">
          <button className="menu-item" onClick={() => showContent("option1")}>
            Post Jobs
          </button>
          <button className="menu-item" onClick={() => showContent("option3")}>
            Posted Jobs
          </button>
          <button className="menu-item" onClick={() => showContent("option2")}>
            Applicants
          </button>
          
        </aside>
        <section className="content">
      {activeOption === "option1" && <JobPost/>}
      {activeOption === "option2" && <Applications/>}
      {activeOption === "option3" && <PostedJobs/>}
        </section>
      </div>
      
    </div>
    );
 
}
export default InterViewSideBar