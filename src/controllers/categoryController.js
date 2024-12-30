import Category from '../models/Category.js';

// @desc    Add a new category
// @route   POST /api/categories
// @access  Private/Admin
export const createCategory = async (req, res) => {
  try {
    const { category, icon } = req.body;

    if (!category || !icon) {
      return res.status(400).json({ message: 'Category name and icon are required.' });
    }

    const categoryExists = await Category.findOne({ category: category.toLowerCase() });  // Changed 'name' to 'category'

    if (categoryExists) {
      return res.status(400).json({ message: 'Category already exists.' });
    }

    const newCategory = new Category({
      category,  // Changed 'name' to 'category'
      icon,
    });

    const createdCategory = await newCategory.save();
    res.status(201).json(createdCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
export const getCategories = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const pageSize = 10;

    const count = await Category.countDocuments({});
    const categories = await Category.find({})
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({
      categories,
      page,
      pages: Math.ceil(count / pageSize),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
