import React from "react";
import { motion } from "framer-motion";
import Navbar from "./navbar";
import Footer from "./footer";
import "./styling/about.css"

const About = () => {
  return (
    <>
      <Navbar />

      <motion.div
        className="about-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1
          className="about-title"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          About FlowNotes
        </motion.h1>

        <motion.p
          className="about-intro"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          FlowNotes is your personal note-taking app to organize your ideas, tasks, 
          and important information in a clean, intuitive, and modern interface.
        </motion.p>

        <motion.h2
          className="about-subtitle"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          Key Features
        </motion.h2>

        <motion.ul
          className="about-features"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <motion.li whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
            📝 Create, edit, and delete notes easily
          </motion.li>
          <motion.li whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
            💾 Save your notes securely
          </motion.li>
          <motion.li whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
            📱 Fully responsive on desktop and mobile
          </motion.li>
          <motion.li whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
            🔍 Search notes quickly
          </motion.li>
          <motion.li whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
            🎨 Clean beige & brown theme
          </motion.li>
          <motion.li whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
            🔒 Secure login/signup system
          </motion.li>
        </motion.ul>

        <motion.h2
          className="about-subtitle"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.0, duration: 0.5 }}
        >
          Why FlowNotes?
        </motion.h2>

        <motion.p
          className="about-intro"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          FlowNotes helps students, professionals, and anyone who loves staying organized. 
          Capture your thoughts and tasks in a clean, distraction-free platform.
        </motion.p>


        
      </motion.div>

      <Footer />
    </>
  );
};

export default About;
