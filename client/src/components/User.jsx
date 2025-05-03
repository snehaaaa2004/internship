import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPlans } from '../api';
import {
  Box, Typography, Select, MenuItem, FormControl,
  Card, CardContent, Button, CircularProgress,
  Chip, CardMedia, Paper, Modal, IconButton
} from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import { hover, motion } from 'framer-motion';

const typeFilters = ['Workout', 'Diet', 'Supplement'];
const categoryTabs = ['Muscle Gain', 'Weight Loss', 'General Fitness','Weight Gain'];
const ITEMS_PER_PAGE = 6;

const User = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleSearch = async () => {
    if (!selectedCategory || !selectedType) return;
    setLoading(true);
    try {
      const data = await getPlans(selectedCategory, selectedType);
      setPlans(data);
      setVisibleCount(ITEMS_PER_PAGE);
    } catch (error) {
      console.error('Error fetching plans:', error);
    }
    setLoading(false);
  };

  const handleShowMore = () => setVisibleCount(prev => prev + ITEMS_PER_PAGE);
  const handleOpenModal = (plan) => { setSelectedPlan(plan); setModalOpen(true); };
  const handleCloseModal = () => { setSelectedPlan(null); setModalOpen(false); };
  const getIconForType = (type) => type === 'Workout' ? <FitnessCenterIcon /> :
                                   type === 'Diet' ? <RestaurantIcon /> :
                                   type === 'Supplement' ? <LocalPharmacyIcon /> : null;

  useEffect(() => {
    if (selectedCategory && selectedType) handleSearch();
  }, [selectedCategory, selectedType]);

  return (
    <Box sx={{
      minHeight: '100vh',
      backgroundImage: `url('https://images.pexels.com/photos/17092544/pexels-photo-17092544/free-photo-of-loadable-dumbbell-on-the-floor-at-the-gym-top-down-view-flat-lay-with-bodybuilding-equipment-on-a-black-background-and-empty-space-for-text-fitness-weight-training-or-healthy-lifestyle.jpeg?auto=compress&cs=tinysrgb&w=600')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      p: 2
    }}>
      <Box sx={{
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(0,0,0,0.6)',
        borderRadius: 4,
        p: 4,
        maxWidth: '1200px',
        mx: 'auto',
      }}>
        <Typography
  variant="h3"
  align="center"
  sx={{
    fontFamily: 'monospace',
    color: 'white',
    letterSpacing: 2,
    mb: 3,
    textShadow: '2px 2px 5px rgba(214, 205, 205, 0.7), -2px -2px 5px rgba(194, 183, 183, 0.7)',
    transform: 'translateZ(0)',
    transition: 'all 0.3s ease',
    
  }}
>
  Welcome to Your Fitness Dashboard
</Typography>
<Typography
  variant="h5"
  align="center"
  sx={{
    fontFamily: 'monospace',
    color: 'white',
    letterSpacing: 2,
    mb: 3,
    textShadow: '2px 2px 5px rgba(214, 205, 205, 0.7), -2px -2px 5px rgba(154, 125, 125, 0.7)',
    transform: 'translateZ(0)',
    transition: 'all 0.3s ease',
    
  }}>Keep track of your progress</Typography>

<Box sx={{ textAlign: 'center', mb: 3 }}>
  <Button
    variant="contained"
    onClick={() => navigate('/progress-form')}
    sx={{
      mx: 1,
      backgroundColor: '#6c757d', // Bootstrap gray-ish
      '&:hover': {
        backgroundColor: 'black',
      },
    }}
  >
    Progress Form
  </Button>
  <Button
    variant="contained"
    onClick={() => navigate('/progress-list')}
    sx={{
      mx: 1,
      backgroundColor: '#6c757d',
      '&:hover': {
        backgroundColor: 'black',
      },
    }}
  >
    Progress History
  </Button>
</Box>


        <Typography
  variant="h4"
  align="center"
  sx={{
    fontFamily: 'monospace',
    color: 'white',
    letterSpacing: 2,
    mb: 3,
    textShadow: '2px 2px 5px rgba(214, 205, 205, 0.7), -2px -2px 5px rgba(194, 183, 183, 0.7)',
    transform: 'translateZ(0)',
    transition: 'all 0.3s ease',
    
  }}>Explore Plans</Typography>

        <Box sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'center',
          gap: 2,
          alignItems: 'center',
          mb: 4
        }}>
          <FormControl sx={{ minWidth: 300 }}>
            <Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              displayEmpty
              sx={{
                color: 'white',
                borderColor: 'white',
                '.MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
                '& .MuiSelect-icon': { color: 'white' },
                bgcolor: 'rgba(11, 7, 7, 0.05)',
              }}
            >
              <MenuItem value="" disabled>Choose Category</MenuItem>
              {categoryTabs.map(cat => <MenuItem key={cat} value={cat}>{cat}</MenuItem>)}
            </Select>
          </FormControl>

          <Box sx={{
            display: 'flex',
            gap: 1,
            border: '2px solid white',
            borderRadius: '10px',
            padding: '10px',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            {typeFilters.map((type) => (
              <Chip
                key={type}
                label={type}
                icon={getIconForType(type)}
                onClick={() => setSelectedType(type)}
                clickable
                variant={selectedType === type ? 'filled' : 'outlined'}
                sx={{
                  color: 'white',
                  borderColor: 'white',
                  backgroundColor: selectedType === type ? '#1e88e5' : 'transparent',
                  '&:hover': {
                    backgroundColor: selectedType === type ? '#1565c0' : 'rgba(3, 0, 0, 0.1)',
                  }
                }}
              />
            ))}
          </Box>
        </Box>

        <Box>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}><CircularProgress /></Box>
          ) : plans.length === 0 ? (
            <Typography align="center" sx={{ color: 'white', fontStyle: 'italic' }}>No plans available.</Typography>
          ) : (
            <>
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 3 }}>
                {plans.slice(0, visibleCount).map(plan => (
                  <motion.div key={plan._id} whileHover={{ scale: 1.05 }}>
                    <Card onClick={() => handleOpenModal(plan)} sx={{
                      bgcolor: 'rgba(5, 3, 3, 0.05)',
                      borderRadius: 2,
                      color: 'white',
                      backdropFilter: 'blur(8px)',
                      cursor: 'pointer'
                    }}>
                      {plan.image && <CardMedia component="img" height="180" image={plan.image} alt={plan.name} />}
                      <CardContent>
                        <Chip label={plan.type} icon={getIconForType(plan.type)} sx={{ mb: 1 }} />
                        <Typography variant="h6" align="center">{plan.name}</Typography>
                        <Typography variant="body2" align="center">{plan.description}</Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </Box>
              {visibleCount < plans.length && (
                <Box sx={{ textAlign: 'center', mt: 3 }}>
                  <Button onClick={handleShowMore} sx={{ borderColor: 'white', color: 'white' }} variant="outlined">Show More</Button>
                </Box>
              )}
            </>
          )}
        </Box>
      </Box>

      {/* Modal */}
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: '#111',
          p: 4,
          borderRadius: 3,
          maxWidth: 500,
          width: '90%',
          color: 'white'
        }}>
          <IconButton onClick={handleCloseModal} sx={{ position: 'absolute', right: 8, top: 8, color: 'white' }}>
            <CloseIcon />
          </IconButton>
          {selectedPlan && (
            <>
              {selectedPlan.image && <CardMedia component="img" height="200" image={selectedPlan.image} sx={{ mb: 2 }} />}
              <Typography variant="h5">{selectedPlan.name}</Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>{selectedPlan.description}</Typography>
              <Box component="ul" sx={{ pl: 2, mt: 2 }}>
                {selectedPlan.features?.map((feat, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'center' }}>
                    <CheckCircleIcon sx={{ fontSize: 20, color: '#1e88e5', mr: 1 }} />
                    <Typography variant="body2">{feat}</Typography>
                  </li>
                ))}
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default User;
