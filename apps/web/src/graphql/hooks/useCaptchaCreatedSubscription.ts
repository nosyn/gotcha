import { gql, useSubscription } from '@apollo/client';
import { CaptchasData } from '../../types';

export const CaptchaCreated = gql`
  subscription CaptchaCreated {
    captchaCreated {
      createdAt
      id
      name
      status
      updatedAt
    }
  }
`;

export default function useCaptchaCreatedSubscription() {
  return useSubscription<CaptchasData>(CaptchaCreated);
}
