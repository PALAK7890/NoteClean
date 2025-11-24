import React from "react";
import { useNavigate } from "react-router-dom";
import "./styling/navbar.css"
const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logged out successfully!");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-brand" onClick={() => navigate("/")}>
        FlowNotes
      </div>

      <div className="nav-search">
        <input type="text" placeholder="Search..." className="search-input" />
      </div>

      <div className="nav-links">
        <span onClick={() => navigate("/")}>Home</span>
        <span onClick={() => navigate("/about")}>About</span>
        

        {!token ? (
          <>
            <span onClick={() => navigate("/login")}>Login</span>
            <span onClick={() => navigate("/signin")}>Sign Up</span>
          </>
        ) : (
          <span onClick={handleLogout}>Log Out</span>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
