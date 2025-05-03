const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  weight: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('Progress', progressSchema);
