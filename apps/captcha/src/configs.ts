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
  : 8080;
export const PROTOCOL = process.env.PROTOCOL ?? 'http';
export const HOST = process.env.HOST ?? 'localhost';
export const API_PATH = process.env.API_PATH ?? 'api';
export const GRAPHQL_PATH = process.env.GRAPHQL_PATH ?? 'graphql';
export const STORAGE_PATH = process.env.STORAGE_PATH ?? 'storage';
export const AUTH_PATH = process.env.AUTH_PATH ?? 'auth';

/**
 * Gateway
 */
export const GATEWAY_API = `${PROTOCOL}://${HOST}:${PORT}/${API_PATH}`;

/**
 * Apollo GraphQL server
 */
export const GRAPHQL_API = `${GATEWAY_API}/${GRAPHQL_PATH}`;

/**
 * Storage server
 */
export const STORAGE_API = `${GATEWAY_API}/${STORAGE_PATH}`;
