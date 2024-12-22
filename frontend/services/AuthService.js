// /services/AuthService.js
import axios from 'axios';

export const login = async (email, password, setUser) => {
  try {
    const res = await axios.post('/api/auth/login', { email, password });
    localStorage.setItem('token', res.data.token);
    setUser(res.data.user);
  } catch (err) {
    console.error('Login failed:', err);
    throw err; // Handle the error in the component that calls this
  }
};

export const fetchUser = async (setUser) => {
  try {
    const res = await axios.get('/api/users/me', {
      headers: {
        'x-auth-token': localStorage.getItem('token')
      }
    });
    setUser(res.data);
  } catch (err) {
    console.error('Fetch user failed:', err);
    throw err;
  }
};
