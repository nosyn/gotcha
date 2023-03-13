import { LoginDocument, LoginInput, LoginMutation } from '../_generated__/graphql.js';
import { client } from '../client.js';
import { jwtStore } from '../../stores/jwt.js';

export const login = (input: LoginInput) =>
  client
    .mutate({
      mutation: LoginDocument,
      variables: {
        input,
      },
    })
    .then(({ data }: { data: LoginMutation }) => {
      console.info(`✅ Successfully logged in as ${data.login.me.username}.`);
      const { setState } = jwtStore;
      setState({
        jwt: data.login.session.jwt,
      });
    })
    .catch((error) => {
      console.error('login error:\n', JSON.stringify(error, undefined, 2));
    });
