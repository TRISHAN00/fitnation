// src/app/lib/logger.js
import fs from 'fs';
import path from 'path';

// Server-side log file path
const logFilePath = path.join(process.cwd(), 'src', 'app', 'assets', 'log', 'fitnation.log');

/**
 * Logs a message
 * - Server: writes to fitnation.log and console
 * - Client: logs to console only
 * @param {string} message
 */
export function log(message) {
  const timestamp = new Date().toISOString();
  const formattedMessage = `[${timestamp}] ${message}`;

  // Server-side: write to file
  if (typeof window === 'undefined') {
    try {
      // Ensure directory exists
      fs.mkdirSync(path.dirname(logFilePath), { recursive: true });
      fs.appendFileSync(logFilePath, formattedMessage + '\n', 'utf8');
    } catch (err) {
      console.error('Failed to write log:', err);
    }
  }

  // Console log (works both server & client)
  console.log(formattedMessage);
}
