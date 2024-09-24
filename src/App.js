import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import AdminPage from './pages/AdminPage';
import HomePage from './pages/HomePage';
import EventList from './components/EventList';
import UserPage from './pages/UserPage';
import { loadUser } from './actions/authActions';  // Import the loadUser action

const App = () => {
  const dispatch = useDispatch();

  // Load the user when the app starts
  useEffect(() => {
    dispatch(loadUser()); // Dispatch loadUser action to check for token and load user data
  }, [dispatch]);

  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<AdminPage />} /> {/* You can add route protection later */}
          <Route path="/events" element={<EventList />} />
          <Route path="/user" element={<UserPage />} /> {/* You can add route protection later */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
