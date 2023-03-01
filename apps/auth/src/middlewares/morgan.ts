import fs from 'node:fs';
import path from 'node:path';

import morgan from 'morgan';
import { __dirname } from '../configs.js';

// Define the logging format
const logFormat =
  ':method :url :status :res[content-length] - :response-time ms';

// Define the logging configuration
export const logger = () =>
  morgan(logFormat, {
    // Stream the logs to a file instead of console
    stream: fs.createWriteStream(path.join(__dirname, 'access.log'), {
      flags: 'a',
    }),
    // Only log requests with a status code greater than or equal to 400
    skip: (req, res) => res.statusCode < 400,
  });
