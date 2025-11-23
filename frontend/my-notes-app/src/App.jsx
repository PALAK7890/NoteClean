import React from 'react';
import Login from './login';
import Signin from './signin';
import Home from './home';
import CreateNote from './createnote';

import './App.css';
import Navbar from './navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateNote />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

