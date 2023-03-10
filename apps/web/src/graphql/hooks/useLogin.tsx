import { gql, useMutation } from '@apollo/client';
import { LoginData, LoginInput } from '../../types';

export const LoginMutation = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      id
      username
      role
      online
    }
  }
`;

export default function useLoginMutation() {
  return useMutation<LoginData, LoginInput>(LoginMutation);
}
