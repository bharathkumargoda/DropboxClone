import React , {useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/AuthService';

const Navbar = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));
  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to login
  };

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', backgroundColor: '#1976d2', color: '#fff' }}>
      <h2>File Manager</h2>
      <div>
        <span style={{ marginRight: '1rem' }}>{user}</span>
        <button onClick={handleLogout} style={{ padding: '0.5rem 1rem', backgroundColor: '#f44336', border: 'none', color: '#fff', borderRadius: '5px' }}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
