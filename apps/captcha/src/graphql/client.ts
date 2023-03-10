import { ApolloClient, InMemoryCache, gql } from '@apollo/client/core/index.js';
import { HttpLink } from '@apollo/client/link/http/index.js';

//
import fetch from 'got-fetch';
import { GRAPHQL_API } from '../configs.js';

const client = new ApolloClient({
  link: new HttpLink({ fetch, uri: GRAPHQL_API }),

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
  captchaId: string;
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
            captchaId
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
