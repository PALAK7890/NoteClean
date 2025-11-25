import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./styling/home.css";
import doodle from "./assests/doodle.png";
import Footer from "./footer";

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) setUser({ username });;

    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8080/api/notes", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      setNotes(data.notes || []);
    } catch (err) {
      console.log("Error fetching notes:", err);
    }
  };

  const handleCreateNote = () => {
    if (!localStorage.getItem("token")) return navigate("/login");
    navigate("/create");
  };

  return (
    <>
      <div className="dashboard-container">

       <div className="hero-box">
  <div className="hero-left">
   <h1>Welcome, {user?.username || "User"} 👋</h1>
    <p className="hero-subtitle">Ready to write something today?</p>
  </div>

  <div className="hero-right">
    <img src={doodle} alt="hero-img" className="hero-img" />
  </div>

 
  
</div>
<button className="create-button" onClick={handleCreateNote}>
    + Create New Note
  </button>
        

        {/* RECENT NOTES TITLE */}
        <h2 className="section-heading">Recent Notes</h2>

        {/* HORIZONTAL SCROLL NOTES */}
        <div className="notes-scroll-container">
          {notes.length === 0 ? (
            <p className="no-notes">No notes yet… Create one!</p>
          ) : (
            notes.map((note) => (
              <motion.div
                key={note._id}
                className="note-card"
                whileHover={{ scale: 1.03 }}
              >
                <h3 className="note-heading">{note.title}</h3>
                <p className="note-preview">
                  {note.content.slice(0, 90)}...
                </p>
              </motion.div>
            ))
          )}
        </div>

       
        
      </div>

      <Footer />
    </>
  );
};

export default Home;
