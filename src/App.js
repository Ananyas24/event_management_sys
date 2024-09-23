import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import UserPage from './pages/UserPage';
import Login from './components/Login';
import Register from './components/Register';  // Import Register component
import Navbar from './components/Navbar';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/register" element={<Register />} /> {/* Add Register route */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
