import 'dotenv/config';
import mongoose from 'mongoose';
import User from './src/models/User.js';
import Restaurant from './src/models/Restaurant.js';

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/food-delivery';
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Restaurant.deleteMany({});
    console.log('Cleared existing data');

    // Create test users
    const testUser = new User({
      name: 'Test User',
      email: 'test@example.com',
      password: 'Password123', // Will be hashed by pre-save hook
      phone: '5551234567',
      address: '123 Main St, City, State 12345',
      role: 'user',
    });

    const adminUser = new User({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'AdminPassword123', // Will be hashed by pre-save hook
      phone: '5559876543',
      address: '456 Admin Ave, City, State 67890',
      role: 'admin',
    });

    await testUser.save();
    await adminUser.save();
    console.log('✓ Created test users');

    // Create sample restaurants
    const restaurants = [
      {
        name: 'Pizza Palace',
        description: 'Authentic Italian pizzas made with fresh ingredients',
        cuisine: ['Italian', 'Pizza'],
        rating: 4.5,
        image: '/restaurant-placeholder.jpg',
        address: '123 Restaurant Street, Downtown',
        phone: '555-0101',
        hours: { open: '11:00', close: '23:00' },
        isOpen: true,
        deliveryTime: 30,
        minOrder: 10,
      },
      {
        name: 'Burger Barn',
        description: 'Classic American burgers and fries',
        cuisine: ['American', 'Burgers'],
        rating: 4.2,
        image: '/restaurant-placeholder.jpg',
        address: '456 Fast Food Lane, Midtown',
        phone: '555-0102',
        hours: { open: '10:00', close: '22:00' },
        isOpen: true,
        deliveryTime: 25,
        minOrder: 8,
      },
      {
        name: 'Sushi Master',
        description: 'Premium sushi and Japanese cuisine',
        cuisine: ['Japanese', 'Sushi'],
        rating: 4.8,
        image: '/restaurant-placeholder.jpg',
        address: '789 Asian Plaza, Uptown',
        phone: '555-0103',
        hours: { open: '12:00', close: '23:30' },
        isOpen: true,
        deliveryTime: 35,
        minOrder: 15,
      },
      {
        name: 'Taco Fiesta',
        description: 'Authentic Mexican street tacos and more',
        cuisine: ['Mexican', 'Tacos'],
        rating: 4.3,
        image: '/restaurant-placeholder.jpg',
        address: '321 Latin Place, Eastside',
        phone: '555-0104',
        hours: { open: '11:00', close: '22:00' },
        isOpen: true,
        deliveryTime: 28,
        minOrder: 12,
      },
      {
        name: 'Curry House',
        description: 'Delicious Indian curries and spices',
        cuisine: ['Indian', 'Curry'],
        rating: 4.4,
        image: '/restaurant-placeholder.jpg',
        address: '654 Spice Street, Westside',
        phone: '555-0105',
        hours: { open: '12:00', close: '23:00' },
        isOpen: true,
        deliveryTime: 40,
        minOrder: 14,
      },
    ];

    await Restaurant.insertMany(restaurants);
    console.log('✓ Created 5 sample restaurants');

    console.log('\n✅ Database seeding completed!');
    console.log('\nTest Credentials:');
    console.log('User Account:');
    console.log('  Email: test@example.com');
    console.log('  Password: Password123');
    console.log('\nAdmin Account:');
    console.log('  Email: admin@example.com');
    console.log('  Password: AdminPassword123');

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();
