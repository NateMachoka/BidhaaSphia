import dotenv from 'dotenv';
import Category from '../models/Category.js';
import connectDB from '../config/db.js';

dotenv.config();
connectDB();

const seedCategories = async () => {
  try {
    const categories = [
      {
        category: 'clothes',
        icon: 'https://img.icons8.com/color/48/oNJflbRCCnsP/clothes.png',
        attribution: '<a target="_blank" href="https://icons8.com/icon/oNJflbRCCnsP/clothes">Clothes</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>',
      },
      {
        category: 'foods',
        icon: 'https://img.icons8.com/color/48/5s2gU9vF5Tyl/healthy-food.png',
        attribution: '<a href="https://www.flaticon.com/free-icons/healthy-food" title="healthy-food icons">Healthy-food icons created by Freepik - Flaticon</a>',
      },
      {
        category: 'electronics',
        icon: 'https://img.icons8.com/color/48/sO7DzMGVLleD/electronic-products.png',
        attribution: '<a target="_blank" href="https://icons8.com/icon/sO7DzMGVLleD/electronic-products">Electronic Products</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>',
      },
      {
        category: 'drinks_and_beverages',
        icon: 'https://img.icons8.com/color/48/Luh5Fgf8dUI7/wine-and-glass.png',
        attribution: '<a target="_blank" href="https://icons8.com/icon/Luh5Fgf8dUI7/wine-and-glass">Wine And Glass</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>',
      },
      {
        category: 'auto_and_parts',
        icon: 'https://img.icons8.com/color/48/XUJlCZR5Kdwk/car-service.png',
        attribution: '<a target="_blank" href="https://icons8.com/icon/XUJlCZR5Kdwk/car-service">Car Service</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>',
      },
      {
        category: 'toys_and_hobbies',
        icon: 'https://img.icons8.com/color/48/l19wuXnsjOHD/toys.png',
        attribution: '<a target="_blank" href="https://icons8.com/icon/l19wuXnsjOHD/toys">Toys</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>',
      },
      {
        category: 'sports_and_fitness',
        icon: 'https://img.icons8.com/color/48/JvRnjqoqMC6B/bench-fitness.png',
        attribution: '<a target="_blank" href="https://icons8.com/icon/JvRnjqoqMC6B/bench-fitness">Bench Fitness</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>',
      },
      {
        category: 'furniture',
        icon: 'https://img.icons8.com/color/48/Y1GJRHnyYIKy/furniture-and-household.png',
        attribution: '<a target="_blank" href="https://icons8.com/icon/Y1GJRHnyYIKy/furniture-and-household">Furniture And Household</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>',
      },
      {
        category: 'health_and_beauty',
        icon: 'https://img.icons8.com/color/48/1wy6FKSIfdEC/perfume-bottle.png',
        attribution: '<a target="_blank" href="https://icons8.com/icon/1wy6FKSIfdEC/perfume-bottle">Perfume Bottle</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>',
      },
      {
        category: 'agriculture_and_garden',
        icon: 'https://img.icons8.com/color/48/GK2k4UvSHk9b/garden.png',
        attribution: '<a target="_blank" href="https://icons8.com/icon/GK2k4UvSHk9b/garden">Garden</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>',
      },
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
