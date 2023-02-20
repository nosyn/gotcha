import { ApolloClient, InMemoryCache, gql } from '@apollo/client/core/index.js';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache({
    resultCaching: false,
  }),
});

enum CaptchaStatus {
  CREATED = 'CREATED',
  RESOLVING = 'RESOLVING',
  RESOLVED = 'RESOLVED',
}

type Captcha = {
  id: string;
  name: string;
  status: CaptchaStatus;
};

export const createCaptcha = (input: Captcha) =>
  client
    .query({
      query: gql`
        query CreateCaptcha {
          createCaptcha {
                id: ID!
    name: ID!
    status: Status!
    createdAt: String!
    updatedAt: String!
          }
        }
      `,
    })
    .then((result) => console.log(result));
