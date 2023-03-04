// Load envs from ".env"
import * as dotenv from 'dotenv';
dotenv.config();

import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Node environments
 */
export const __node_env__ = process.env.NODE_ENV ?? 'development';
export const __production__ = __node_env__ === 'production';
export const __development__ = __node_env__ === 'development';
export const __test__ = __node_env__ === 'test';
export const __dirname = dirname(fileURLToPath(import.meta.url));

export const staticFilesPath = path.join(__dirname, 'files');

/**
 * Server configs
 */
export const PORT = !isNaN(Number(process.env.PORT))
  ? Number(process.env.PORT)
  : 6000;
