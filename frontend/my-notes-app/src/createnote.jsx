import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import "./styling/createnote.css";

export default function NoteEditor() {
  const editorRef = useRef(null);
  const [title, setTitle] = useState("");
  const [highlightColor, setHighlightColor] = useState("#fff59d");

  const exec = (command, value = null) => {
    if (editorRef.current) editorRef.current.focus();

    if (command === "highlight") {
      const useCmd = document.queryCommandSupported("hiliteColor")
        ? "hiliteColor"
        : "backColor";
      document.execCommand(useCmd, false, value || highlightColor);
      return;
    }

    if (command === "formatBlock") {
      document.execCommand("formatBlock", false, value);
      return;
    }

    document.execCommand(command, false, value);
  };

  const saveNote = async () => {
    const content = editorRef.current.innerHTML.trim();

    if (!title.trim() && !content) {
      alert("Please add title or content");
      return;
    }

    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:8080/api/notes/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ title, content })
      });

      const data = await res.json();
      console.log("Saved:", data);

      setTitle("");
      editorRef.current.innerHTML = "";
    } catch (err) {
      console.log("Save Error:", err);
    }
  };

  return (
    <div className="editor-container">

      <div className="editor-main">
        <div className="editor-box">
          <input
            className="title-input"
            placeholder="Note title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* --------- Toolbar --------- */}
          <div className="toolbar">
            <button onClick={() => exec("bold")}>B</button>
            <button onClick={() => exec("italic")}>I</button>
            <button onClick={() => exec("underline")}>U</button>
            <button onClick={() => exec("formatBlock", "<h1>")}>H1</button>
            <button onClick={() => exec("formatBlock", "<h2>")}>H2</button>
            <button onClick={() => exec("formatBlock", "<h3>")}>H3</button>
            <input
              type="color"
              value={highlightColor}
              onChange={(e) => setHighlightColor(e.target.value)}
            />
            <button onClick={() => exec("highlight", highlightColor)}>
              Highlight
            </button>
            <button onClick={() => exec("insertUnorderedList")}>• List</button>
            <button
              onClick={() =>
                exec("createLink", prompt("Enter URL:", "https://"))
              }
            >
              Link
            </button>
          </div>

          {/* --------- Editor Area --------- */}
          <motion.div
            className="editor-area"
            contentEditable
            suppressContentEditableWarning
            ref={editorRef}
          ></motion.div>

          {/* --------- Save/Clear Buttons --------- */}
          <div className="editor-actions">
            <button className="clear-btn" onClick={() => document.execCommand("removeFormat")}>
              Clear
            </button>
            <button className="save-btn-box" onClick={saveNote}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
