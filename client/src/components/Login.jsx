import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
} from '@mui/material';
import { keyframes } from '@emotion/react'; // for animations

const backgroundImage = 'https://images.pexels.com/photos/3112004/pexels-photo-3112004.jpeg?auto=compress&cs=tinysrgb&w=600';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        alert(errorData.error || 'Login failed');
        return;
      }

      const data = await res.json();
      localStorage.setItem('token', data.token);

      if (data.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/user');
      }
    } catch (error) {
      alert('Could not connect to server');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: `
          linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)),
          url(${backgroundImage})
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Paper
        elevation={12}
        sx={{
          p: { xs: 3, md: 5 },
          borderRadius: 4,
          maxWidth: 400,
          width: '100%',
          backgroundColor: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(15px)',
          color: '#fff',
          animation: `${fadeIn} 0.8s ease forwards`,
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            letterSpacing: 1,
            mb: 3,
          }}
        >
          Welcome Back
        </Typography>

        <Box
          component="form"
          onSubmit={handleLogin}
          sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <TextField
            label="Email"
            type="email"
            fullWidth
            variant="filled"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              style: {
                backgroundColor: '#333',
                color: '#fff',
              },
            }}
            InputLabelProps={{ style: { color: '#bbb' } }}
            sx={{
              '& .MuiFilledInput-root:hover': {
                backgroundColor: '#444',
              },
            }}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            variant="filled"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              style: {
                backgroundColor: '#333',
                color: '#fff',
              },
            }}
            InputLabelProps={{ style: { color: '#bbb' } }}
            sx={{
              '& .MuiFilledInput-root:hover': {
                backgroundColor: '#444',
              },
            }}
          />
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
              color: '#fff',
              boxShadow: '0 0 12px #00bcd4',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0 0 20px #00bcd4',
                background: 'linear-gradient(135deg, #00acc1, #1e88e5)',
              },
            }}
          >
            Login
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
