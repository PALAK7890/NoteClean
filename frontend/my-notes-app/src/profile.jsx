import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { Link } from 'react-router-dom';

export default function Profile() {
  const { user } = useContext(UserContext);

  return (
    <div style={{ padding: '40px' }}>
      <h1>Welcome, {user?.name}</h1>
      <Link to="/saved-notes">
        <button>Go to Saved Notes</button>
      </Link>
    </div>
  );
}
