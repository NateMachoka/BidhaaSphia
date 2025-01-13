import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logFile = path.join(__dirname, '../logs/audit.log');

export const logger = {
  info: (message) => {
    const timestamp = new Date().toISOString();
    fs.appendFileSync(logFile, `[INFO] [${timestamp}] ${message}\n`);
  },
  error: (message) => {
    const timestamp = new Date().toISOString();
    fs.appendFileSync(logFile, `[ERROR] [${timestamp}] ${message}\n`);
  },
};

export default logger;
