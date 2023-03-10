import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { makeExecutableSchema } from '@graphql-tools/schema';
import http from 'node:http';
import { loggers } from './plugins/logger.js';

// Others
import resolvers from './resolvers/index.js';
import { createGraphQLWebSocketServer } from './subscriptionServer.js';
import typeDefs from './typeDefs.js';

export interface MyContext {
  token?: string;
}

export async function createGraphQLServer(httpServer: http.Server) {
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const serverCleanup = createGraphQLWebSocketServer(httpServer, schema);

  // Same ApolloServer initialization as before, plus the drain plugin
  // for our httpServer.
  const server = new ApolloServer<MyContext>({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }), // Proper shutdown for the WebSocket server.
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
      loggers,
    ],
  });
  // Ensure we wait for our server to start
  await server.start();

  return server;
}
