import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './css/jobdata.css';

const JobData = () => {
  const [jobPostings, setJobPostings] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showDescription, setShowDescription] = useState(false);
  const [resume, setResume] = useState(null);  // New state for storing the resume file

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/getjobs', {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setJobPostings(data); // Set the fetched job data to state
        } else {
          console.error('Failed to fetch job postings');
        }
      } catch (error) {
        console.error('Error fetching job postings:', error);
      }
    };

    fetchJobs();
  }, []);

  const toggleDescription = (job) => {
    setSelectedJob(job);
    setShowDescription(!showDescription);
  };

  const handleResumeChange = (event) => {
    setResume(event.target.files[0]);  // Store the selected resume file
  };

  const handleApply = async () => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    
    // Append the job ID and resume to form data
    formData.append("resume", resume);  // Add the resume file
    formData.append("job_id", selectedJob.id);  // Add the job ID

    try {
      const response = await fetch(`http://localhost:8000/api/apply/${selectedJob.id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,  // Send the form data containing the resume
      });

      if (response.ok) {
        const result = await response.json();
        alert("Application submitted successfully!");
        console.log(result);
        window.location.reload(); // Refresh the page after successful application
      } else {
        const errorData = await response.json();
        alert(`Failed to apply: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error applying to the job:", error);
      alert("An error occurred while applying. Please try again.");
    } finally {
      setShowDescription(false);  // Close the job description modal
    }
  };

  return (
    <div>
      <h1>Jobs</h1>
      <div className="container">
        <div id="job-postings">
          {jobPostings.length > 0 ? (
            jobPostings.map((job, index) => (
              <div key={index} className="job-card bg-light mb-3 p-3">
                <h5>{job.companyname}</h5>
                <p><strong>Job Title:</strong> {job.title}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => toggleDescription(job)}
                >
                  {showDescription && selectedJob === job ? 'Show Less' : 'Show More'}
                </button>

                {showDescription && selectedJob === job && (
                  <div className="job-details mt-3">
                    <p><strong>Description:</strong> {job.description}</p>
                    <p><strong>Skills Required:</strong> {job.skills}</p>
                    <p><strong>Requirements:</strong> {job.requirements}</p>
                    <p><strong>Location:</strong> {job.location}</p>

                    {/* File input for uploading the resume */}
                    <div className="form-group">
                      <label htmlFor="resume">Upload Resume:</label>
                      <input
                        type="file"
                        className="form-control"
                        id="resume"
                        onChange={handleResumeChange}
                        required
                      />
                    </div>

                    <button className="btn btn-success mt-3" onClick={handleApply}>
                      Apply
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>No job postings available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobData;
