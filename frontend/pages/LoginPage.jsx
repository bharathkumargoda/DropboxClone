import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (username && password) {
      try {
        // Call the backend login API
        const response = await axios.post('http://localhost:5000/api/auth/login', { email : username, password : password });

        if (response.status == 200) {
          // Store user info in local storage (for demo purpose)
          const { token } = response.data;
          localStorage.setItem('jwtToken', token);
          navigate('/dashboard');
        } else {
          setError('Invalid credentials');
        }
      } catch (err) {
        console.log("err", err.message);
        setError('An error occurred during login');
      }
    } else {
      setError('Please enter username and password');
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Login</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" onClick={handleLogin} fullWidth>
        Login
      </Button>
    </Container>
  );
};

export default LoginPage;
