import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/AuthService';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (email && password) {
      try {
        await register(email, password, () => {}); // Call register service
        setSuccess('Registration successful. Redirecting to login...');
        setTimeout(() => navigate('/login'), 2000);
      } catch (err) {
        setError('Registration failed. Please try again.');
      }
    } else {
      setError('Please enter email and password');
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Register</Typography>
      {error && <Typography color="error">{error}</Typography>}
      {success && <Typography color="success.main">{success}</Typography>}
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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
      <Button variant="contained" onClick={handleRegister} fullWidth>
        Register
      </Button>
    </Container>
  );
};

export default RegisterPage;
