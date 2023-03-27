import { FetchResult } from '@apollo/client/link/core/types.js';
import { jwtStore } from '../../stores/jwt.js';
import { LoginInput, LoginMutation } from '../_generated__/graphql.js';
import { client } from '../client.js';
import { gql } from '../_generated__/gql.js';

const LoginDocument = gql(/* GraphQL */ `
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      me {
        id
        username
        role
        status
      }
      session {
        jwt
      }
    }
  }
`);
export const login = async (input: LoginInput) => {
  try {
    const response = await client.mutate({
      mutation: LoginDocument,
      variables: {
        input,
      },
    });

    const { data, errors }: FetchResult<LoginMutation> = response;

    if (!data?.login) {
      throw new Error('Can not login');
    }

    if (errors?.length) {
      throw errors[0];
    }

    console.info(`✅ Successfully logged in as ${data.login.me.username}.`);

    jwtStore.setState({
      jwt: data.login.session.jwt,
    });
  } catch (error) {
    console.error('login error:\n', JSON.stringify(error, undefined, 2));
  }
};
