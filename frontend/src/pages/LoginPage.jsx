import React, { useState, useContext } from 'react';
import { TextField, Button, Container, Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/AuthService';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (username && password) {
      try {
        await login(username, password); // Call login service and set user data
        navigate('/dashboard');
      } catch (err) {
        setError('Invalid credentials or login failed. Please try again.');
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
      <Grid container spacing={2} marginTop={2}>
        <Grid item xs={12}>
          <Button variant="contained" onClick={handleLogin} fullWidth>
            Login
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button variant="outlined" onClick={() => navigate('/register')} fullWidth>
            Register
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoginPage;
