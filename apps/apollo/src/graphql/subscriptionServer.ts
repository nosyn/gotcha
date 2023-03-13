import { ApolloServerErrorCode } from '@apollo/server/errors';
import got from 'got';
import { useServer } from 'graphql-ws/lib/use/ws';
import http from 'node:http';
import { WebSocketServer } from 'ws';

// Others
import { redisClient } from 'cache';
import { GraphQLSchema } from 'graphql';
import { Disposable } from 'graphql-ws';
import { userOffline, userOnline } from '../services/users/index.js';
import { User } from '../types.js';

export interface MyContext {
  token?: string;
}

export function createGraphQLWebSocketServer(httpServer: http.Server, schema: GraphQLSchema): Disposable {
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
      context: (ctx) => {
        return { ...ctx };
      },
      onConnect: async (ctx) => {
        // if (!ctx.connectionParams?.authToken) {
        //   throw new Error(ApolloServerErrorCode.GRAPHQL_VALIDATION_FAILED);
        // }

        try {
          const { user } = await got
            .post('http://localhost:8080/api/auth/jwt/verify', {
              json: {
                jwt: ctx.connectionParams?.authToken,
              },
            })
            .json<{ user: User }>();

          await redisClient.set(`connection:${ctx.extra.request.headers['sec-websocket-key']}`, user.id);

          await userOnline({
            userId: user.id,
          });

          return true;
        } catch (err) {
          // console.error('Can not open websocket: ', err);

          return true;
        }
      },
      onDisconnect: async (ctx, code, reason) => {
        const userId = await redisClient.get(`connection:${ctx.extra.request.headers['sec-websocket-key']}`);

        if (userId) {
          await userOffline({
            userId,
          });
        }
      },
    },
    wsServer
  );
}
