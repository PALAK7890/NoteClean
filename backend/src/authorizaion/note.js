const express = require("express");
const router = express.Router();
const { Note } = require("../models/db");
const auth = require("../middleware/authMiddleware");

// Create Note
router.post("/create", auth, async (req, res) => {
  try {
    const { title, content, tags } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title & Content required" });
    }

    const newNote = await Note.create({
      userId: req.user.id,
      title,
      content,
      tags: tags || []
    });

    res.status(201).json({
      message: "Note created successfully",
      note: newNote
    });
  } catch (error) {
    console.log("Error creating note:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
