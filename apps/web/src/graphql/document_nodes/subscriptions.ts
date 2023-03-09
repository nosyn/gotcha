import { gql } from '@apollo/client';

export const CaptchaAssigned = gql`
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
`;
