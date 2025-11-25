import React, { useContext } from "react";
import { UserContext } from "./userContext";
import { Link } from "react-router-dom";
import "./styling/profile.css";
import profile from './assests/profile.png'

export default function Profile() {
  const { user } = useContext(UserContext);

  return (
    <div className="profile-container">

      {/* LEFT SIDE: USER IMAGE + INFO */}
      <div className="profile-left">
        <img
          src={profile}
          alt="profile"
          className="profile-img"
        />

        <h2>{user?.username}</h2>
        <p className="profile-email">{user?.email}</p>

        <Link to="/saved-notes">
          <button className="profile-btn">Go to Saved Notes</button>
        </Link>
      </div>

      {/* RIGHT SIDE: 4 BOX GRID */}
      <div className="profile-right">
        <h2 className="section-title">Recent Note Categories</h2>

        <div className="grid-box">
          <div className="box-item">✏️ Personal Notes</div>
          <div className="box-item">💡 Ideas & Brainstorm</div>
          <div className="box-item">📚 Study Notes</div>
          <div className="box-item">💼 Work Notes</div>
        </div>
      </div>
    </div>
  );
}
