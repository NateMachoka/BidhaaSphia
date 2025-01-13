import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// Source and output directories
const inputDir = path.join('src', 'uploads');
const outputDir = path.join('src', 'optimized_uploads');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Optimize images
fs.readdir(inputDir, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  files.forEach((file) => {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, file);

    sharp(inputPath)
      .resize(1920) // Resize width to 1920px, maintaining aspect ratio
      .jpeg({ quality: 85 }) // Convert to JPEG with 85% quality
      .toFile(outputPath)
      .then(() => {
        console.log(`Optimized: ${file}`);
      })
      .catch((err) => {
        console.error(`Error processing ${file}:`, err);
      });
  });
});
