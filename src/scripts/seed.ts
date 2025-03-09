import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

import { connectDB } from '~lib/db';
import User from '~models/User';

dotenv.config();

const seedAdmin = async () => {
  try {
    await connectDB();

    const existingAdmin = await User.findOne({ role: 'admin' });
    if (existingAdmin) {
      console.log('Admin account already exists.');
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash('Admin@123', 10);
    const admin = new User({
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'admin',
    });

    await admin.save();
    console.log('✅ Admin account created successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding admin:', error);
    process.exit(1);
  }
};

seedAdmin();
