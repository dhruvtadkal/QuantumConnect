import React from 'react';
// import { Navigate } from 'react-router-dom';
import { toast } from 'react-hot-toast'; // Import react-hot-toast

// Mock authentication function (in reality, retrieve this info from context or state)
const getCurrentUserRole = () => {
  const loggedInUser = JSON.parse(localStorage.getItem('user')); // Example using localStorage
  return loggedInUser ? loggedInUser.role : null;
};

const ProtectedRoute = ({ element: Component, allowedRoles }) => {
  const userRole = getCurrentUserRole();

  if (!userRole) {
    // Show toast and redirect to login
    toast.error('You need to be logged in to access this page.');
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(userRole)) {
    // Show toast and redirect to the home page
    toast.error('You do not have permission to access this page.');
    return <Navigate to="/" />;
  }

  // If the user is authorized, render the component
  return <Component />;
};

export default ProtectedRoute;
