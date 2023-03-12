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

export const AssignedCaptcha = gql(/* GraphQL */ `
  query AssignedCaptcha {
    assignedCaptcha {
      id
      captchaId
      name
      text
      status
      updatedAt
      createdAt
    }
  }
`);

export const Captchas = gql`
  query Captchas {
    captchas {
      id
      captchaId
      text
      status
      name
      createdAt
      updatedAt
    }
  }
`;
