// Example using Express and Mongoose
const express = require('express');
const router = express.Router();
const ContactMessage = require('../models/ContactMessage'); // adjust the path as needed

// DELETE a specific message
router.delete('/admin/messages/:id', async (req, res) => {
  try {
    const deletedMessage = await ContactMessage.findByIdAndDelete(req.params.id);
    if (!deletedMessage) {
      return res.status(404).json({ error: 'Message not found' });
    }
    res.status(200).json({ message: 'Message deleted successfully' });
  } catch (error) {
    console.error('Error deleting message:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
