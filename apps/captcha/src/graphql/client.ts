import {
  ApolloClient,
  InMemoryCache,
  gql,
  HttpLink,
} from '@apollo/client/core/index.js';
//
import fetch from 'got-fetch';

const client = new ApolloClient({
  link: new HttpLink({ fetch, uri: 'http://localhost:8080/api/graphql' }),

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

export type CaptchaStatus = 'CREATED' | 'RESOLVING' | 'RESOLVED';

type CaptchaInput = {
  id: string;
  name: string;
  status: CaptchaStatus;
};

export const createCaptcha = (input: CaptchaInput) =>
  client
    .mutate({
      mutation: gql`
        mutation CreateCaptcha($input: CaptchaInput!) {
          createCaptcha(input: $input) {
            id
            name
            status
            createdAt
            updatedAt
          }
        }
      `,
      variables: {
        input,
      },
    })
    .then((result) => {
      if (result.errors?.length) {
        for (const error in result.errors) {
          console.error(
            'Error occurred while creating captcha request: ',
            error
          );
        }
      }
      if (result.data) {
        console.info(
          `✅ Successfully create captcha ${result.data.createCaptcha.id} request to server.`
        );
        return;
      }
    })
    .catch((err) => {
      console.log('err: ', err);
    });
