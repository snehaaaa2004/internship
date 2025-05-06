import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, TextField, Typography, CircularProgress } from '@mui/material';

const ProgressDashboard = ({ userId, onAdd = () => {} }) => {
  const [weight, setWeight] = useState('');
  const [date, setDate] = useState('');
  const [progressList, setProgressList] = useState([]);
  const [editableEntry, setEditableEntry] = useState(null);
  const [updateWeight, setUpdateWeight] = useState('');
  const [showForm, setShowForm] = useState(true);
  const [showHistory, setShowHistory] = useState(false);
  const [showProgressButton, setShowProgressButton] = useState(false);
  const [loading, setLoading] = useState(false); // State to manage loading spinner
  const [error, setError] = useState(''); // State to manage error messages

  const navigate = useNavigate();

  // Fetch progress data
  useEffect(() => {
    const fetchProgress = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await axios.get('http://localhost:3000/progress');
        setProgressList(res.data);
      } catch (err) {
        setError('Error fetching progress list.');
        console.error('Error fetching progress list:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, []);

  // Handle progress submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!weight || !date) {
      alert('Please fill in both weight and date!');
      return;
    }

    setLoading(true);
    setError('');
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
      setError('Error submitting progress.');
      console.error('Error submitting progress:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle delete all progress
  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete all progress?')) return;
    setLoading(true);
    setError('');
    try {
      await axios.delete('http://localhost:3000/progress');
      onAdd();
    } catch (err) {
      setError('Error deleting progress.');
      console.error('Error deleting progress:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle saving updated progress directly in the table
  const handleSaveUpdate = async (entryId) => {
    if (!updateWeight) {
      alert('Weight cannot be empty!');
      return;
    }

    setLoading(true);
    setError('');
    try {
      await axios.patch(`http://localhost:3000/progress/${entryId}`, {
        weight: updateWeight,
      });
      setEditableEntry(null);
      setUpdateWeight('');
      onAdd();
    } catch (err) {
      setError('Error updating progress.');
      console.error('Error updating progress:', err);
    } finally {
      setLoading(false);
    }
  };

  // Filter progress by date
  const [searchDate, setSearchDate] = useState('');
  const filteredWeight = progressList.filter((entry) =>
    new Date(entry.date).toLocaleDateString().includes(searchDate)
  );

  return (
    <Box
  sx={{
    backgroundImage: 'url(https://st.depositphotos.com/1053932/4428/i/450/depositphotos_44285333-stock-photo-kettlebells-weights-in-a-workout.jpg)',
    backgroundSize: 'cover', // Ensures a single full-screen image
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    p: 2,
  }}
>
      {/* Form Section */}
      {showForm && (
        <Box
          sx={{
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            padding: 4,
            borderRadius: 3,
            color: 'white',
            boxShadow: 6,
            width: '100%',
            maxWidth: 600,
            mb: 4,
          }}
        >
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
            <Button variant="contained" color="primary" type="submit" fullWidth disabled={loading}>
              {loading ? <CircularProgress size={24} color="secondary" /> : 'Add'}
            </Button>
          </Box>

          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setShowHistory(true);
              setShowForm(false);
              setShowProgressButton(true);
            }}
            fullWidth
          >
            Progress History
          </Button>
        </Box>
      )}

      {/* Error message */}
      {error && (
        <Typography variant="body2" color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      {/* Progress History Table */}
      {showHistory && (
        <Box
          sx={{
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            padding: 4,
            borderRadius: 3,
            color: 'white',
            boxShadow: 6,
            width: '100%',
            maxWidth: 800,
          }}
        >
          {showProgressButton && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setShowForm(true);
                setShowHistory(false);
                setShowProgressButton(false);
              }}
              fullWidth
            >
              Your Progress
            </Button>
          )}

          <TextField
            type="date"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            InputProps={{ sx: { color: 'white' } }}
            sx={{
              '& label': { color: '#90caf9' },
              '& .MuiFilledInput-root': {
                backgroundColor: '#2c2c2c',
                borderRadius: 1,
              },
              width: '100%',
              mt: 4,
              mb: 0,
            }}
            variant="filled"
          />

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#1e1e1e', color: 'white' }}>
              <thead>
                <tr>
                  <th style={{ padding: '12px', textAlign: 'left', backgroundColor: '#007acc' }}>Date</th>
                  <th style={{ padding: '12px', textAlign: 'left', backgroundColor: '#007acc' }}>Weight (kg)</th>
                  <th style={{ padding: '12px', textAlign: 'center', backgroundColor: '#007acc' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredWeight.length > 0 ? (
                  filteredWeight.map((entry) => (
                    <tr key={entry._id}>
                      <td style={{ padding: '10px', borderBottom: '1px solid #444' }}>
                        {new Date(entry.date).toLocaleDateString('en-GB')}
                      </td>
                      <td style={{ padding: '10px', borderBottom: '1px solid #444' }}>
                        {editableEntry === entry._id ? (
                          <TextField
                            value={updateWeight}
                            onChange={(e) => setUpdateWeight(e.target.value)}
                            variant="filled"
                            type="number"
                            InputProps={{ sx: { color: 'white' } }}
                            fullWidth
                          />
                        ) : (
                          entry.weight
                        )}
                      </td>
                      <td style={{ padding: '10px', borderBottom: '1px solid #444', textAlign: 'center' }}>
                        {editableEntry === entry._id ? (
                          <Button
                            variant="contained"
                            color="success"
                            onClick={() => handleSaveUpdate(entry._id)}
                          >
                            Save
                          </Button>
                        ) : (
                          <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => {
                              setEditableEntry(entry._id);
                              setUpdateWeight(entry.weight);
                            }}
                          >
                            Edit
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" style={{ padding: '10px', textAlign: 'center', color: '#bbb' }}>
                      No entries found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
            sx={{ mt: 2, width: '100%' }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="secondary" /> : 'Delete All Progress'}
          </Button>
        </Box>
      )}
      <Button
    variant="contained" // Changed from 'outlined' to 'contained'
    color="primary"     // Changed from 'secondary' to 'primary'
    onClick={() => navigate(-1)}
    sx={{ mt: 4 }}
  >
    Go Back
  </Button>
    </Box>
  );
};

export default ProgressDashboard;