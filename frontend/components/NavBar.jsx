import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Clear token
    navigate('/login'); // Redirect to login
  };

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', backgroundColor: '#1976d2', color: '#fff' }}>
      <h2>File Manager</h2>
      <div>
        <span style={{ marginRight: '1rem' }}>Goda Bharath Kumar</span>
        <button onClick={handleLogout} style={{ padding: '0.5rem 1rem', backgroundColor: '#f44336', border: 'none', color: '#fff', borderRadius: '5px' }}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
