import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Box,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch('http://localhost:3000/admin/messages');
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error('Failed to fetch messages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/admin/messages/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete message');
      setMessages(messages.filter((msg) => msg._id !== id));
      setSnackbar({ open: true, message: 'Message deleted successfully!', severity: 'success' });
    } catch (error) {
      console.error('Delete error:', error);
      setSnackbar({ open: true, message: 'Error deleting message', severity: 'error' });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: `url('https://images.unsplash.com/photo-1522199755839-a2bacb67c546?auto=format&fit=crop&w=1950&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        py: 4,
      }}
    >
      <Container maxWidth="lg" sx={{ backgroundColor: 'rgba(0,0,0,0.7)', borderRadius: 2, p: 3 }}>
        <Typography variant="h4" color="primary">
          📩 Messages for Admin
        </Typography>

        <Box display="flex" justifyContent="flex-end" mb={2}>
          <Button
            variant="outlined"
            onClick={() => navigate('/admin')}
            startIcon={<ArrowBackIosNewIcon />}
            sx={{
              color: 'white',
              borderColor: 'white',
              '&:hover': {
                backgroundColor: 'white',
                color: 'black',
              },
              textTransform: 'none',
              fontWeight: 'bold',
              borderRadius: 2,
              px: 2,
              py: 1,
            }}
          >
            Back
          </Button>
        </Box>

        {loading ? (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress color="primary" />
          </Box>
        ) : messages.length === 0 ? (
          <Typography color="white">No messages found.</Typography>
        ) : (
          <TableContainer component={Paper} sx={{ backgroundColor: '#1e1e1e' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: '#90caf9' }}>Name</TableCell>
                  <TableCell sx={{ color: '#90caf9' }}>Email</TableCell>
                  <TableCell sx={{ color: '#90caf9' }}>Subject</TableCell>
                  <TableCell sx={{ color: '#90caf9' }}>Message</TableCell>
                  <TableCell sx={{ color: '#90caf9' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {messages.map((msg) => (
                  <TableRow key={msg._id}>
                    <TableCell sx={{ color: 'white' }}>{msg.name}</TableCell>
                    <TableCell sx={{ color: 'white' }}>{msg.email}</TableCell>
                    <TableCell sx={{ color: 'white' }}>{msg.subject}</TableCell>
                    <TableCell sx={{ color: 'white' }}>{msg.message}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDelete(msg._id)}
                        sx={{
                          textTransform: 'none',
                          fontWeight: 'bold',
                          borderRadius: 2,
                        }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

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

export default AdminMessages;
