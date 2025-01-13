import Service from '../models/Service.js';

// @desc    Get all services
// @route   GET /api/services
// @access  Public
export const getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching services', error: error.message });
  }
};

// @desc    Add a new service
// @route   POST /api/services
// @access  Private/Admin
export const addService = async (req, res) => {
  const { name, icon, price, description } = req.body;

  try {
    if (!name || !icon || !price || !description) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const newService = new Service({ name, icon, price, description });
    const createdService = await newService.save();
    res.status(201).json(createdService);
  } catch (error) {
    res.status(500).json({ message: 'Error adding service', error: error.message });
  }
};
