// /components/ProtectedRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
 
  const user = JSON.parse(localStorage.getItem('user'));
    
  console.log("userdata", user);
  // Check if the user is authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }


  // Render the children if authenticated
  return children;
};

export default ProtectedRoute;
