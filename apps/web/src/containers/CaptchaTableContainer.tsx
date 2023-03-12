import { useCallback, useEffect } from 'react';
import CaptchaTable from '../components/captcha/CaptchaTable';
import { OnCreateCaptchaSubscription } from '../types';
import { OnCreateCaptcha } from '../graphql/document_nodes/subscriptions';
import { useQuery } from '@apollo/client';
import { Captchas } from '../graphql/document_nodes/queries';

export function CaptchaTableContainer() {
  const { data, error, loading, subscribeToMore } = useQuery(Captchas);

  const handleSubscribeToMore = useCallback(
    () =>
      subscribeToMore<OnCreateCaptchaSubscription>({
        document: OnCreateCaptcha,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const newCaptcha = subscriptionData.data.onCreateCaptcha;

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
