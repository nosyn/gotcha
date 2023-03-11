import { gql } from '@apollo/client';

export const Me = gql(/* GraphQL */ `
  query Me {
    me {
      id
      username
      role
      online
    }
  }
`);
