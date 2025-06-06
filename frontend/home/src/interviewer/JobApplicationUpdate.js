import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "react-bootstrap"; // Modal from react-bootstrap
import "./css/Jobupdate.css"; // Custom CSS

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Open modal to view applicant details
  const openProfile = (applicant) => {
    setSelectedApplicant(applicant);
    setShowModal(true);
  };

  // Close modal and reset selected applicant
  const closeModal = () => {
    setShowModal(false);
    setSelectedApplicant(null);
  };

  // Update application status (Accept or Reject)
  const updateApplicationStatus = async (status) => {
    if (!selectedApplicant) return;

    const token = localStorage.getItem("interviewerToken");

    try {
      const response = await fetch(
        `http://localhost:8000/api/applicants/${selectedApplicant.application_id}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      if (response.ok) {
        alert(`Application ${status} successfully!`);
       window.location.reload();
      } else {
        console.error("Failed to update application status.");
        alert("Failed to update application status. Please try again.");
      }
    } catch (error) {
      console.error("Error updating application status:", error);
      alert("An error occurred. Please try again.");
    } finally {
      closeModal(); // Close modal after updating
    }
  };

  // Fetch all applications on component mount
  useEffect(() => {
    const token = localStorage.getItem("interviewerToken");

    const fetchApplications = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/applicants", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data)
          setApplications(data);
        } else {
          throw new Error("Failed to fetch applications");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  // Loading and error states
  if (loading) {
    return <div className="text-center mt-5">Loading applications...</div>;
  }

  if (error) {
    return <div className="text-center mt-5 text-danger">Error: {error}</div>;
  }

  return (
    <div id="applications-section" className="content-item">
      <h1 className="my-5 text-center text-primary">Applications</h1>
      <div className="container">
        {applications.length === 0 ? (
          <p className="text-center">No applications found.</p>
        ) : (
          <div id="applications-list">
            {applications.map((applicant, index) => (
              <div className="application-card mb-3" key={index}>
                <div className="details">
                  <p>
                    <strong>Name:</strong> {applicant.student.first_name}
                  </p>
                  <p>
                    <strong>Email:</strong> {applicant.student.email}
                  </p>
                  <p>
                    <strong>Mobile:</strong> {applicant.student.contact_number}
                  </p>
                  
                    
                    <p>
                <strong>Portfolio:</strong>{" "}
                <a href={`http://localhost:8000/media/resumes/${applicant.student.resume}`} target="_blank" rel="noreferrer" style={{color:"blue"}}>Reume</a>
                  View Resume
                  </p>
                  <p>
                    <strong>Status:</strong> {applicant.status || "Pending"}
                  </p>
                </div>
                <button
                  className="btn btn-primary"
                  onClick={() => openProfile(applicant)}
                >
                  Open Profile
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal for Applicant Profile */}
      <Modal show={showModal} onHide={closeModal} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Applicant Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedApplicant ? (
            <>
              <p>
                <strong>Name:</strong> {selectedApplicant.student.first_name}
              </p>
              <p>
                <strong>Email:</strong> {selectedApplicant.student.email}
              </p>
              <p>
                <strong>Mobile:</strong> {selectedApplicant.student.contact_number}
              </p>
              <p>
                <strong>Skills:</strong> {selectedApplicant.student.skills}
              </p>
              <p>
                <strong>BTech %:</strong> {selectedApplicant.student.score}
              </p>
            
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`badge ${
                    selectedApplicant.status === "Accepted"
                      ? "bg-success"
                      : selectedApplicant.status === "Rejected"
                      ? "bg-danger"
                      : "bg-warning"
                  }`}
                >
                  {selectedApplicant.status || "Pending"}
                </span>
              </p>
            </>
          ) : (
            <p>Loading applicant details...</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-success"
            onClick={() => updateApplicationStatus("Accepted")}
          >
            Accept
          </button>
          <button
            className="btn btn-danger"
            onClick={() => updateApplicationStatus("Declined")}
          >
            Reject
          </button>
          <button className="btn btn-secondary" onClick={closeModal}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Applications;
