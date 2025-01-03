import dotenv from 'dotenv';
import Category from '../models/Category.js';
import connectDB from '../config/db.js';

dotenv.config();
connectDB();

const seedCategories = async () => {
  try {
    const categories = [
      { category: 'clothes', icon: 'clothes-icon.png' },
      { category: 'foods', icon: 'foods-icon.png' },
      { category: 'electronics', icon: 'electronics-icon.png' },
      { category: 'drinks and beverages', icon: 'drinks-icon.png' },
      { category: 'auto and parts', icon: 'auto-icon.png' },
      { category: 'toys and hobbies', icon: 'toys-icon.png' },
      { category: 'sports and fitness', icon: 'sports-icon.png' },
      { category: 'furniture', icon: 'furniture-icon.png' },
      { category: 'health and beauty', icon: 'health-icon.png' },
      { category: 'agriculture and garden', icon: 'agric-icon.png' },
      { category: 'personal services', icon: 'services-icon.png' },
      { category: 'kitchen and dining', icon: 'kitchen-icon.png' },
    ];

    await Category.deleteMany(); // Clear existing categories
    await Category.insertMany(categories);

    console.log('Categories seeded successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedCategories();
