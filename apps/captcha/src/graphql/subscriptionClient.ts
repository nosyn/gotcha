import { ApolloClient } from '@apollo/client/core/ApolloClient.js';
import { InMemoryCache } from '@apollo/client/cache/inmemory/inMemoryCache.js';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions/index.js';
import { createClient } from 'graphql-ws';
import WebSocket from 'ws';

export const wsLink = new GraphQLWsLink(
  createClient({
    url: 'ws://localhost:8080/api/graphql',
    keepAlive: 5_000,
    connectionParams: () => {
      return {
        authToken: 'something',
      };
    },
    webSocketImpl: WebSocket,
  })
);

const client = new ApolloClient({
  link: wsLink,
  cache: new InMemoryCache({
    resultCaching: false,
  }),
});

export default client;
