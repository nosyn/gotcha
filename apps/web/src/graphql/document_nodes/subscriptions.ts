import { gql } from '@apollo/client';

export const CaptchaAssigned = gql(/* GraphQL */ `
  subscription CaptchaAssigned($userId: ID!) {
    captchaAssigned(userId: $userId) {
      id
      captchaId
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
