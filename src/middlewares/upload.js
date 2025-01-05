import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Use import.meta.url to get the directory of the current file
const uploadPath = path.join(new URL(import.meta.url).pathname, '../uploads/');

// Convert the file URL to a filesystem path (as it's in URL format in ES Modules)
const uploadDirectory = decodeURIComponent(uploadPath).replace(/^\/|\/$/g, '');

// Ensure the 'uploads' directory exists
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory); // Save files in the uploads directory
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
