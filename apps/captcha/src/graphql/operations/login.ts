import { LoginDocument, LoginInput, LoginMutation, LoginMutationVariables } from '../_generated__/graphql.js';
import { client } from '../client.js';

export const login = (input: LoginInput) =>
  client
    .request<LoginMutation, LoginMutationVariables>(LoginDocument, { input })
    .then((result) => {
      console.info(`✅ Successfully logged in as ${result.login.username}.`);
      return;
    })
    .catch((error) => {
      console.error('login error\n:', JSON.stringify(error, undefined, 2));
    });
