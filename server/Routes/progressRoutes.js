const express = require('express');
const router = express.Router();
const Progress = require('../models/progress');

// POST - Add new entry
router.post('/', async (req, res) => {
  try {
    const { userId, weight, date } = req.body;
    const newEntry = new Progress({ userId, weight, date });
    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET - Fetch entries by user
router.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const entries = await Progress.find({ userId }).sort({ date: 1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH - Update progress by entry ID
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { weight, date } = req.body;

  try {
    const updated = await Progress.findByIdAndUpdate(
      id,
      { weight, date },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Progress not found' });
    }

    res.json(updated);
  } catch (err) {
    console.error('Error updating progress:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
