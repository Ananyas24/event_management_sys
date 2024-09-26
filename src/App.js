import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import EventForm from './components/EventForm';
import ProtectedRoute from './components/ProtectedRoute';
import AppNavbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  // Ensure Toastify CSS is imported
import './App.css';

function App() {
  return (
    <div className="app-container">
      <AppNavbar />
      
      {/* ToastContainer placed globally */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/admin" element={<ProtectedRoute allowedRoles={['Admin']}><AdminDashboard /></ProtectedRoute>} />
        <Route path="/create-event" element={<ProtectedRoute allowedRoles={['Admin']}><EventForm /></ProtectedRoute>} />
        <Route path="/user" element={<ProtectedRoute allowedRoles={['User']}><UserDashboard /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;
