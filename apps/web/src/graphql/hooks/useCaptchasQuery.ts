import { gql, useQuery } from '@apollo/client';
import { CaptchasData } from '../../types';

const CaptchasQuery = gql`
  query Captchas {
    captchas {
      id
      name
      status
      createdAt
      updatedAt
    }
  }
`;

export default function useCaptchasQuery() {
  return useQuery<CaptchasData>(CaptchasQuery);
}
