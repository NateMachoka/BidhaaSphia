import Product from '../models/Product.js';
import Category from '../models/Category.js';

// @desc    Create a new product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = async (req, res) => {
  try {
    const {
      name, description, price, stock, category, icon,
    } = req.body;

    // Log input to check
    console.log('Product Data:', req.body);

    // Validate required fields
    if (!name || !price || stock === undefined || !category) {
      return res.status(400).json({ message: 'Name, price, stock, and category are required.' });
    }

    // Check if category exists
    const categoryExists = await Category.findById(category);

    if (!categoryExists) {
      return res.status(400).json({ message: 'Category does not exist.' });
    }

    // Create the product
    const product = new Product({
      name,
      description,
      price,
      stock,
      category, // Use category ID
      user: req.user.id, // Logged-in user (admin creating product)
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.log('Error creating product:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all products
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({})
      .populate('category', 'name icon') // Populate category fields
      .exec();

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// @desc    Get a product by ID
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = async (req, res) => {
  try {
    const {
      name, description, price, stock, category,
    } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price !== undefined ? price : product.price;
      product.stock = stock !== undefined ? stock : product.stock;
      product.category = category || product.category;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await product.deleteOne();
      res.json({ message: 'Product removed successfully' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Search products by name
// @route   GET /api/products/search
// @access  Public
export const searchProductsByName = async (req, res) => {
  try {
    const { name } = req.query;

    if (!name) {
      return res.status(400).json({ message: 'Search query "name" is required.' });
    }

    const products = await Product.find(
      { $text: { $search: name } }, // Perform a text search
      { score: { $meta: 'textScore' } }, // Include the relevance score
    ).sort({ score: { $meta: 'textScore' } }); // Sort by relevance

    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found with the given name.' });
    }

    res.json(products);
  } catch (error) {
    console.error('Error searching products:', error);
    res.status(500).json({ message: error.message });
  }
};
