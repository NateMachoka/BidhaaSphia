import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: [true, 'Category name is required'],
      unique: true,
      trim: true,
    },
    icon: {
      type: String, // URL or path to the category icon
      required: [true, 'Category icon is required'],
    },
  },
  {
    timestamps: true,
  },
);

// Middleware to standardize the category name
categorySchema.pre('save', function standardizeCategory(next) {
  if (this.category) {  // Changed 'name' to 'category'
    this.category = this.category.toLowerCase();
  }
  next();
});

const Category = mongoose.model('Category', categorySchema);

export default Category;
