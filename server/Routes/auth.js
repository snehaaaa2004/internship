const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/Workout'); // This must be your user model
require('dotenv').config();

const router = express.Router();

// ===== SIGNUP =====
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, role, adminSecret } = req.body; // added name here
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).send('User already exists');

    let assignedRole = 'user';
    if (role === 'admin') {
      if (adminSecret !== process.env.ADMIN_SECRET) {
        return res.status(403).send('Invalid admin secret');
      }
      assignedRole = 'admin';
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ 
      name, // include name here
      email, 
      password: hashedPassword, 
      role: assignedRole 
    });
    await newUser.save();
    res.status(201).send('User created');
  } catch (err) {
    res.status(500).send(err.message);
  }
});


// ===== LOGIN =====
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, role: user.role });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// ===== GET ALL USERS =====
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Exclude passwords
    res.json(users);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
// Get single user by ID
router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send('User not found');
    res.json(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// ===== DELETE A USER =====
router.delete('/users/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.send('User deleted');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// ===== UPDATE A USER =====


// Update user by ID
router.put('/users/:id', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if the ID is valid
    if (!req.params.id) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    // Find user by ID
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update fields if provided
    if (name) user.name = name;
    if (email) user.email = email;
    if (role) user.role = role;

    // Only update password if provided
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    // Save the updated user
    await user.save();

    // Return the updated user (except password)
    res.status(200).json({
      message: 'User updated successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;



