import React from 'react';
import { Box, Typography, Grid, Avatar } from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

const infoCards = [
  {
    icon: <VisibilityIcon fontSize="large" />,
    title: 'Our Vision',
    desc: 'Be the most trusted online fitness platform in India.',
  },
  {
    icon: <FitnessCenterIcon fontSize="large" />,
    title: 'Our Mission',
    desc: 'Make fitness simple and achievable for all.',
  },
  {
    icon: <LocalOfferIcon fontSize="large" />,
    title: 'What We Offer',
    desc: 'Workouts, diet plans & supplement advice tailored to your goals.',
  },
];

const teamMembers = [
  {
    name: 'Aarav Mehta',
    role: 'Certified Trainer',
    img: 'https://images.pexels.com/photos/28455383/pexels-photo-28455383/free-photo-of-muscular-man-posing-confidently-in-gym-setting.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    name: 'Priya Sharma',
    role: 'Nutrition Expert',
    img: 'https://images.pexels.com/photos/8804993/pexels-photo-8804993.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    name: 'Rahul Kapoor',
    role: 'Supplement Advisor',
    img: 'https://images.pexels.com/photos/13013763/pexels-photo-13013763.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

const About = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage:
          'url(https://img.freepik.com/free-photo/3d-gym-equipment_23-2151114152.jpg?ga=GA1.1.978582487.1745483920&semt=ais_hybrid&w=740)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: { xs: 3, md: 6 },
        boxSizing: 'border-box',
        color: '#fff',
      }}
    >
      <Box
        sx={{
          backgroundColor: 'rgba(18, 18, 18, 0.8)',
          p: 4,
          borderRadius: 4,
          width: '100%',
          maxWidth: 1200,
        }}
      >
        <Typography variant="h3" gutterBottom align="center" fontWeight={600}>
          Welcome to <span style={{color:"#00e5ff",fontFamily:"initial"}} >TRANSFORM</span>
        </Typography>

        <Typography
          variant="body1"
          align="center"
          sx={{ maxWidth: 800, mb: 6, mx: 'auto' }}
        >
          We are a team of passionate trainers, nutritionists, and health
          experts helping people transform their lives with personalized fitness
          plans.
        </Typography>

        {/* INFO CARDS IN A SINGLE LINE */}
        <Box
  sx={{
    display: 'grid',
    gridTemplateColumns: {
      xs: '1fr',
      sm: '1fr 1fr',
      md: 'repeat(3, 1fr)',
    },
    gap: 4,
    justifyItems: 'center',
    alignItems: 'stretch',
    mb: 8, // <-- Increased from 6 to 10 for more spacing
    width: '100%',
    maxWidth: '1000px',
    mx: 'auto',
  }}
>
  {infoCards.map((item, idx) => (
    <Box
      key={idx}
      sx={{
        backgroundColor: '#1f1f1f',
        padding: 4,
        borderRadius: 3,
        textAlign: 'center',
        color: '#fff',
        transition: 'transform 0.3s',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: '0 6px 25px rgba(255,255,255,0.1)',
        },
      }}
    >
      <Box sx={{ mb: 3, fontSize: 40 }}>{item.icon}</Box>
      <Typography variant="h6" gutterBottom fontWeight={600}>
        {item.title}
      </Typography>
      <Typography variant="body2" sx={{ opacity: 0.85 }}>
        {item.desc}
      </Typography>
    </Box>
  ))}
</Box>

        <Typography variant="h4" gutterBottom align="center" fontWeight={800}>
          Meet Our Team
        </Typography>
        <Grid container spacing={4} justifyContent="center" sx={{ mt: 4 }}>

          {teamMembers.map((member, index) => (
            <Grid item key={index} xs={12} sm={4} md={3}>
              <Box
                sx={{
                  textAlign: 'center',
                  transition: 'transform 0.3s',
                  '&:hover': { transform: 'scale(1.05)' },
                }}
              >
                <Avatar
                  alt={member.name}
                  src={member.img}
                  sx={{ width: 100, height: 100, margin: 'auto', mb: 2 }}
                />
                <Typography variant="subtitle1" fontWeight={600}>
                  {member.name}
                </Typography>
                <Typography variant="body2" color="gray">
                  {member.role}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default About;
