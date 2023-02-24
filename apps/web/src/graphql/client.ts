import { ApolloClient, InMemoryCache } from '@apollo/client';
import { splitLink } from './splitLink';

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache({
    resultCaching: false,
  }),
  defaultOptions: {
    mutate: {
      fetchPolicy: 'network-only',
    },
    query: {
      fetchPolicy: 'network-only',
    },
    watchQuery: {
      fetchPolicy: 'network-only',
    },
  },
});

export default client;
