import express from 'express';
import { upload } from '../middlewares/upload.js'; // Import the configured upload instance
import { getAllProfessionals, registerProfessional } from '../controllers/professionalController.js';

const router = express.Router();

router.get('/', getAllProfessionals);
router.post('/', upload.single('profilePicture'), registerProfessional);

export default router;
