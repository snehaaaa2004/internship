import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
  Container,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
} from "@mui/material";

const EditUsers = () => {
  const [users, setUsers] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3000/User")
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleDeleteClick = (id) => {
    setSelectedUserId(id);
    setOpenDialog(true);
  };

  const confirmDelete = async () => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:3000/api/users/${selectedUserId}`);
      setUsers(users.filter(user => user._id !== selectedUserId));
      setSnackbar({ open: true, message: 'User deleted successfully!', severity: 'success' });
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: 'Failed to delete user', severity: 'error' });
    }
    setLoading(false);
    setOpenDialog(false);
  };

  const handleEdit = (id) => {
    navigate(`/screen/${id}`);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: 'url("https://st.depositphotos.com/1000350/2282/i/450/depositphotos_22823894-stock-photo-dark-concrete-texture.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 3,
      }}
    >
      <Container maxWidth="lg">
        <Paper
          elevation={10}
          sx={{
            p: 4,
            backgroundColor: 'rgba(25, 25, 25, 0.95)', 
            borderRadius: 3,
            color: 'white',
            backdropFilter: 'blur(5px)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
          }}
        >
          <Typography variant="h4" align="center" gutterBottom sx={{ 
            color: '#ffffff',
            fontFamily: 'initial',
            fontWeight: 'bold',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            mb: 3,
            textShadow: '2px 2px 8px rgba(255,255,255,0.2)',
          }}>
            User Management
          </Typography>

          <TableContainer component={Paper} sx={{ 
            backgroundColor: 'transparent', 
            mt: 3,
            borderRadius: 2,
            boxShadow: 'none',
          }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#222' }}>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: '1.1rem' }}>Name</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: '1.1rem' }}>Email</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: '1.1rem' }}>Role</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: '1.1rem' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow 
                    key={user._id} 
                    sx={{ 
                      '&:hover': { backgroundColor: '#333' }, 
                      transition: 'background-color 0.3s ease',
                    }}
                  >
                    <TableCell sx={{ color: '#eee' }}>{user.name}</TableCell>
                    <TableCell sx={{ color: '#ccc' }}>{user.email}</TableCell>
                    <TableCell sx={{ color: '#ccc' }}>{user.role}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        sx={{
                          mr: 1,
                          bgcolor: 'black',
                          color: 'white',
                          '&:hover': { bgcolor: 'white', color: 'black' },
                          textTransform: 'none',
                          fontWeight: 'bold',
                          borderRadius: 2,
                          px: 2,
                          py: 1,
                        }}
                        onClick={() => handleEdit(user._id)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        sx={{
                          bgcolor: 'white',
                          color: 'black',
                          '&:hover': {
                            bgcolor: 'black',
                            color: 'white'
                          },
                          textTransform: 'none',
                          fontWeight: 'bold',
                          borderRadius: 2,
                          px: 2,
                          py: 1,
                        }}
                        onClick={() => handleDeleteClick(user._id)}
                      >
                        {loading && selectedUserId === user._id ? (
                          <CircularProgress size={24} color="inherit" />
                        ) : (
                          'Delete'
                        )}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {users.length === 0 && (
            <Typography align="center" sx={{ 
              mt: 2, 
              color: '#bbb',
              fontSize: '1.1rem',
              fontStyle: 'italic',
              textTransform: 'uppercase',
            }}>
              No users found.
            </Typography>
          )}
        </Paper>

        {/* Confirm Delete Dialog */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle sx={{ fontWeight: 'bold', color: '#333' }}>Confirm Delete</DialogTitle>
          <DialogContent sx={{ backgroundColor: '#f5f5f5', color: '#333' }}>
            Are you sure you want to delete this user? This action cannot be undone.
          </DialogContent>
          <DialogActions sx={{ backgroundColor: '#f5f5f5' }}>
            <Button onClick={() => setOpenDialog(false)} variant="outlined">
              Cancel
            </Button>
            <Button onClick={confirmDelete} variant="contained" color="error">
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default EditUsers;
