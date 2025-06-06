import React, { useState, useEffect } from 'react';
import './css/Posted.css';

const PostedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    const fetchJobs = async () => {
      const token = localStorage.getItem("interviewerToken");
      try {
        const response = await fetch('http://localhost:8000/api/jobposted',{
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setJobs(data); // Assuming the API returns an array of jobs
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const toggleDetails = (jobId) => {
    setSelectedJob((prevId) => (prevId === jobId ? null : jobId));
  };

  if (loading) {
    return <div className="loading">Loading jobs...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="posted-jobs-section">
      <h2>Posted Jobs</h2>
      <div className="job-list">
        {jobs.map((job) => (
          <div key={job.id} className="job-card">
            <h3>{job.title}</h3>
            <p>
              <strong>Company:</strong> {job.companyname}
            </p>
            <p>
              <strong>Location:</strong> {job.location}
            </p>
            <p>
              <strong>Posted On:</strong> {job.postedOn}
            </p>
            <p>
              <strong>Status:</strong> Open
            </p>
            <button
              className="view-details-btn"
              onClick={() => toggleDetails(job.id)}
            >
              {selectedJob === job.id ? 'Hide Details' : 'View Details'}
            </button>
            {selectedJob === job.id && (
              <div className="job-details">
                <p>
                  <strong>Description:</strong> {job.description}
                </p>
                <p>
                  <strong>Requirements:</strong> {job.requirements}
                </p>
                <p>
                  <strong>Skills:</strong> {job.skills}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostedJobs;
