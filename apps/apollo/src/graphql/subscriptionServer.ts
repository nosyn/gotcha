import http from 'node:http';
import got from 'got';
import { ApolloServerErrorCode } from '@apollo/server/errors';
import { useServer } from 'graphql-ws/lib/use/ws';
import { WebSocketServer } from 'ws';

// Others
import { GraphQLSchema } from 'graphql';
import { Disposable } from 'graphql-ws';

export interface MyContext {
  token?: string;
}

export function createGraphQLWebSocketServer(
  httpServer: http.Server,
  schema: GraphQLSchema
): Disposable {
  // Creating the WebSocket server
  const wsServer = new WebSocketServer({
    // This is the `httpServer` we created in a previous step.
    server: httpServer,
  });

  // Hand in the schema we just created and have the
  // WebSocketServer start listening.
  return useServer(
    {
      schema,
      onConnect: async (ctx) => {
        if (!ctx.connectionParams?.authToken) {
          throw new Error(ApolloServerErrorCode.GRAPHQL_VALIDATION_FAILED);
        }

        try {
          await got
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
    },
    wsServer
  );
}
