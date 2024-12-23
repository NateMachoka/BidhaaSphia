import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Helper function for email validation
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, phoneNumber } = req.body;

    // Validate input fields
    if (!name) return res.status(400).json({ error: 'Name is required' });
    if (!email) return res.status(400).json({ error: 'Email is required' });
    if (!password) return res.status(400).json({ error: 'Password is required' });
    if (!phoneNumber) return res.status(400).json({ error: 'Phone number is required' });

    // Validate email format
    if (!isValidEmail(email)) return res.status(400).json({ error: 'Invalid email format' });

    // Validate phone number (optional regex for format)
    if (!/^\d+$/.test(phoneNumber)) return res.status(400).json({ error: 'Invalid phone number format' });

    // Validate password strength
    if (password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters long' });
    }

    // Check for existing users
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: 'Email already in use' });

    // Create and save the new user
    const user = new User({ name, email, password, phoneNumber });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


// Login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password are required' });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const updatePhoneNumber = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const { phoneNumber } = req.body;

    if (!phoneNumber || !/^\d+$/.test(phoneNumber)) {
      return res.status(400).json({ message: 'Invalid phone number format.' });
    }

    const user = await User.findByIdAndUpdate(userId, { phoneNumber }, { new: true });
    res.status(200).json({ message: 'Phone number updated successfully.', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
