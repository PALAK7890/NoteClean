import { useNavigate } from 'react-router-dom';
import React from "react";
import { motion } from "framer-motion";
import Navbar from './navbar';
import Footer from './footer';

const Home = () => {
  const navigate = useNavigate();

  const handleCreateNote = () => {
    const user = localStorage.getItem("user");  // or token

    if (!user) {
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

        <div className="notes-grid">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="note-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <h2 className="note-title">Sample Note {i}</h2>
              <p className="note-text">This is a preview of note {i}...</p>
            </motion.div>
          ))}
        </div>

      </div>
      <Footer />
    </>
  );
};

export default Home;
