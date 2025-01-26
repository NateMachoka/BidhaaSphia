import { config } from 'dotenv';
import { exec } from 'child_process';

// Load environment variables from .env.development
config({ path: '.env.development' });

// Start the Vercel dev server
exec('vercel dev', (err, stdout, stderr) => {
  if (err) {
    console.error(`Error: ${err.message}`);
    return;
  }
  if (stderr) {
    console.error(`Error: ${stderr}`);
    return;
  }
  console.log(stdout);
});
