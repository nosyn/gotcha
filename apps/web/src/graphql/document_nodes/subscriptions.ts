import { gql } from '@apollo/client';

export const OnAssignCaptcha = gql(/* GraphQL */ `
  subscription OnAssignCaptcha($userId: ID!) {
    onAssignCaptcha(userId: $userId) {
      id
      captchaId
      text
      name
      status
      updatedAt
      createdAt
    }
  }
`);

export const OnUserUpdated = gql(/* GraphQL */ `
  subscription OnUserUpdated($input: OnUserUpdatedInput!) {
    onUserUpdated(input: $input) {
      id
      username
      role
      status
    }
  }
`);

export const OnCreateCaptcha = gql`
  subscription OnCreateCaptcha {
    onCreateCaptcha {
      id
      captchaId
      name
      text
      status
      createdAt
      updatedAt
    }
  }
`;
