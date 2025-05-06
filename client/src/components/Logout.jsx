// src/components/LogoutButton.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear JWT
    localStorage.removeItem('role');  // If you're storing role
    navigate('/login'); // Redirect to login page
  };

  return (
    <button onClick={handleLogout} className="logout-btn">
      Logout
    </button>
  );
};

export default Logout;
