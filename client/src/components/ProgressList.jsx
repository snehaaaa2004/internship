import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TextField, Typography, Paper } from '@mui/material';

const ProgressList = ({ userId, refresh }) => {
  const [entries, setEntries] = useState([]);
  const [searchDate, setSearchDate] = useState('');

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const res = await axios.get('http://localhost:3000/progress');
        const sorted = res.data.sort((a, b) => new Date(a.date) - new Date(b.date));
        setEntries(sorted);
      } catch (err) {
        console.error(err);
      }
    };

    fetchEntries();
  }, [userId, refresh]);

  const filteredWeight = entries.filter((entry) =>
    entry.date.toLowerCase().includes(searchDate.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <Paper elevation={4} sx={styles.paper}>
        <Typography variant="h6" gutterBottom style={{ color: '#fff' }}>
          📋 Progress History
        </Typography>

        <div style={styles.searchSection}>
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
            }}
            variant="filled"
          />
        </div>

        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.header}>Date</th>
                <th style={styles.header}>Weight (kg)</th>
              </tr>
            </thead>
            <tbody>
              {filteredWeight.length > 0 ? (
                filteredWeight.map((entry) => (
                  <tr key={entry._id}>
                    <td style={styles.cell}>
                      {new Date(entry.date).toLocaleDateString('en-GB')}
                    </td>
                    <td style={styles.cell}>{entry.weight}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" style={{ ...styles.cell, color: '#bbb', textAlign: 'center' }}>
                    No entries found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Paper>
    </div>
  );
};

const styles = {
  container: {
    backgroundImage:'url(https://st.depositphotos.com/1053932/4428/i/450/depositphotos_44285333-stock-photo-kettlebells-weights-in-a-workout.jpg)',
    display: 'flex',
    justifyContent: 'center',
    padding: '2rem',
    minHeight: '100vh',
  },
  paper: {
    padding: '2rem',
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderRadius: '12px',
    width: '100%',
    maxWidth: '700px',
  },
  searchSection: {
    marginBottom: '1rem',
  },
  tableContainer: {
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#1e1e1e',
    color: 'white',
  },
  header: {
    backgroundColor: '#007acc',
    color: 'white',
    padding: '12px',
    textAlign: 'left',
    fontSize: '1rem',
  },
  cell: {
    padding: '10px',
    borderBottom: '1px solid #444',
    fontSize: '0.95rem',
  },
};

export default ProgressList;
