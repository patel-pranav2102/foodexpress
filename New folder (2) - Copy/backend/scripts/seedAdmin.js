import mongoose from 'mongoose';
import User from '../src/models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');

    // Delete existing admin if it exists (to reset password)
    await User.deleteOne({ email: 'admin@fooddelivery.com' });

    // Create admin user - DON'T pre-hash, let Mongoose pre-save hook handle it
    const admin = new User({
      name: 'Admin',
      email: 'admin@fooddelivery.com',
      password: 'Admin@213',  // Plain password - will be hashed by pre-save hook
      phone: '0000000000',
      role: 'admin',
    });

    await admin.save();
    console.log('Admin user created successfully');
    console.log('Admin Email: admin@fooddelivery.com');
    console.log('Admin Password: Admin@213');
    console.log('Admin Username: admin123 (for login display)');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
};

seedAdmin();
