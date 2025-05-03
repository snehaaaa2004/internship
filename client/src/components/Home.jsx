import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Container, Paper } from '@mui/material';
import { keyframes } from '@emotion/react';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

function Home() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/log');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: `
          linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)),
          url('https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=600')
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
        py: { xs: 6, sm: 8, md: 10 },
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={10}
          sx={{
            p: { xs: 3, sm: 4, md: 6 },
            borderRadius: 4,
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(15px)',
            textAlign: 'center',
            animation: `${fadeIn} 1s ease forwards`,
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: '900',
              mb: 2,
              color: '#00e5ff',
              letterSpacing: '2px',
              fontFamily: 'monospace',
              fontSize: { xs: '2rem', sm: '2.8rem', md: '3.5rem' },
              lineHeight: 1.2,
            }}
          >
            UNLEASH YOUR POWER
          </Typography>

          <Typography
            variant="h6"
            sx={{
              mb: 2,
              color: '#ccc',
              letterSpacing: '0.5px',
              fontSize: { xs: '0.95rem', sm: '1.1rem', md: '1.25rem' },
            }}
          >
            Redefine your limits and live your best life.
          </Typography>

          <Typography
            variant="h4"
            sx={{
              fontWeight: 'bold',
              color: '#00bcd4',
              mb: 2,
              fontFamily: 'sans-serif',
              fontSize: { xs: '1.3rem', sm: '1.6rem', md: '2rem' },
            }}
          >
            DISCIPLINE. CONSISTENCY. GROWTH.
          </Typography>

          <Typography
            variant="h5"
            sx={{
              fontStyle: 'italic',
              mb: 4,
              color: '#aaa',
              fontFamily: 'cursive',
              fontSize: { xs: '1rem', sm: '1.3rem', md: '1.5rem' },
            }}
          >
            "Train Smart. Eat Clean. Conquer Every Day."
          </Typography>

          <Button
            variant="contained"
            size="large"
            onClick={handleClick}
            sx={{
              borderRadius: '50px',
              fontWeight: 'bold',
              px: 4,
              py: 1.3,
              fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
              backgroundColor: '#ff4081',
              color: '#fff',
              boxShadow: '0 0 20px rgba(255, 64, 129, 0.5)',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: '#f50057',
                transform: 'scale(1.08)',
                boxShadow: '0 0 30px rgba(255, 64, 129, 0.7)',
              },
            }}
          >
            ⚡ LET'S GET STRONGER!
          </Button>
        </Paper>
      </Container>
    </Box>
  );
}

export default Home;
