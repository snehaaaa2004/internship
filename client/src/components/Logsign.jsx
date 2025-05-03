import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Container, Paper } from '@mui/material';
import { keyframes } from '@emotion/react'; // for animations

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

function Logsign() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        backgroundImage: `
          linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)),
          url('https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=1950&q=80')
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={10}
          sx={{
            p: { xs: 4, md: 6 },
            borderRadius: 4,
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(12px)',
            textAlign: 'center',
            color: '#fff',
            animation: `${fadeIn} 1s ease forwards`,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 'bold',
              mb: 2,
              fontSize: { xs: '1.8rem', md: '2.5rem' },
              letterSpacing: 1,
            }}
          >
            Welcome to TRANSFORM
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: '#ccc',
              mb: 1,
              fontSize: { xs: '0.9rem', md: '1rem' },
            }}
          >
            Ready to begin your fitness journey? Log in or sign up now!
          </Typography>

          <Typography
            variant="body1"
            sx={{
              mb: 4,
              color: '#aaa',
              fontSize: { xs: '0.8rem', md: '0.95rem' },
            }}
          >
            Choose an option below:
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button
              variant="contained"
              onClick={() => navigate('/login')}
              sx={{
                px: 5,
                py: 1.5,
                fontWeight: 'bold',
                borderRadius: '30px',
                backgroundColor: '#00bcd4',
                fontSize: '1rem',
                color: '#000',
                boxShadow: '0 0 12px #00bcd4',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: '#00acc1',
                  transform: 'scale(1.08)',
                  boxShadow: '0 0 20px #00bcd4',
                },
              }}
            >
              Log In
            </Button>
            <Button
              variant="contained"
              onClick={() => navigate('/register')}
              sx={{
                px: 5,
                py: 1.5,
                fontWeight: 'bold',
                borderRadius: '30px',
                backgroundColor: '#ff4081',
                fontSize: '1rem',
                color: '#fff',
                boxShadow: '0 0 12px #ff4081',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: '#f50057',
                  transform: 'scale(1.08)',
                  boxShadow: '0 0 20px #ff4081',
                },
              }}
            >
              Sign Up
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default Logsign;
