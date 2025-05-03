/*const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/Workout'); // adjust path if needed

mongoose.connect('mongodb+srv://snehajacob2004:e4lBjldlMc3bMG8l@cluster0.74zgxum.mongodb.net/workout', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const createAdmin = async () => {
  try {
    const existingAdmin = await User.findOne({ email: 'admin@example.com' });
    if (existingAdmin) {
      console.log('Admin already exists');
      process.exit();
    }

    const hashedPassword = await bcrypt.hash('admin123', 10); // You can change this

    const adminUser = new User({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin', // This is the key part!
    });

    await adminUser.save();
    console.log('Admin user created successfully');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

createAdmin();*/
