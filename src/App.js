import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import AdminPage from './pages/AdminPage';
import HomePage from './pages/HomePage';

import EventList from './components/EventList';
import UserPage from './pages/UserPage';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
        <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/events" element={<EventList />} />
          <Route path="/user" element={<UserPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
