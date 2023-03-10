// Packages
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import { expressMiddleware } from '@apollo/server/express4';

import { PORT } from './configs.js';
import { createGraphQLServer } from './graphql/server.js';

import { __node_env__ } from './configs.js';
import health from './handlers/health.js';

import { authentication, morgan } from './middlewares/index.js';

const start = async () => {
  // Required logic for integrating with Express
  const app = express();

  // Our httpServer handles incoming requests to our Express app.
  // Below, we tell Apollo Server to "drain" this httpServer,
  // enabling our servers to shut down gracefully.
  const httpServer = http.createServer(app);

  const graphQLServer = await createGraphQLServer(httpServer);

  app.use(cors<cors.CorsRequest>(), bodyParser.json(), morgan, authentication);

  // Handlers
  app.get('/health', health);

  app.use(
    '/',
    expressMiddleware(graphQLServer, {
      context: async ({ req }) => {
        // !TODO: Turn back on when auth is ready
        const { user } = req.session;

        // if (!user) {
        //   throw new Error('Unauthorized');
        // }

        return { req };
      },
    })
  );

  // Modified server startup
  await new Promise<void>((resolve) => httpServer.listen({ port: PORT }, resolve));

  console.log(`🔥 Server ready at http://localhost:${PORT}/`);
  console.log(`🚀 GraphQL Server ready at http://localhost:${PORT}/graphql`);
  console.log(`🚀 GraphQL Subscription Server ready at ws://localhost:${PORT}/graphql`);
};

start().catch((error) => {
  console.error('Error occurred:\n', error);
  console.info('Top level exception caught. Exiting.');
  process.exit(1);
});
