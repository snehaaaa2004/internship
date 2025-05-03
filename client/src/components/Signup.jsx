import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Paper,
  Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { keyframes } from '@emotion/react'; 

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [adminSecret, setAdminSecret] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role, adminSecret }),
      });
      const text = await res.text();
      alert(text);
    } catch (err) {
      console.error(err);
      alert('Error signing up');
    }
  };

  return (
    <Box
      sx={{
        backgroundImage: `
          linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)),
          url("https://images.unsplash.com/photo-1554284126-aa88f22d8b74?auto=format&fit=crop&w=1470&q=80")
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={12}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 4,
            color: 'white',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(15px)',
            animation: `${fadeIn} 0.8s ease forwards`,
          }}
        >
          <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
            Create an Account
          </Typography>

          <Box component="form" onSubmit={handleSignup} sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Name"
              type="text"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              InputLabelProps={{ style: { color: '#ccc' } }}
              InputProps={{ style: { color: '#fff', backgroundColor: '#333' } }}
              sx={{
                '& .MuiFilledInput-root:hover': { backgroundColor: '#444' },
              }}
            />
            <TextField
              label="Email"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              InputLabelProps={{ style: { color: '#ccc' } }}
              InputProps={{ style: { color: '#fff', backgroundColor: '#333' } }}
              sx={{
                '& .MuiFilledInput-root:hover': { backgroundColor: '#444' },
              }}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              InputLabelProps={{ style: { color: '#ccc' } }}
              InputProps={{ style: { color: '#fff', backgroundColor: '#333' } }}
              sx={{
                '& .MuiFilledInput-root:hover': { backgroundColor: '#444' },
              }}
            />
            <FormControl fullWidth>
              <InputLabel sx={{ color: '#ccc' }}>Role</InputLabel>
              <Select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                label="Role"
                sx={{
                  color: 'white',
                  backgroundColor: '#333',
                  '.MuiOutlinedInput-notchedOutline': { borderColor: '#555' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#999' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#00bcd4' },
                }}
              >
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Select>
            </FormControl>
            {role === 'admin' && (
              <TextField
                label="Admin Secret"
                type="text"
                fullWidth
                value={adminSecret}
                onChange={(e) => setAdminSecret(e.target.value)}
                required
                InputLabelProps={{ style: { color: '#ccc' } }}
                InputProps={{ style: { color: '#fff', backgroundColor: '#333' } }}
                sx={{
                  '& .MuiFilledInput-root:hover': { backgroundColor: '#444' },
                }}
              />
            )}

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 2,
                py: 1.3,
                fontWeight: 'bold',
                fontSize: '1rem',
                borderRadius: '30px',
                background: 'linear-gradient(135deg, #00bcd4, #2196f3)',
                boxShadow: '0 0 12px #00bcd4',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 0 20px #00bcd4',
                  background: 'linear-gradient(135deg, #00acc1, #1e88e5)',
                },
              }}
            >
              Sign Up
            </Button>
          </Box>

          <Typography align="center" sx={{ mt: 3, color: '#aaa' }}>
            Already have an account?
          </Typography>

          <Button
            type="button"
            variant="outlined"
            fullWidth
            onClick={() => navigate('/login')}
            sx={{
              mt: 1,
              color: '#00bcd4',
              borderColor: '#00bcd4',
              borderRadius: '30px',
              fontWeight: 'bold',
              transition: 'all 0.3s ease',
              '&:hover': {
                background: '#00bcd4',
                color: '#fff',
                transform: 'scale(1.05)',
              },
            }}
          >
            Log In
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default Signup;
