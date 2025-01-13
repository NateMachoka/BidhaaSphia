import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve __dirname for ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to your uploads directory
const uploadsDir = path.join(__dirname, 'src/uploads');

// Output file to save the generated HTML
const outputFile = path.join(__dirname, 'lazyImages.html');

// Async function to handle the file operations
async function generateLazyImages() {
  try {
    // Read all files in the uploads directory
    const files = await fs.readdir(uploadsDir);

    // Filter image files (optional: based on extensions like .jpg, .png)
    const imageFiles = files.filter((file) => /\.(jpg|jpeg|png|webp)$/i.test(file));

    // Generate HTML for each image
    const htmlContent = imageFiles
      .map(
        (filename) =>
          `<img src="/uploads/${filename}" loading="lazy" alt="${path.basename(filename, path.extname(filename))}">`
      )
      .join('\n');

    // Write the HTML to an output file
    await fs.writeFile(outputFile, htmlContent, 'utf8');
    console.log(`HTML file generated successfully: ${outputFile}`);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Execute the function
generateLazyImages();
