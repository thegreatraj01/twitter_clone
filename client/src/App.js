import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Error from './Pages/Error';
import Home from './Pages/Home';
// import Navbar from './Component/Navbar/Navbar';
import Profile from './Pages/Profile';
import Explore from './Component/Explore/Explore';
import Login from './Pages/Login';
import Register from './Pages/Register';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="*" element={<Error />} />
        <Route path="/login" element={<Login/>} />
        <Route path='/register' element={<Register/>} />
      </Routes>
    </Router>
  );
}

export default App;
