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
    image: { type: String, required: [true, 'Product image is required'] },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  },
);

// Add text index to product schema
productSchema.index({ name: 'text', description: 'text' });

productSchema.pre('save', async function (next) {
  if (this.category) {
    try {
      const categoryDoc = await mongoose.model('Category').findById(this.category);
      if (categoryDoc) {
        // Set category name to lowercase if needed
        categoryDoc.category = categoryDoc.category.toLowerCase();
        await categoryDoc.save();
      }
    } catch (err) {
      return next(err);
    }
  }
  next();
});

const Product = mongoose.model('Product', productSchema);

export default Product;
