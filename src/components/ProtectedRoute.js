import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

// Protect routes and ensure role-based access
const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token');
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userRole = token ? JSON.parse(atob(token.split('.')[1])).role : null;

  if (!isAuthenticated) {
    return <Navigate to="/login" />;  // Redirect to login if not authenticated
  }

  // Check if the user's role is allowed to access the route
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/user" />;  // Redirect to user dashboard if access is denied
  }

  return children;  // Render the children if authorized
};

export default ProtectedRoute;
