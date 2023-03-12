import { gql } from '@apollo/client';

export const OnAssignCaptcha = gql(/* GraphQL */ `
  subscription OnAssignCaptcha($input: OnAssignCaptchaInput!) {
    onAssignCaptcha(input: $input) {
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

export const OnUpdateUser = gql(/* GraphQL */ `
  subscription OnUpdateUser($input: OnUpdateUserInput!) {
    onUpdateUser(input: $input) {
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
