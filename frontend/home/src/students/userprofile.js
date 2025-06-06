import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/UserProfile.css";
import logo from './assests/profile.png'

const UserProfile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [editedDetails, setEditedDetails] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false); // Loading state for save

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("User is not logged in");
        return;
      } 

      try {
        const response = await fetch("http://localhost:8000/api/user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        
        const data = await response.json();
        console.log(data)
        setUserDetails(data);
        setEditedDetails(data); // Initialize edit form
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchData();
  }, []);

  const handleSkillChange = (index, e) => {
    const newSkills = [...editedDetails.skills];
    newSkills[index] = e.target.value;
    setEditedDetails({ ...editedDetails, skills: newSkills });
  };

  const addSkill = (e) => {
    e.preventDefault();
    setEditedDetails({
      ...editedDetails,
      skills: [...editedDetails.skills, ""],
    });
  };

  const removeSkill = (index, e) => {
    e.preventDefault();
    const newSkills = [...editedDetails.skills];
    newSkills.splice(index, 1);
    setEditedDetails({ ...editedDetails, skills: newSkills });
  };

  const handleInputChange = (e) => {
    const { title, value } = e.target;

    setEditedDetails((prevDetails) => ({
      ...prevDetails,
      [title]: value,
    }));
  };

  const saveDetails = () => {
    setIsSaving(true); // Show loading state
    console.log(editedDetails);
    fetch("http://localhost:8000/api/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(editedDetails),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to save user details");
        }
        return response.json();
      })
      .then((data) => {
        setUserDetails(data); // Update the user details
        setModalOpen(false); // Close the modal
        setIsSaving(false); // Hide loading state
        window.location.reload()
      })
      .catch((error) => {
        console.error("Error saving user details:", error);
        setIsSaving(false); // Hide loading state on error
      });
  };

  const openEditModal = () => {
    setEditedDetails({ ...userDetails });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  // Ensure skills is always an array
  const skills = editedDetails?.skills || [];

  if (!userDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div id="option1" className="content-item active">
      <div className="profile-page">
        <div className="profile-container">
          <div className="user-photo">
            <img src={logo}  className="photo-image" alt="profileimage"/>
          </div>

          <div className="details-container">
            <h3 id="user_name">
              {userDetails.first_name} {userDetails.last_name}
            </h3>

            <p>
              <strong>Email:</strong>{" "}
              <span id="user-email">{userDetails.email}</span>
            </p>
            <p>
              <strong>Mobile:</strong>{" "}
              <span id="user-mobile">{userDetails.contact_number}</span>
            </p>
            <p>
              <strong>Gender:</strong>{" "}
              <span id="user-gender">{userDetails.gender}</span>
            </p>
            <p>
              <strong>Percentage:</strong>{" "}
              <span id="user-btech">{userDetails.score}%</span>
            </p>

            <div className="skills-section">
              <strong>Skills:</strong>
              <ul id="skills-list">
                {skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </div>

            <button className="btn edit-btn" onClick={openEditModal} style={{backgroundColor:"#6b5592", color:"white"}}>
              Edit
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal show" id="edit-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h5>Edit Profile</h5>
            </div>
            <div className="modal-body">
              <form id="edit-form" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label>First Name:</label>
                  <input
                    type="text"
                    title="first_name"
                    id="edit-first-name"
                    value={editedDetails?.first_name || ""}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label>Last Name:</label>
                  <input
                    type="text"
                    title="last_name"
                    id="edit-last-name"
                    value={editedDetails?.last_name || ""}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label>Percentage:</label>
                  <input
                    type="text"
                    id="edit-btech"
                    title="score"
                    value={editedDetails?.score || ""}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label>Contact:</label>
                  <input
                    type="text"
                    id="edit-contact"
                    title="contact_number"
                    value={editedDetails?.contact_number || ""}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label>Gender:</label>
                  <select
                    id="edit-gender"
                    title="gender"
                    value={editedDetails?.gender || ""}
                    onChange={handleInputChange}
                  >
                    <option value="" disabled>Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label>Skills:</label>
                  <ul id="edit-skills-list">
                    {skills.map((skill, index) => (
                      <li key={index}>
                        <input
                          type="text"
                          value={skill}
                          onChange={(e) => handleSkillChange(index, e)}
                        />
                        <button
                          className="remove-btn"
                          onClick={(e) => removeSkill(index, e)}
                        >
                          &times;
                        </button>
                      </li>
                    ))}
                  </ul>
                  <button className="add-btn" onClick={addSkill}>
                    + Add Skill
                  </button>
                </div>
              </form>
            </div>

            <div className="modal-footer">
              <button
                className="btn save-btn"
                onClick={saveDetails}
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Save"}
              </button>
              <button className="btn close-btn" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
