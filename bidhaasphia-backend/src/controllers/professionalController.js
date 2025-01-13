import Professional from '../models/Professional.js';

// @desc    Get all professionals
// @route   GET /api/professionals
// @access  Public
export const getAllProfessionals = async (req, res) => {
  try {
    const professionals = await Professional.find();
    res.status(200).json(professionals);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching professionals', error: error.message });
  }
};

// @desc    Register a new professional
// @route   POST /api/professionals
// @access  Private/Admin
export const registerProfessional = async (req, res) => {
  const { fullName, email, phoneNumber, profession, bio } = req.body;
  const profilePicture = req.file ? req.file.path : null;

  try {
    if (!fullName || !email || !phoneNumber || !profession || !bio) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const newProfessional = new Professional({
      fullName,
      email,
      phoneNumber,
      profession,
      bio,
      profilePicture,
    });

    const createdProfessional = await newProfessional.save();
    res.status(201).json(createdProfessional);
  } catch (error) {
    res.status(500).json({ message: 'Error registering professional', error: error.message });
  }
};
