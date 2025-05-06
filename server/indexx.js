const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

const Progress = require('./models/progress.js');
const User = require('./models/Workout');
const ContactMessage = require('./models/ContactMessage');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

console.log('Current directory:', path.resolve());

// ==============================
// Connect to MongoDB Databases
// ==============================

// 1. Auth DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Auth DB connected'))
  .catch(err => console.error('❌ Auth DB error:', err));

// 2. Progress DB
const progressDB = mongoose.createConnection('mongodb+srv://mahadevj:RONIeJzcmlgQlc8I@cluster0.ayjoi8m.mongodb.net/fitness_tracker', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
progressDB.on('connected', () => console.log('✅ Progress DB connected'));
progressDB.on('error', err => console.error('❌ Progress DB error:', err));

// 3. Plans DB
const plansDB = mongoose.createConnection('mongodb+srv://dhiyasusanthomas100:2DtOY75d7fXSts1U@cluster0.nlbfgvx.mongodb.net/gym', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
plansDB.on('connected', () => console.log('✅ Plans DB connected'));
plansDB.on('error', err => console.error('❌ Plans DB error:', err));

// ==============================
// Models for Progress, Plans, and Contact Messages
// ==============================

const ProgressSchema = new mongoose.Schema({
  weight: Number,
  date: String
});
const ProgressModel = progressDB.model('Progress', ProgressSchema);

const PlanSchema = new mongoose.Schema({
  category: String,
  type: String,
  title: String,
  description: String
});
const Plan = plansDB.model('Plan', PlanSchema);


// ==============================
// Routes
// ==============================

app.get('/', (req, res) => res.send('🎉 API running'));

// ===== Auth Routes =====
const authRoutes = require('./Routes/auth');
app.use('/api', authRoutes);

// ===== User Management Routes (Admin) =====

app.get('/User', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.delete('/User/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.send('User deleted');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.put('/User/:id', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, password, role },
      { new: true }
    );
    res.json(updatedUser);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// ===== Progress Routes =====

app.post('/progress', async (req, res) => {
  try {
    const { weight, date } = req.body;
    const newProgress = new ProgressModel({ weight, date });
    await newProgress.save();
    res.status(201).json(newProgress);
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.get('/progress', async (req, res) => {
  try {
    const data = await ProgressModel.find({});
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.patch('/progress/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { weight, date } = req.body;

    const updated = await ProgressModel.findByIdAndUpdate(
      id,
      { weight, date },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Progress entry not found.' });
    }

    res.status(200).json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.delete('/progress', async (req, res) => {
  try {
    const result = await ProgressModel.deleteMany({});
    res.status(200).json({ message: 'All progress data deleted', result });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// ===== Plan Routes =====

app.get('/plans', async (req, res) => {
  try {
    const { category, type } = req.query;
    const query = {};
    if (category) query.category = new RegExp(`^${category}$`, 'i');
    if (type) query.type = new RegExp(`^${type}$`, 'i');

    const plans = await Plan.find(query);
    res.status(200).json(plans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ===== Contact Message Routes =====
const messageRoutes = require('./Routes/contact.js'); // or whatever you named it
app.use('/', messageRoutes);

// Submit contact message
app.post('/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Please provide a valid email address' });
    }

    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(name)) {
      return res.status(400).json({ message: 'Name cannot contain numbers or special characters' });
    }

    const newMessage = new ContactMessage({ name, email, subject, message });
    await newMessage.save();

    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error, please try again later' });
  }
});

// Get all contact messages (admin)
app.get('/admin/messages', async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ date: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch messages' });
  }
});

// Delete contact message (admin)
app.delete('/admin/messages/:id', async (req, res) => {
  try {
    await ContactMessage.findByIdAndDelete(req.params.id);
    res.status(200).send('Deleted');
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// ==============================
// Start Server
// ==============================

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
