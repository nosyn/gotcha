import { gql } from '@apollo/client';

export const CaptchaAssigned = gql`
  subscription CaptchaAssigned($id: ID!) {
    captchaAssigned(id: $id) {
      createdAt
      id
      name
      status
      updatedAt
    }
  }
`;
