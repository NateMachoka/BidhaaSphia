import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: [true, 'Category name is required'],
      unique: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

// Middleware to standardize the category name
categorySchema.pre('save', function standardizeCategory(next) {
  if (this.category) {
    this.category = this.category.toLowerCase();
  }
  next();
});

const Category = mongoose.model('Category', categorySchema);

export default Category;
