import React, { useState, useEffect } from 'react';
import './css/JobStatus.css';

const JobStatus = () => {
  const [jobApplications, setJobApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    const fetchJobApplications = async () => {
      try {
        const token = localStorage.getItem('token'); 
        const response = await fetch('http://localhost:8000/api/student-application-status', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json(); 
          
          setJobApplications(data); // Set job applications data
        } else {
          throw new Error('Failed to fetch job applications.');
        }
      } catch (err) {
        setError(err.message); // Handle errors
      } finally {
        setLoading(false); // Set loading to false once the request is complete
      }
    };

    fetchJobApplications();
  }, []);

  // Display loading state or error message
  if (loading) {
    return <div className="text-center">Loading job applications...</div>;
  }

  if (error) {
    return <div className="text-center text-danger">{`Error: ${error}`}</div>;
  }

  return (
    <div>
      <h2>Job Application Status</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Job Title</th>
            <th>Company</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {jobApplications.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center">
                No job applications found.
              </td>
            </tr>
          ) : (
            jobApplications.map((job) => (
              <tr key={job.job}>
                <td>{job.title}</td>
                <td>{job.company_name}</td>
                <td>
                  <span
                    className={`badge ${
                      job.status === 'Pending'
                        ? 'bg-warning'
                        : job.status === 'Accepted'
                        ? 'bg-success'
                        : 'bg-danger'
                    }`}
                  >
                    {job.status}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default JobStatus;
