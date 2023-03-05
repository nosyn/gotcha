import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { jwtStore } from '../store/jwt';

export const httpLink = new HttpLink({
  uri: 'http://localhost:5000/graphql',
});

let activeSocket: any, timedOut: any;

export const wsLink = new GraphQLWsLink(
  createClient({
    url: 'ws://localhost:5000/graphql',
    keepAlive: 2_000,
    on: {
      connected: (socket) => (activeSocket = socket),
      ping: (received) => {
        if (!received)
          // sent
          timedOut = setTimeout(() => {
            if (activeSocket.readyState === WebSocket.OPEN)
              activeSocket.close(4408, 'Request Timeout');
          }, 5_000); // wait 5 seconds for the pong and then close the connection
      },
      pong: (received) => {
        if (received) clearTimeout(timedOut); // pong is received, clear connection close timeout
      },
      closed: () => {
        console.log('Websocket closed');
      },
    },
    connectionParams: () => {
      return {
        authToken: jwtStore.getState().jwt,
      };
    },
  })
);

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
export const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);
