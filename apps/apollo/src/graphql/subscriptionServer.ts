import http from 'node:http';
import got from 'got';
import { ApolloServerErrorCode } from '@apollo/server/errors';
import { useServer } from 'graphql-ws/lib/use/ws';
import { WebSocketServer } from 'ws';

// Others
import { GraphQLSchema } from 'graphql';
import { Disposable } from 'graphql-ws';
import { userOffline, userOnline } from '../services/users/index.js';
import { redisClient } from 'cache';

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
      context: (ctx) => {
        // console.log('ctx', ctx);
      },
      onConnect: async (ctx) => {
        // if (!ctx.connectionParams?.authToken) {
        //   throw new Error(ApolloServerErrorCode.GRAPHQL_VALIDATION_FAILED);
        // }

        // try {
        //   const response = await got
        //     .post('http://localhost:8080/api/auth/jwt/verify', {
        //       json: {
        //         jwt: ctx.connectionParams?.authToken,
        //       },
        //     })
        //     .json();

        //   await redisClient.set(
        //     `${ctx.extra.request.headers['sec-websocket-key']}`,
        //     response.user.id
        //   );

        //   await userOnline({
        //     userId: response?.user?.id,
        //   });

        return true;
        // } catch (err) {
        //   console.error('Can not open websocket: ', err);

        //   return false;
        // }
      },
      onDisconnect: async (ctx, code, reason) => {
        // const userId = await redisClient.get(
        //   `${ctx.extra.request.headers['sec-websocket-key']}`
        // );
        // await userOffline({
        //   userId,
        // });
      },
    },
    wsServer
  );
}
