import { useNavigate } from 'react-router-dom';
import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from './navbar';
import Footer from './footer';
import "./styling/home.css"

const Home = () => {
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState("All");

  const notes = [
    { id: 1, title: "Work Plan", text: "Office tasks...", category: "Work" },
    { id: 2, title: "Study Notes", text: "React hooks summary...", category: "Study" },
    { id: 3, title: "Personal Goals", text: "Morning routine...", category: "Personal" },
  ];

  const filteredNotes =
    selectedCategory === "All"
      ? notes
      : notes.filter((note) => note.category === selectedCategory);

const handleCreateNote = () => {
  const token = localStorage.getItem("token");  

  if (!token) {
    alert("You must be logged in to create a note!");
    return navigate("/login");
  }

  navigate("/create");
};

  return (
    <>
      <Navbar />
      <div className="home-container">

        <motion.h1
          className="heading"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          Notes App
        </motion.h1>

        <motion.button
          className="create-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCreateNote}
        >
          + Create New Note
        </motion.button>

        {/* -----------------------
           CATEGORY FILTER UI
        ------------------------ */}
        <div className="category-section">
          {["All", "Work", "Personal", "Study", "Important"].map((cat) => (
            <button
              key={cat}
              className={`category-btn ${
                selectedCategory === cat ? "active-category" : ""
              }`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* -----------------------
           FILTERED NOTES LIST
        ------------------------ */}
        <div className="notes-grid">
          {filteredNotes.map((note, i) => (
            <motion.div
              key={note.id}
              className="note-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <h2 className="note-title">{note.title}</h2>
              <p className="note-text">{note.text}</p>
              <span className="note-category-tag">{note.category}</span>
            </motion.div>
          ))}
        </div>

      </div>
      <Footer />
    </>
  );
};

export default Home;
