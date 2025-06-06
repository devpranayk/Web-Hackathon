import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../students/css/profile.css'
import Navbar from '../navbar.js'
import Placement from './PlacementData.js';


function InterViewSideBar()
{
    const [activeOption, setActiveOption] = useState("option1");
    const showContent = (optionId) => setActiveOption(optionId);
  
    return (
      <div style={{backgroundColor: "rgb(154, 135, 188)"}}>
      {/* Navbar */}
     <Navbar val={1} state={2}/>
  
      {/* Main Layout */}
      <div className="container">
        {/* Sidebar */}
        <aside className="menu">
          <button className="menu-item" onClick={() => showContent("option1")}>
            Placements Data
          </button>
          
          
        </aside>
        <section className="content">
      {activeOption === "option1" && <Placement/>}
      
        </section>
      </div>
      
    </div>
    );
 
}
export default InterViewSideBar