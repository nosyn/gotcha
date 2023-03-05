// Packages
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';

import { PORT } from './configs.js';

import { __node_env__ } from './configs.js';
import { logger, authentication } from './middlewares/index.js';

// Handler functions
import health from './handlers/health.js';
import login from './handlers/login.js';
import logout from './handlers/logout.js';
import me from './handlers/me.js';
import { handlerFuncWrapper } from './handlers/handlerFuncWrapper.js';

const start = async () => {
  const app = express();

  const httpServer = http.createServer(app);

  // Middleware
  app.use(
    cors<cors.CorsRequest>(),
    bodyParser.json(),
    logger(),
    authentication()
  );

  app.get('/health', health);
  app.get('/me', handlerFuncWrapper(me));
  app.post('/login', handlerFuncWrapper(login));
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
