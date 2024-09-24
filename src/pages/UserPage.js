import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom'; 

const UserPage = () => {
  const user = useSelector((state) => state.auth.user);

  // If user is not authenticated, redirect to login
  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <h1>Welcome to your dashboard, {user.username}</h1>
      {/* Rest of your dashboard content */}
    </div>
  );
};

export default UserPage;
