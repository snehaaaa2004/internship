import React, { useState, useEffect } from 'react';
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
  Snackbar,
  Alert,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

const EditScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/users/${id}`);
        const data = await res.json();
        setName(data.name);
        setEmail(data.email);
        setRole(data.role);
      } catch (err) {
        console.error(err);
        setSnackbar({ open: true, message: 'Failed to fetch user details', severity: 'error' });
      }
    };

    fetchUser();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedUser = { name, email, role };
    if (password) {
      updatedUser.password = password;
    }

    try {
      const res = await fetch(`http://localhost:3000/api/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUser),
      });

      if (res.ok) {
        setSnackbar({ open: true, message: 'User updated successfully!', severity: 'success' });
        setTimeout(() => {
          navigate('/edit-user');
        }, 1500);
      } else {
        throw new Error('Update failed');
      }
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: 'Failed to update user', severity: 'error' });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: 'url("https://st2.depositphotos.com/1172243/5471/i/450/depositphotos_54716043-stock-photo-black-brick-wall-for-background.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        p:3,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={6}
          sx={{
            p: 4,
            borderRadius: 3,
            backgroundColor: '#1e1e1e', // slightly lighter than black
            color: '#ffffff',
          }}
        >
          <Typography variant="h4" align="center" gutterBottom sx={{ color: '#ffffff',fontFamily:'initial' ,fontWeight: 'bold',                 // <-- Bold text
    letterSpacing: '1px',               // <-- A bit wider letters
    textTransform: 'uppercase',}}>
            Edit User
          </Typography>

          <Box component="form" onSubmit={handleUpdate}>
            <TextField
              label="Name"
              fullWidth
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              InputLabelProps={{ style: { color: '#bbb' } }}
              InputProps={{
                style: { color: '#fff', backgroundColor: '#2c2c2c' },
              }}
            />
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              InputLabelProps={{ style: { color: '#bbb' } }}
              InputProps={{
                style: { color: '#fff', backgroundColor: '#2c2c2c' },
              }}
            />
            <TextField
              label="Password (leave blank to keep current)"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputLabelProps={{ style: { color: '#bbb' } }}
              InputProps={{
                style: { color: '#fff', backgroundColor: '#2c2c2c' },
              }}
            />

            <FormControl fullWidth margin="normal">
              <InputLabel sx={{ color: '#bbb' }}>Role</InputLabel>
              <Select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                label="Role"
                sx={{
                  color: '#fff',
                  backgroundColor: '#2c2c2c',
                  '.MuiOutlinedInput-notchedOutline': {
                    borderColor: '#555',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#888',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#00bcd4',
                  },
                }}
              >
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Select>
            </FormControl>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 2,
                bgcolor: 'white',
                color: 'black',
                fontWeight: 'bold',
                '&:hover': {
                  bgcolor: 'black',
                  color: 'white'
                },
              }}
            >
              Update User
            </Button>
          </Box>
        </Paper>
      </Container>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EditScreen;
