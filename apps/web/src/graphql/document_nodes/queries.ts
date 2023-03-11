import { gql } from '@apollo/client';

export const Me = gql(/* GraphQL */ `
  query Me {
    me {
      id
      username
      role
      status
    }
  }
`);

export const Users = gql(/* GraphQL */ `
  query Users {
    users {
      id
      username
      role
      status
    }
  }
`);
