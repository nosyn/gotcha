import { gql, useMutation } from '@apollo/client';
import { CaptchaData, CaptchaInput } from '../../types';

const UpdateCaptchaMutation = gql`
  mutation UpdateCaptcha($input: CaptchaInput!) {
    updateCaptcha(input: $input) {
      id
      name
      status
      createdAt
      updatedAt
    }
  }
`;

export default function useUpdateCaptchaMutation() {
  return useMutation<CaptchaData, CaptchaInput>(UpdateCaptchaMutation);
}
