import fs from 'fs/promises';
import path from 'path';

// Define the base directory and the destination directory
const baseDir = process.cwd();
const destinationDir = path.join(baseDir, 'src', 'uploads');

// Function to move files from any directory to the destination
async function moveFiles() {
  try {
    // Check if the destination directory exists, create it if it doesn't
    await fs.mkdir(destinationDir, { recursive: true });

    // Recursively find .jpg files in all directories
    const jpgFiles = await findJpgFiles(baseDir);

    if (jpgFiles.length === 0) {
      console.log('No JPG files found.');
      return;
    }

    // Loop through each found file and move it to the destination directory
    for (const file of jpgFiles) {
      const sourcePath = file;
      const fileName = path.basename(file);
      const destPath = path.join(destinationDir, fileName);

      try {
        // Move the file to the destination
        await fs.copyFile(sourcePath, destPath);
        console.log(`Moved: ${sourcePath} -> ${destPath}`);
      } catch (err) {
        console.error(`Error copying file: ${sourcePath} -> ${destPath}`, err);
      }
    }
  } catch (err) {
    console.error('Error in moveFiles function:', err);
  }
}

// Function to recursively find all .jpg files in a directory
async function findJpgFiles(directory) {
  let jpgFiles = [];
  
  try {
    // Read all files and directories in the current directory
    const entries = await fs.readdir(directory, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(directory, entry.name);
      
      if (entry.isDirectory()) {
        // If it's a directory, recursively search inside it
        const nestedFiles = await findJpgFiles(fullPath);
        jpgFiles = jpgFiles.concat(nestedFiles);
      } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.jpg')) {
        // If it's a .jpg file, add it to the list
        jpgFiles.push(fullPath);
      }
    }
  } catch (err) {
    console.error('Error reading directory:', directory, err);
  }

  return jpgFiles;
}

// Execute the moveFiles function
moveFiles();
