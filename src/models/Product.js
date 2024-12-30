import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      min: [0, 'Price must be greater than 0'],
    },
    stock: {
      type: Number,
      required: [true, 'Product stock is required'],
      min: [0, 'Quantity must at least be 1'],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category', // Reference to the Category model
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Link to User schema
      required: true,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  },
);

// Add text index to product schema
productSchema.index({ name: 'text', description: 'text' });

// Middleware to ensure category is saved in lowercase
productSchema.pre('save', function standardizeCategory(next) {
  if (this.category) {
    this.category = this.category.toLowerCase();
  }
  next();
});

const Product = mongoose.model('Product', productSchema);

export default Product;
