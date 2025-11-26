import React, { useEffect, useState } from 'react';

export default function SavedNotes() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch('http://localhost:8080/api/notes', {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await res.json();

      setNotes(data.notes || []);
    };

    fetchNotes();
  }, []);

  return (
    <div style={{ padding: '40px' }}>
      <h2>Your Saved Notes</h2>
      {notes.length === 0 && <p>No notes saved yet.</p>}
      {notes.map(note => (
        <div
          key={note._id}
          style={{
            border: '1px solid #ccc',
            padding: '12px',
            marginBottom: '10px',
            borderRadius: '8px'
          }}
        >
          <h3>{note.title || 'Untitled'}</h3>
          <p dangerouslySetInnerHTML={{ __html: note.content }} />
        </div>
      ))}
    </div>
  );
}
