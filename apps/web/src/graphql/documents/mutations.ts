import { gql } from '@apollo/client';

export const UpdateCaptcha = gql(/* GraphQL */ `
  mutation UpdateCaptcha($input: ResolveCaptchaInput!) {
    resolveCaptcha(input: $input) {
      id
      captchaId
      text
      name
      status
      createdAt
      updatedAt
    }
  }
`);
