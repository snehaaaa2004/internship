import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper
} from '@mui/material';

const ProgressForm = ({ userId, onAdd }) => {
  const [weight, setWeight] = useState('');
  const [date, setDate] = useState('');
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [updateDate, setUpdateDate] = useState('');
  const [updateWeight, setUpdateWeight] = useState('');
  const [progressList, setProgressList] = useState([]);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await axios.get('http://localhost:3000/progress');
        setProgressList(res.data);
      } catch (err) {
        console.error('Error fetching progress list:', err);
      }
    };

    fetchProgress();
  }, [onAdd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/progress', {
        userId,
        weight,
        date: date || new Date().toISOString(),
      });
      setWeight('');
      setDate('');
      onAdd();
    } catch (err) {
      console.error('Error submitting progress:', err);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete all progress?')) return;
    try {
      await axios.delete('http://localhost:3000/progress');
      onAdd();
    } catch (err) {
      console.error('Error deleting progress:', err);
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (!updateWeight || !updateDate) {
      alert('Both weight and date are required for updating.');
      return;
    }

    try {
      const progressToUpdate = progressList.find(p => p.date.startsWith(updateDate));
      if (!progressToUpdate) {
        alert('No progress entry found for that date.');
        return;
      }

      await axios.patch(`http://localhost:3000/progress/${progressToUpdate._id}`, {
        weight: updateWeight,
      });

      setShowUpdateForm(false);
      setUpdateDate('');
      setUpdateWeight('');
      onAdd();
    } catch (err) {
      console.error('Error updating progress:', err);
    }
  };

  return (
    <Box
      sx={{
        backgroundImage:'url(https://st.depositphotos.com/1053932/4428/i/450/depositphotos_44285333-stock-photo-kettlebells-weights-in-a-workout.jpg)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Box
        sx={{
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          padding: 4,
          borderRadius: 3,
          color: 'white',
          boxShadow: 6,
          width: '100%',
          maxWidth: 600,
        }}
      >
        <Typography variant="h5" gutterBottom>📈 Track Your Progress</Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
          <TextField
            label="Weight (kg)"
            variant="filled"
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            InputProps={{ sx: { color: 'white' } }}
            InputLabelProps={{ sx: { color: '#90caf9' } }}
            fullWidth
          />
          <TextField
            label="Date"
            variant="filled"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            InputLabelProps={{ shrink: true, sx: { color: '#90caf9' } }}
            InputProps={{ sx: { color: 'white' } }}
            fullWidth
          />
          <Button variant="contained" color="primary" type="submit" fullWidth>Add</Button>
          <Button variant="outlined" color="warning" onClick={() => setShowUpdateForm(prev => !prev)} fullWidth>
            {showUpdateForm ? 'Cancel' : 'Update'}
          </Button>
          <Button variant="contained" color="error" onClick={handleDelete} fullWidth>Delete All</Button>
        </Box>

        {showUpdateForm && (
          <Paper sx={{ p: 3, mt: 2, backgroundColor: '#1e1e1e' }}>
            <Typography variant="subtitle1" gutterBottom>🔁 Update Progress Entry</Typography>
            <Box component="form" onSubmit={handleUpdateSubmit} sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              <TextField
                label="Date to Update"
                type="date"
                value={updateDate}
                onChange={(e) => setUpdateDate(e.target.value)}
                required
                InputLabelProps={{ shrink: true, sx: { color: '#90caf9' } }}
                InputProps={{ sx: { color: 'white' } }}
                variant="filled"
                fullWidth
              />
              <TextField
                label="New Weight"
                type="number"
                value={updateWeight}
                onChange={(e) => setUpdateWeight(e.target.value)}
                required
                InputProps={{ sx: { color: 'white' } }}
                InputLabelProps={{ sx: { color: '#90caf9' } }}
                variant="filled"
                fullWidth
              />
              <Button variant="contained" color="success" type="submit" fullWidth>Submit Update</Button>
            </Box>
          </Paper>
        )}
      </Box>
    </Box>
  );
};

export default ProgressForm;
