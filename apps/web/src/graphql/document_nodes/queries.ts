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

export const Users = gql(/* GraphQL */ `
  query Users {
    users {
      id
      username
      role
      online
    }
  }
`);
