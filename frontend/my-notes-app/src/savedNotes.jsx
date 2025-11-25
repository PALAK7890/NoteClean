import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from './userContext';

export default function SavedNotes() {
  const { user } = useContext(UserContext);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      const res = await fetch('http://localhost:8080/api/notes', {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      const data = await res.json();
      setNotes(data);
    };
    if (user) fetchNotes();
  }, [user]);

  return (
    <div style={{ padding: '40px' }}>
      <h2>Your Saved Notes</h2>
      {notes.length === 0 && <p>No notes saved yet.</p>}
      {notes.map(note => (
        <div key={note._id} style={{ border: '1px solid #ccc', padding: '12px', marginBottom: '10px', borderRadius: '8px' }}>
          <h3>{note.title || 'Untitled'}</h3>
          <p dangerouslySetInnerHTML={{ __html: note.content }}></p>
        </div>
      ))}
    </div>
  );
}
