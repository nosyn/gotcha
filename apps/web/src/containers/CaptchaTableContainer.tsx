import { useQuery } from '@apollo/client';
import { useCallback, useEffect } from 'react';
import CaptchaTable from '../components/captcha/CaptchaTable';
import { Captchas } from '../graphql/document_nodes/queries';
import { OnUpsertCaptcha } from '../graphql/document_nodes/subscriptions';
import { CaptchasData, OnUpsertCaptchaSubscription } from '../types';

export function CaptchaTableContainer() {
  const { data, error, loading, subscribeToMore } = useQuery<CaptchasData>(Captchas);

  const handleSubscribeToMore = useCallback(
    () =>
      subscribeToMore<OnUpsertCaptchaSubscription>({
        document: OnUpsertCaptcha,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const newCaptcha = subscriptionData.data.onUpsertCaptcha;

          const captchaIndex = prev.captchas.findIndex((c) => c.captchaId === newCaptcha.captchaId);

          if (captchaIndex !== -1) {
            const cloneCaptchas = [...prev.captchas];
            cloneCaptchas[captchaIndex] = newCaptcha;

            return Object.assign({}, prev, {
              captchas: cloneCaptchas,
            });
          }

          return Object.assign({}, prev, {
            captchas: [newCaptcha, ...prev.captchas],
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
