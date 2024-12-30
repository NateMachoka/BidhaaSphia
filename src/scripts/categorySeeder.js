import dotenv from 'dotenv';
import Category from '../models/Category.js';
import connectDB from '../config/db.js';

dotenv.config();
connectDB();

const seedCategories = async () => {
  try {
    const categories = [
      { category: 'clothes', icon: 'clothes-icon.png' },  // Changed 'name' to 'category'
      { category: 'foods', icon: 'foods-icon.png' },  // Changed 'name' to 'category'
      { category: 'electronics', icon: 'electronics-icon.png' },  // Changed 'name' to 'category'
      { category: 'drinks and beverages', icon: 'drinks-icon.png' },  // Changed 'name' to 'category'
      { category: 'auto and parts', icon: 'auto-icon.png' },  // Changed 'name' to 'category'
      { category: 'toys and hobbies', icon: 'toys-icon.png' },  // Changed 'name' to 'category'
      { category: 'sports and fitness', icon: 'sports-icon.png' },  // Changed 'name' to 'category'
      { category: 'furniture', icon: 'furniture-icon.png' },  // Changed 'name' to 'category'
      { category: 'health and beauty', icon: 'health-icon.png' },  // Changed 'name' to 'category'
      { category: 'agric and garden', icon: 'agric-icon.png' },  // Changed 'name' to 'category'
      { category: 'personal services', icon: 'services-icon.png' },  // Changed 'name' to 'category'
      { category: 'kitchen and dining', icon: 'kitchen-icon.png' },  // Changed 'name' to 'category'
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
