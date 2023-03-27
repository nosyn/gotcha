import { InMemoryCache } from '@apollo/client/cache/inmemory/inMemoryCache.js';
import { ApolloClient } from '@apollo/client/core/ApolloClient.js';
import { ApolloLink } from '@apollo/client/link/core/ApolloLink.js';
import { HttpLink } from '@apollo/client/link/http/HttpLink.js';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions/index.js';
import { getMainDefinition } from '@apollo/client/utilities/index.js';
import fetch from 'got-fetch';
import { createClient } from 'graphql-ws';
import WebSocket from 'ws';
import { GRAPHQL_API, WS_GRAPHQL_API } from '../configs.js';
import { jwtStore } from '../stores/jwt.js';

export const httpLink = new HttpLink({ fetch, uri: GRAPHQL_API });

const wsClient = createClient({
  url: WS_GRAPHQL_API,
  keepAlive: 5_000,
  connectionParams: () => ({
    authToken: jwtStore.getState().jwt,
  }),
  webSocketImpl: WebSocket,
});

export const wsLink = new GraphQLWsLink(wsClient);

export const splitLink = ApolloLink.split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  httpLink
);

export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});
