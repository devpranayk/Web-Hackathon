import React,{useEffect,useRef} from "react";
import "./css/home.css";
import logo from "./assests/logo.png";
import { useNavigate } from "react-router-dom";
import student from './assests/student.svg'
import TextCarousel from './components/TextCarousel.jsx';
import rightArrow from './assests/rightArrow.svg'
import suitcase from './assests/suitcase.svg'
import alert from './assests/alert.svg'
import tools from './assests/tools.svg'
import analytics from './assests/analytics.svg'
import resume from './assests/resume.svg'
import listings from './assests/listings.svg'
import trackApplications from './assests/trackApplications.svg'
import resources from './assests/resources.svg'
import placementCAp from './assests/placementCap.svg'
import notes from './assests/notes.svg'
import employee from './assests/employee.svg'
import schedule from './assests/schedule.svg'
import selected from './assests/selected.svg'
import analysis from './assests/analysis.svg'
import building from './assests/building.svg'
import approve from './assests/approve.svg'
import exportt from './assests/exportt.svg'


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
                <img className="navLogo" src={logo} />
                
                {/* <span>Placement Tracker</span> */}
              </div>
                <TextCarousel />
              <div class="auth-buttons">
                <button class="btn-shine" onClick={() => navigate('/auth')}>
                  <span>Login/Signup</span>
                </button>
              </div>
            </nav>
          </header>

          {/* Hero Section */}
          <div className="CC">
            <div className="CC1"> <h1>CAREER</h1></div> 
            <div className="CC2"> <h1>CONNECT</h1></div>
          </div>

          <div className="subCC">
            <div className="subCC1">
              <img className="studentSvg"src={student}></img>
            </div>
            <div className="subCC2">
              <div className="StoE">
                <div className="StoE1">Student</div>
                <div className="StoE2"><img src={rightArrow}></img></div>
                <div className="StoE3">Corporate Employee</div>
              </div>
              <div className="gatewayP"> 
                <div className="gatewayP1"><p>Your Gateway to Career Opportunities</p></div>
                <div className="gatewayP2"><p>Connecting students, recruiters, and staff for a seamless placement experience</p></div>
              </div>
            </div>
          </div>






          <section className="why-connect">
            <h2 className="section-title">Why Choose Career Connect?</h2>
            <div className="why-grid">
              <div className="why-card">
                <span className="why-icon"><img src={suitcase}></img></span>
                <h3>Tailored Job Recommendations</h3>
                <p>Smart job matches based on your skills and interests.</p>
              </div>
              <div className="why-card">
                <span className="why-icon"><img src={alert}></img></span>
                <h3>Instant Alerts</h3>
                <p>Real-time updates on job openings and deadlines.</p>
              </div>
              <div className="why-card">
                <span className="why-icon"><img src={tools}></img></span>
                <h3>Unified Tools</h3>
                <p>Students, recruiters, and staff on a single platform.</p>
              </div>
              <div className="why-card">
                <span className="why-icon"><img src={analytics}></img></span>
                <h3>Live Analytics</h3>
                <p>Track placement trends and performance effortlessly.</p>
              </div>
            </div>
          </section>



                                                                      {/* for students  */}

        <section className="student-journey-zigzag">
          <h2 className="SCT">Student-Centric Tools</h2>

          <div className="step">
            <div className="step-text">
              <h3>Create Your Profile</h3>
              <p>Sign up and define your academic & career details to get personalized recommendations.</p>
            </div>
            <div className="step-img">
              <img className="FSLogo" src={resume} alt="Create profile" />
            </div>
          </div>

          {/* Step 2 */}
          <div className="step reverse">
            <div className="step-img">
              <img className="FSLogo" src={listings} alt="Explore opportunities" />
            </div>
            <div className="step-text">
              <h3>Explore Opportunities</h3>
              <p>Browse curated job listings tailored to your background and ambitions.</p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="step">
            <div className="step-text">
              <h3>Track Applications</h3>
              <p>Keep everything organized — deadlines, interview calls, statuses all in one place.</p>
            </div>
            <div className="step-img">
              <img className="FSLogo" src={trackApplications} alt="Track applications" />
            </div>
          </div>

          {/* Step 4 */}
          <div className="step reverse">
            <div className="step-img">
              <img className="FSLogo" src={resources} alt="Preparation materials" />
            </div>
            <div className="step-text">
              <h3>Access Prep Resources</h3>
              <p>Unlock mock tests, interview guides, and expert tips for confident preparation.</p>
            </div>
          </div>

          {/* Step 5 */}
          <div className="step">
            <div className="step-text">
              <h3>Get Placed</h3>
              <p>Celebrate your success and officially launch your career with an offer letter!</p>
            </div>
            <div className="step-img">
              <img className="FSLogo" src={placementCAp} alt="Get placed" />
            </div>
          </div>
        </section>

                                                                {/* for recruiter */}





<section className="recruiter-journey">
  <h2>Streamlined Job Posting</h2>
  <div className="stepper">

    <div className="step-block">
      <div className="step-icon"><img src={notes}></img></div>
      <div className="step-content">
        <h3>Post Openings</h3>
        <p>Create and manage job posts targeting eligible students instantly.</p>
      </div>
    </div>

    <div className="step-block">
      <div className="step-icon"><img src={employee}></img></div>
      <div className="step-content">
        <h3>Review Applicants</h3>
        <p>Access profiles, resumes, and applications in a simplified interface.</p>
      </div>
    </div>

    <div className="step-block">
      <div className="step-icon"><img src={schedule}></img></div>
      <div className="step-content">
        <h3>Schedule Interviews</h3>
        <p>Coordinate interview dates with students and send automated reminders.</p>
      </div>
    </div>

    <div className="step-block">
      <div className="step-icon"> <img src={selected}></img></div>
      <div className="step-content">
        <h3>Select Candidates</h3>
        <p>Filter top performers and finalize placements directly from your dashboard.</p>
      </div>
    </div>

  </div>
</section>




                                                                {/* TPO section */}

          <section className="staff-dashboard">
            <h2>Placement Officer Dashboard</h2>
            <div className="dashboard-metrics">
              <div className="metric-card">
                <h3><img src={analysis}></img> 200+</h3>
                <p>Students Placed</p>
              </div>
              <div className="metric-card">
                <h3><img src={building}></img> 35+</h3>
                <p>Companies Visited</p>
              </div>
              <div className="metric-card">
                <h3><img src={analytics}></img> 10</h3>
                <p>Reports Generated</p>
              </div>
            </div>

            <div className="dashboard-grid">
              <div className="grid-item">
                <h4><img src={schedule}></img> Schedule Drives</h4>
                <p>Set campus interview dates and notify students instantly.</p>
              </div>
              <div className="grid-item">
                <h4><img src={approve}></img> Approve Job Posts</h4>
                <p>Review and approve listings shared by recruiters.</p>
              </div>
              <div className="grid-item">
                <h4><img src={exportt}></img> Export Reports</h4>
                <p>Generate analytics and placement summaries for each department.</p>
              </div>
            </div>
          </section>




                                                            {/* new footer */}


<footer className="main-footer">
  <div className="footer-container">
    
    <div className="footer-brand">
      <img src={logo} alt="Career Connect Logo" className="footer-logo" />
      <p>Your bridge to future careers. Connecting students, recruiters, and colleges with ease.</p>
    </div>

    <div className="footer-links">
      <h4>Quick Links</h4>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="#features">Features</a></li>
        <li><a href="/auth">Login</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </div>

    <div className="footer-contact">
      <h4>Contact Us</h4>
      <p>Email: support@careerconnect.com</p>
      <p>Phone: +91 98765 43210</p>
      <div className="social-icons">
        <a href="#"><i className="fab fa-linkedin"></i></a>
        <a href="#"><i className="fab fa-twitter"></i></a>
        <a href="#"><i className="fab fa-instagram"></i></a>
      </div>
    </div>
  </div>

  <div className="footer-bottom">
    <p>&copy; {new Date().getFullYear()} Career Connect. All rights reserved.</p>
  </div>
</footer>




                                                              {/* hero section */}

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
