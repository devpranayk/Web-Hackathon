import React, { useState } from "react";
import './css/Jobpost.css';

function JobPost() {
  
  const [jobDetails, setJobDetails] = useState({
    company_name: '',
    job_title: '',
    job_description: '',
    skills_required: '',
    requirements: '',
    location: ''
  });


 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobDetails({ ...jobDetails, [name]: value });
  };

  const handleSave = () => {
    const token = localStorage.getItem("interviewerToken");
    fetch('http://127.0.0.1:8000/api/jobpost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(jobDetails),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        if (data.success === "Job posted successfully.") {
          alert("Job Posted Successfully!");
          window.location.reload();
        } else {
          alert("Error posting job");
        }
      })
      .catch(error => console.error('Error:', error));
  };

  
  return (
    <div className="form-container">
      <h2>Post a New Job</h2>
      <div className="form-group">
        <label>Company Name</label>
        <input
          type="text"
          name="company_name"
          placeholder="Enter company name"
          value={jobDetails.company_name}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Job Title</label>
        <input
          type="text"
          name="job_title"
          placeholder="Enter job title"
          value={jobDetails.job_title}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Job Description</label>
        <textarea
          name="job_description"
          placeholder="Enter job description"
          value={jobDetails.job_description}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Skills Required</label>
        <input
          type="text"
          name="skills_required"
          placeholder="Enter skills required"
          value={jobDetails.skills_required}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Requirements</label>
        <textarea
          name="requirements"
          placeholder="Enter job requirements"
          value={jobDetails.requirements}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Location</label>
        <input
          type="text"
          name="location"
          placeholder="Enter job location"
          value={jobDetails.location}
          onChange={handleChange}
        />
      </div>
      <button onClick={handleSave}>Save</button>
      
    </div>
  );
}

export default JobPost;
