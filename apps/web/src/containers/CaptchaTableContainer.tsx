import { useQuery } from '@apollo/client';
import { useCallback, useEffect } from 'react';
import CaptchaTable from '../components/captcha/CaptchaTable';
import { CaptchasData, OnUpsertCaptchaSubscription } from '../types';
import { gql } from '../graphql/__generated__';

const OnUpsertCaptcha = gql(/* GraphQL */ `
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

const Captchas = gql(/* GraphQL */ `
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
`);

export function CaptchaTableContainer() {
  const { data, error, loading, subscribeToMore } = useQuery<CaptchasData>(Captchas);

  const handleSubscribeToMore = useCallback(
    () =>
      subscribeToMore<OnUpsertCaptchaSubscription>({
        document: OnUpsertCaptcha,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const receivedCaptcha = subscriptionData.data.onUpsertCaptcha;

          const captchaIndex = prev.captchas.findIndex((c) => c.captchaId === receivedCaptcha.captchaId);

          if (captchaIndex !== -1) {
            const cloneCaptchas = [...prev.captchas];
            cloneCaptchas[captchaIndex] = receivedCaptcha;

            return Object.assign({}, prev, {
              captchas: cloneCaptchas,
            });
          }

          return Object.assign({}, prev, {
            captchas: [receivedCaptcha, ...prev.captchas],
          });
        },
      }),
    [subscribeToMore]
  );

  if (loading || !data?.captchas.length) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Errr!!!</div>;
  }

  return (
    <>
      <CaptchaTableSubscriptionContainer handleSubscribeToMore={handleSubscribeToMore} />
      <CaptchaTable rows={data.captchas || []} />
    </>
  );
}

type CaptchaTableSubscriptionContainerProps = {
  handleSubscribeToMore: () => () => void;
};

export function CaptchaTableSubscriptionContainer({ handleSubscribeToMore }: CaptchaTableSubscriptionContainerProps) {
  useEffect(() => {
    const subscribeToMoreAssignedCaptcha = handleSubscribeToMore();

    return () => {
      subscribeToMoreAssignedCaptcha();
    };
  }, [handleSubscribeToMore]);

  return null;
}
