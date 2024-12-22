import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_AUTH_URL || 'http://localhost:5000/api/auth';
console.log(`Auth API URL: ${API_URL}`);

// Login function
export const login = async (email, password) => {
  try {
    const res = await axios.post(`${API_URL}/login`, { email, password });
    console.log("USer", res);
    // Store token in local storage
    localStorage.setItem('token', res.data.token);
    // Update user context
    localStorage.setItem('user', JSON.stringify(res.data.user));
  } catch (err) {
    console.error('Login failed:', err);
    throw err; 
  }
};

// Register function
export const register = async (email, password) => {
  try {
    const res = await axios.post(`${API_URL}/register`, { email, password });
    console.log('Registration successful:', res.data.message);
    return res.data; // Return the response data to the calling component
  } catch (err) {
    console.error('Registration failed:', err);
    throw err; // Pass the error to be handled in the calling component
  }
};

// Logout function (Optional: Clears the token and resets user data)
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  console.log('User logged out successfully.');
};
