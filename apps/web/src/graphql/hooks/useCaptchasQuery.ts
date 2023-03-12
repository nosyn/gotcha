import { gql, useQuery } from '@apollo/client';
import { CaptchasData } from '../../types';

export const CaptchasQuery = gql`
  query Captchas {
    captchas {
      id
      captchaId
      text
      status
      name
      createdAt
      updatedAt
    }
  }
`;

export default function useCaptchasQuery() {
  return useQuery<CaptchasData>(CaptchasQuery);
}
