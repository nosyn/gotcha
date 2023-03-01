// Packages
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';

import { PORT } from './configs.js';

import { __node_env__ } from './configs.js';
import { logger, authentication } from './middlewares/index.js';

// Handlers
import health from './handlers/health.js';
import login from './handlers/login.js';
import logout from './handlers/logout.js';
import { prisma } from './dbClient/index.js';

const start = async () => {
  const app = express();

  const httpServer = http.createServer(app);
  console.log('userss: ', await prisma.user.findMany({}));

  // Middleware
  app.use(
    cors<cors.CorsRequest>(),
    bodyParser.json(),
    logger(),
    authentication()
  );

  app.get('/health', health);
  app.post('/login', login);
  app.post('/logout', logout);

  // Modified server startup
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: PORT }, resolve)
  );
  console.log(`🔥 Server ready at http://localhost:${PORT}/`);
};

start().catch((error) => {
  console.error('Error occurred:\n', error);
  console.info('Top level exception caught. Exiting.');
  process.exit(1);
});
