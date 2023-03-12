import { gql } from '@apollo/client';

export const UpdateCaptcha = gql(/* GraphQL */ `
  mutation UpdateCaptcha($input: UpdateCaptchaInput!) {
    createCaptcha(input: $input) {
      id
      captchaId
      name
      status
      createdAt
      updatedAt
    }
  }
`);
