import React, { useEffect, useState } from "react";
import "./css/faculty.css"; // Add your necessary CSS here

const Placement = () => {
  const [applications, setApplications] = useState([]);
  const [stats, setStats] = useState({
    applied: 0,
    accepted: 0,
    rejected: 0,
  });

  useEffect(() => {
    const token=localStorage.getItem('facultyToken')
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/faculty-login", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setApplications(data);

        // Calculate stats based on the `status` field
        const applied = data.filter((application) => application.status === "Pending").length;
        const accepted = data.filter((application) => application.status === "Accepted").length;
        const rejected = data.filter((application) => application.status === "Rejected").length;

        setStats({ applied, accepted, rejected });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const renderTable = (title, filterStatus) => {
    const filteredApplications = applications.filter(
      (application) => application.status === filterStatus
    );

    return (
      <section>
        <h2 className="section-title">{title}</h2>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Job Title</th>
                <th>Company</th>
                
              </tr>
            </thead>
            <tbody>
              {filteredApplications.length > 0 ? (
                filteredApplications.map((application, index) => (
                  <tr key={index}>
                    <td>{`${application.student.first_name} ${application.student.last_name}`}</td>
                    <td>{application.job_title}</td>
                    <td>{application.companyname}</td>
                    
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    );
  };

  return (
    <div className="faculty-container">
      <div className="faculty-stats">
        <h2 className="section-title">Placement Statistics</h2>
        <div className="stats-container">
          <div className="stat-badge applied">
            <span className="icon">📋</span>
            <h3>Pending</h3>
            <p>{stats.applied}</p>
          </div>
          <div className="stat-badge accepted">
            <span className="icon">✅</span>
            <h3>Accepted</h3>
            <p>{stats.accepted}</p>
          </div>
          <div className="stat-badge rejected">
            <span className="icon">❌</span>
            <h3>Rejected</h3>
            <p>{stats.rejected}</p>
          </div>
        </div>
      </div>
      {renderTable("Pending Applications", "Pending")}
      {renderTable("Accepted Applications", "Accepted")}
      {renderTable("Rejected Applications", "Rejected")}
    </div>
  );
};

export default Placement;
