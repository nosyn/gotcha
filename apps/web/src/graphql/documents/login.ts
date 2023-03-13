import { gql } from '@apollo/client';

gql(/* GraphQL */ `
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
