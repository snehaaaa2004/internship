// Contact.jsx
import React, { useState } from 'react';
import {
  Box, Typography, TextField, Button, Paper,
  InputAdornment, FormHelperText, CircularProgress
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import SubjectIcon from '@mui/icons-material/Title';
import MessageIcon from '@mui/icons-material/Message';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateForm = () => {
    if (!form.name || !form.email || !form.subject || !form.message) {
      return 'All fields are required.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      return 'Please enter a valid email address.';
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await axios.post('http://localhost:3000/contact', form);
      setSuccess(true);
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: 'url(https://img.freepik.com/free-photo/3d-gym-equipment_23-2151114152.jpg?ga=GA1.1.978582487.1745483920&semt=ais_hybrid&w=740)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        p: 3,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Paper
        elevation={6}
        sx={{
          maxWidth: 700,
          width: '100%',
          p: 4,
          borderRadius: 4,
          backgroundColor: 'rgba(30, 30, 30, 0.8)',
          color: '#fff',
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="body2" align="center" sx={{ color: '#ccc', mb: 3 }}>
          We'd love to hear from you. Use the form below to reach out.
        </Typography>

        {error && <FormHelperText error>{error}</FormHelperText>}
        {success && (
          <FormHelperText sx={{ color: 'green', mb: 2 }}>
            Message sent successfully!
          </FormHelperText>
        )}

        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              maxWidth: 500,
              mx: 'auto',
            }}
          >
            {/* Input Fields */}
            {[{ label: 'Your Name', name: 'name', icon: <PersonIcon sx={{ color: 'black' }} /> },
              { label: 'Email Address', name: 'email', icon: <EmailIcon sx={{ color: 'black' }} /> },
              { label: 'Subject', name: 'subject', icon: <SubjectIcon sx={{ color: 'black' }} /> }].map(({ label, name, icon }) => (
              <TextField
                key={name}
                fullWidth
                label={label}
                name={name}
                value={form[name]}
                onChange={handleChange}
                variant="filled"
                InputProps={{
                  style: { color: '#fff' },
                  startAdornment: <InputAdornment position="start">{icon}</InputAdornment>,
                }}
                InputLabelProps={{ style: { color: '#aaa' } }}
              />
            ))}

            <TextField
              fullWidth
              multiline
              rows={4}
              label="Your Message"
              name="message"
              value={form.message}
              onChange={handleChange}
              variant="filled"
              InputProps={{
                style: { color: '#fff' },
                startAdornment: (
                  <InputAdornment position="start">
                    <MessageIcon sx={{ color: 'black', alignSelf: 'flex-start', mt: '4px' }} />
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{ style: { color: '#aaa' } }}
            />

            <Button
              variant="contained"
              type="submit"
              fullWidth
              disabled={loading}
              endIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
              sx={{
                backgroundColor: '#ff6b0f',
                '&:hover': { backgroundColor: '#ff8b3d' },
                mt: 1,
              }}
            >
              {loading ? 'Sending...' : 'Send Message'}
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default Contact;