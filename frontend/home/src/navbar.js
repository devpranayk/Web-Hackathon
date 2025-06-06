import logo from './assests/logo.png';
import { useNavigate } from 'react-router-dom';

function Navbar({ val, state }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    let token;
    if(state===2){
      token = localStorage.getItem("facultyToken");
    }
    else if (state) {
      token = localStorage.getItem("token");
    } else {
      token = localStorage.getItem("interviewerToken");
    }

    if (!token) {
      alert("No token found. Please log in again.");
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/logout', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        // Remove the token from local storage
        if (state) {
          localStorage.removeItem("token");
        } else {
          localStorage.removeItem("interviewerToken");
        }

        alert(data.message);
        // Navigate to home page after successful logout
        navigate('/');
      } else {
        alert("Error during logout: " + data.message);
      }

    } catch (error) {
      alert("Error while performing Logout");
      console.error(error);  
      navigate('/auth');  // Navigate to home in case of an error
    }
  };

  return (
    <header>
      <nav className="navbar">
        <div className="logo">
          <img src={logo} alt="Placement Tracker Logo" /> <span>Placement Tracker</span>
        </div>
        {val !== 0 && (
          <div className="auth-buttons" onClick={handleLogout}>
            <button className="btn-shine">
              <span>Logout</span>
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
