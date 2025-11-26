const express = require("express");
const router = express.Router();
const authMiddleware = require("../authorization/auth");
const { Note } = require("../database_md/db");


router.post("/create", authMiddleware, async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const note = await Note.create({ userId: req.user._id, title, content, tags });
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get("/", authMiddleware, async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user._id });
    res.json({notes});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true }
    );
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Note.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    res.json({ message: "Note deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
