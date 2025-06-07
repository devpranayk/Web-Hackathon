import React,{useEffect,useRef} from "react";
import "./css/home.css";
import logo from "./assests/logo.png";
import { useNavigate } from "react-router-dom";




import {TweenMax, Power3} from 'gsap';
function Home() {
    const navigate=useNavigate();

    let textItem=useRef(null);
    let heroP=useRef(null);

    useEffect(()=>{
      console.log(textItem);
      TweenMax.to( textItem,.8,{opacity:1, y:-30, ease:Power3.easeOut })
      TweenMax.to(heroP,.8,{opacity:1,y:-30,ease:Power3.easeOut, delay:.8})
    })

  return (
    <>
        <div className="HomeDiv">
          <header>
            <nav class="navbar">
              <div class="logo">
                {" "}
                <img src={logo} /> <span>Placement Tracker</span>
              </div>

              <div class="auth-buttons">
                <button class="btn-shine" onClick={() => navigate('/auth')}>
                  <span>Login/Signup</span>
                </button>
              </div>
            </nav>
          </header>

          {/* Hero Section */}
          <section class="hero">
            <div class="hero-content">
              <h1 ref={el=>{textItem=el}}>Your Gateway to Career Opportunities</h1>
              <p ref={el=>{heroP=el}}>
                Connecting students, recruiters, and staff for a seamless placement
                experience.
              </p>
            </div>
          </section>

          {/* Features Section */}
          <section id="features" class="features">
            <h2>Explore Our Key Features</h2>
            <div class="features-container">
              <div class="feature">
                <div class="feature-icon">&#128104;&#8205;&#127891;</div>
                <h3>Student-Centric Tools</h3>
                <p>
                  Search and apply for jobs tailored to your profile. Track
                  applications, interview schedules, and receive personalized career
                  guidance.
                </p>
              </div>
              <div class="feature">
                <div class="feature-icon">&#128187;</div>
                <h3>Streamlined Job Posting</h3>
                <p>
                  Interviewers can post job openings, review applications, and
                  communicate directly with candidates for efficient hiring.
                </p>
              </div>
              <div class="feature">
                <div class="feature-icon">&#128202;</div>
                <h3>Comprehensive Analytics</h3>
                <p>
                  Staff can monitor placement stats, analyze trends, and generate
                  detailed reports for department-wide success tracking.
                </p>
              </div>
              <div class="feature">
                <div class="feature-icon">&#128218;</div>
                <h3>Resource Hub</h3>
                <p>
                  Enhance your skills with our resource hub offering resume-building
                  tools, interview tips, and career development guides.
                </p>
              </div>
            </div>
          </section>

          {/* Latest Updates Section */}
          <section id="updates" class="updates">
            <h2>Latest Updates</h2>
            <ul>
              <li>
                <strong>New Job Alert:</strong> ABC Corp hiring Software Engineers.
                Deadline: Jan 15, 2025.
              </li>
              <li>
                <strong>Workshop:</strong> Resume Writing Tips - Jan 10, 2025.
              </li>
              <li>
                <strong>Milestone:</strong> 200 students placed in 2025 season!
              </li>
            </ul>
          </section>

          {/* Testimonials Section */}
          <section id="testimonials" class="testimonials">
            <h2>What People Are Saying</h2>
            <div class="testimonial">
              <p>
                "Placement Tracker simplified the placement process and boosted my
                confidence." - A Happy Student
              </p>
            </div>
            <div class="testimonial">
              <p>
                "An essential tool for our recruitment needs. Highly efficient!" - A
                Recruiter
              </p>
            </div>
          </section>

          {/* Footer */}
          <footer>
            <p class="footText">
              &copy; 2025 Placement Tracker. All rights reserved.
            </p>
            <div class="footer-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Contact Us</a>
            </div>
          </footer>
        </div>
    </>
  );
}

export default Home;
