import { useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
   <nav className="navbar">
  <div className="nav-container">
    <h2 className="navbar-logo">TransLingo</h2>

    <button className="logout-btn" onClick={handleLogout}>
      Logout
    </button>
  </div>
</nav>


  );
}

export default Navbar;
