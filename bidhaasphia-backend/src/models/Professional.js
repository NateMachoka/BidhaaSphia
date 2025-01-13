import mongoose from 'mongoose';

const professionalSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  profession: { type: String, required: true },
  bio: { type: String, required: true },
  profilePicture: { type: String }, // Path to the uploaded picture
  createdAt: { type: Date, default: Date.now },
});

const Professional = mongoose.model('Professional', professionalSchema);

export default Professional;
;
