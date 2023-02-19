// Load envs from ".env"
import * as dotenv from 'dotenv';
dotenv.config();

/**
 * Node environments
 */
export const __node_env__ = process.env.NODE_ENV ?? 'development';
export const __production__ = __node_env__ === 'production';
export const __development__ = __node_env__ === 'development';
export const __test__ = __node_env__ === 'test';
export const __port__ = process.env.PORT;

/**
 * Server configs
 */
export const PORT = !isNaN(Number(__port__)) ? Number(__port__) : 5000;
