import { gql } from '../_generated__/gql.js';

gql(/* GraphQL */ `
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      me {
        id
        username
        role
        status
      }
      session {
        jwt
      }
    }
  }
`);

gql(/* GraphQL */ `
  mutation CreateCaptcha($input: CreateCaptchaInput!) {
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
