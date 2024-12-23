import mongoose from 'mongoose';
import Product from './src/models/Product.js';

mongoose.connect('mongodb://localhost:27017/BidhaaSphia', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Connected to the database.');

    // Use bulkWrite for efficient updates
    const products = await Product.find({});

    const bulkOps = products.map(product => {
      const updates = {};
      if (product.quantity !== undefined) {
        updates.stock = product.quantity; // Copy quantity to stock
        updates.quantity = undefined; // Remove quantity field
      }

      // Only return update operations for products needing changes
      return Object.keys(updates).length > 0
        ? {
            updateOne: {
              filter: { _id: product._id },
              update: { $set: updates, $unset: { quantity: "" } }, // $unset removes the field
            },
          }
        : null;
    }).filter(op => op !== null);

    if (bulkOps.length > 0) {
      const result = await Product.bulkWrite(bulkOps);
      console.log('Bulk update result:', result);
    } else {
      console.log('No updates required.');
    }

    mongoose.disconnect();
  })
  .catch(err => {
    console.error('Error:', err);
    mongoose.disconnect();
  });
