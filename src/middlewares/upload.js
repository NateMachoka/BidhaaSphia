import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Define the absolute path to the uploads directory
const uploadDirectory = path.join(process.cwd(), 'src/uploads');

// Check if the 'uploads' directory exists
if (!fs.existsSync(uploadDirectory)) {
  console.error(`Error: Upload directory "${uploadDirectory}" does not exist.`);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync(uploadDirectory)) {
      return cb(new Error(`Upload directory "${uploadDirectory}" does not exist.`));
    }
    cb(null, uploadDirectory); // Save files in the src/uploads directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});

const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png/;
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimetype);

  if (extName && mimeType) return cb(null, true);
  cb(new Error('Images only!'));
};

export const upload = multer({ storage, fileFilter });
