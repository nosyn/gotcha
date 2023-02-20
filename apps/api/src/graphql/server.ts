import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import http from 'http';
import { loggers } from './plugins/logger.js';

// Others
import resolvers from './resolvers/index.js';
import typeDefs from './typeDefs.js';

export interface MyContext {
  token?: string;
}

export async function createGraphQLServer(httpServer: http.Server) {
  // Same ApolloServer initialization as before, plus the drain plugin
  // for our httpServer.
  const server = new ApolloServer<MyContext>({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer }), loggers],
  });
  // Ensure we wait for our server to start
  await server.start();

  return server;
}
