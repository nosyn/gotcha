// Load envs from ".env"
import * as dotenv from 'dotenv';
dotenv.config();

import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Node environments
 */
export const __node_env__ = process.env.NODE_ENV ?? 'development';
export const __production__ = __node_env__ === 'production';
export const __development__ = __node_env__ === 'development';
export const __test__ = __node_env__ === 'test';
export const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Server configs
 */
export const PORT = !isNaN(Number(process.env.PORT))
  ? Number(process.env.PORT)
  : 5100;
export const COOKIES_NAME = process.env.COOKIES_NAME || 'qid';
