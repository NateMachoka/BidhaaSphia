import dotenv from 'dotenv';
import Category from '../models/Category.js';
import connectDB from '../config/db.js';

dotenv.config();
connectDB();

const seedCategories = async () => {
  try {
    const categories = [
      { category: 'clothes' },
      { category: 'foods' },
      { category: 'electronics' },
      { category: 'drinks_and_beverages' },
      { category: 'auto_and_parts' },
      { category: 'toys_and_hobbies' },
      { category: 'sports_and_fitness' },
      { category: 'furniture' },
      { category: 'health_and_beauty' },
      { category: 'agriculture_and_garden' },
    ];

    // Remove all existing categories before seeding
    await Category.deleteMany(); 
    // Insert new categories into the database
    await Category.insertMany(categories);

    console.log('Categories seeded successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedCategories();
