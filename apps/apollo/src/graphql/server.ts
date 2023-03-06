import http from 'node:http';
import { ApolloServer } from '@apollo/server';
import { ApolloServerErrorCode } from '@apollo/server/errors';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { loggers } from './plugins/logger.js';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import got from 'got';

// Others
import resolvers from './resolvers/index.js';
import typeDefs from './typeDefs.js';

export interface MyContext {
  token?: string;
}

export async function createGraphQLServer(httpServer: http.Server) {
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  // Creating the WebSocket server
  const wsServer = new WebSocketServer({
    // This is the `httpServer` we created in a previous step.
    server: httpServer,
  });

  // Hand in the schema we just created and have the
  // WebSocketServer start listening.
  const serverCleanup = useServer(
    {
      schema,

      onConnect: async (ctx) => {
        if (!ctx.connectionParams?.authToken) {
          throw new Error(ApolloServerErrorCode.GRAPHQL_VALIDATION_FAILED);
        }

        try {
          const response = await got
            .post('http://localhost:8080/api/auth/jwt/verify', {
              json: {
                jwt: ctx.connectionParams?.authToken,
              },
            })
            .json();
        } catch (err) {
          console.error('Can not open websocket: ', err);
          return false;
        }
      },
      onDisconnect: async (ctx, code, reason) => {
        console.log('onDisconnect:', code, reason);
      },
      onComplete: async (ctx) => {
        console.log('onComplete: ');
      },
    },
    wsServer
  );

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
