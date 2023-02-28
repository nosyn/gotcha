// Packages
import express, { Router } from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';

import { PORT } from './configs.js';

import { __node_env__ } from './configs.js';
import morgan from './middlewares/morgan.js';

// Handlers
import health from './handlers/health.js';
import login from './handlers/login.js';
import logout from './handlers/logout.js';

const start = async () => {
  const app = express();

  const httpServer = http.createServer(app);

  app.use(cors<cors.CorsRequest>(), bodyParser.json(), morgan);

  app.use('/health', health);
  app.use('/login', login);
  app.use('/logout', logout);

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
