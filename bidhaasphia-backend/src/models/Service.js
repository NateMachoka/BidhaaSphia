import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  icon: { type: String, required: true }, // Save the icon name or path
  price: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Service = mongoose.model('Service', serviceSchema);

export default Service;
