// Standard libs imports
import fs from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

// Packages
import fastify from 'fastify';
import fastifyMultipart from '@fastify/multipart';
import fastifyStatic from '@fastify/static';
import type { FastifyInstance, RouteShorthandOptions } from 'fastify';

// Routes
import health from './routes/health.js';
import ping from './routes/ping.js';
import image from './routes/image.js';

import { __node_env__ } from './configs.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
export const staticFilesPath = path.join(__dirname, 'files');
if (!fs.existsSync(staticFilesPath)) {
  fs.mkdirSync(staticFilesPath);
}

const envToLogger = {
  development: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
        colorize: true,
        hideObject: true,
      },
    },
  },
  production: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
        colorize: true,
      },
    },
  },
  test: false,
};

const server: FastifyInstance = fastify({
  logger: envToLogger[__node_env__] ?? true,
});

// Fastify plugins
server.register(fastifyMultipart, {
  limits: {
    fieldNameSize: 100, // Max field name size in bytes
    fieldSize: 100, // Max field value size in bytes
    fields: 10, // Max number of non-file fields
    fileSize: 20 * 1024, // For multipart forms, the max file size in bytes ~ 20kb
    files: 1, // Max number of file fields
    headerPairs: 2000, // Max number of header key=>value pairs
  },
});
server.register(fastifyStatic, {
  root: staticFilesPath,
});

// Register routes
server.register(health);
server.register(ping);
server.register(image);

export default server;
