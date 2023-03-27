import { gql } from '../_generated__/gql.js';

gql(/* GraphQL */ `
  subscription OnUpsertCaptcha($input: OnUpsertCaptchaInput) {
    onUpsertCaptcha(input: $input) {
      id
      captchaId
      name
      text
      status
      createdAt
      updatedAt
    }
  }
`);
