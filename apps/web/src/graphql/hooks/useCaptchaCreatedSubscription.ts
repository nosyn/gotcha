import { gql, useSubscription } from '@apollo/client';
import { CaptchasData } from '../../types';

export const CaptchaCreated = gql`
  subscription CaptchaCreated {
    captchaCreated {
      id
      captchaId
      name
      status
      createdAt
      updatedAt
    }
  }
`;

export default function useCaptchaCreatedSubscription() {
  return useSubscription<CaptchasData>(CaptchaCreated);
}
