import dotenv from 'dotenv';
import Service from '../models/Service.js';
import connectDB from '../config/db.js';

dotenv.config(); // Load the environment variables
connectDB(); // establish the connection

const services = [
  { name: 'Home Chef', icon: 'chef-hat', price: '$50/hr', description: 'Cook meals for you and your family.' },
  { name: 'Electrician', icon: 'zap', price: '$70/hr', description: 'Fix electrical issues around your home.' },
  { name: 'Deep Cleaning', icon: 'spray', price: '$60/hr', description: 'Clean your home or office space deeply.' },
  { name: 'Nanny', icon: 'baby', price: '$40/hr', description: 'Caring and nurturing for your children.' },
  { name: 'Nursing', icon: 'stethoscope', price: '$75/hr', description: 'Professional nursing services for home care.' },
  { name: 'Driver', icon: 'car', price: '$25/hr', description: 'Safe and reliable transportation.' },
  { name: 'Plumber', icon: 'wrench', price: '$65/hr', description: 'Fix plumbing issues and installations.' },
  { name: 'Personal Shopper', icon: 'shopping-bag', price: '$50/hr', description: 'Help with buying groceries or gifts.' },
  { name: 'Tile and Flooring', icon: 'grid', price: '$80/hr', description: 'Install or repair tiles and flooring.' },
  { name: 'Gardener', icon: 'flower', price: '$30/hr', description: 'Maintain your garden and landscaping.' },
  { name: 'Pet Sitting', icon: 'dog', price: '$35/hr', description: 'Care for your pets while you\'re away.' },
];

const seedServices = async () => {
  try {
    // Remove all existing services before seeding
    await Service.deleteMany(); 
    // Insert new services into the database
    await Service.insertMany(services);

    console.log('Services seeded successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedServices();
