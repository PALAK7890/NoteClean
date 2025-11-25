import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './navbar';
import Login from './login';
import Signin from './signin';
import Home from './home';
import CreateNote from './createnote';
import About from './about';
import Profile from './profile';
import SavedNotes from './savedNotes';
import { UserProvider } from './userContext'; 

import './App.css';

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Navbar /> 
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateNote />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/saved-notes" element={<SavedNotes />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
