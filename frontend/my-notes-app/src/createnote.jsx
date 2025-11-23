import React, { useState } from "react";
import "./app.css";

const CreateNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSave = () => {
    if (!title.trim() || !content.trim()) {
      alert("Please fill all the fields!");
      return;
    }

    const newNote = {
      id: Date.now(),
      title,
      content,
    };

    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    savedNotes.push(newNote);

    localStorage.setItem("notes", JSON.stringify(savedNotes));

    alert("Note created successfully!");
    setTitle("");
    setContent("");
  };

  return (
    <div className="create-note-container">
      <h1 className="create-heading">Create a New Note</h1>

      <div className="create-form">
        <input
          type="text"
          placeholder="Enter Note Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Write your note here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button onClick={handleSave}>Create Note</button>
      </div>
    </div>
  );
};

export default CreateNote;
