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
} from '@mui/material';

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

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
        <Typography variant="h4" gutterBottom color="primary">
          📩 Messages for Admin
        </Typography>

        {loading ? (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress color="primary" />
          </Box>
        ) : messages.length === 0 ? (
          <Typography>No messages found.</Typography>
        ) : (
          <TableContainer component={Paper} sx={{ backgroundColor: '#1e1e1e' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: '#90caf9' }}>Name</TableCell>
                  <TableCell sx={{ color: '#90caf9' }}>Email</TableCell>
                  <TableCell sx={{ color: '#90caf9' }}>Subject</TableCell>
                  <TableCell sx={{ color: '#90caf9' }}>Message</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {messages.map((msg) => (
                  <TableRow key={msg._id}>
                    <TableCell sx={{ color: 'white' }}>{msg.name}</TableCell>
                    <TableCell sx={{ color: 'white' }}>{msg.email}</TableCell>
                    <TableCell sx={{ color: 'white' }}>{msg.subject}</TableCell>
                    <TableCell sx={{ color: 'white' }}>{msg.message}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>
    </Box>
  );
};

export default AdminMessages;
