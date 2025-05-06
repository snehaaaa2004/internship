const mongoose = require('mongoose');

const contactMessageSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String,
}, { timestamps: true });

// ✅ Check if model already exists before defining
const ContactMessage = mongoose.models.ContactMessage || mongoose.model('ContactMessage', contactMessageSchema);

module.exports = ContactMessage;
