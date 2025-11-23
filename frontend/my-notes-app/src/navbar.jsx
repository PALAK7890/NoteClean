import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">

      <div className="nav-brand" onClick={() => navigate("/")}>
        FlowNotes
      </div>

      <div className="nav-links">
        <span onClick={() => navigate("/")}>Home</span>
        <span onClick={() => navigate("/about")}>About</span>
        <span onClick={() => navigate("/contact")}>Contact</span>
        <span onClick={() => navigate("/login")}>Login</span>
        <span onClick={() => navigate("/signup")}>Sign In</span>
      </div>
    </nav>
  );
};

export default Navbar;
