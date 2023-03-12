import { useQuery } from '@apollo/client';
import { Container } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useCallback, useEffect } from 'react';
import CaptchaCard from '../components/captcha/captcha_card/CaptchaCard';
import { AssignedCaptcha } from '../graphql/document_nodes/queries';
import { OnAssignCaptcha } from '../graphql/document_nodes/subscriptions';
import { useUserStore } from '../store/user';
import { AssignedCaptchaQuery, OnAssignCaptchaSubscription, UserIdInput } from '../types';

export function AssignedCaptchaContainer() {
  const [user] = useUserStore(({ user }) => [user]);
  const { data, subscribeToMore, loading, error } = useQuery<AssignedCaptchaQuery>(AssignedCaptcha, {
    onError: (err) => {
      notifications.show({
        message: err.message,
      });
    },
  });

  const handleSubscribeToMore = useCallback(
    (userId: number) =>
      subscribeToMore<OnAssignCaptchaSubscription, UserIdInput>({
        document: OnAssignCaptcha,
        onError: (err) => {
          notifications.show({
            message: err.message,
          });
        },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const assignedCaptcha = subscriptionData.data.onAssignCaptcha;

          return {
            assignedCaptcha,
          };
        },
        variables: {
          userId,
        },
      }),
    [subscribeToMore]
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Errr!!!</div>;
  }

  return (
    <Container
      sx={{
        height: '100vh',
        display: 'flex',
        flex: '1 1 auto',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {user && <AssignedCaptchaSubscriptionContainer userId={+user.id} handleSubscribeToMore={handleSubscribeToMore} />}
      {data?.assignedCaptcha ? (
        <CaptchaCard captcha={data?.assignedCaptcha} />
      ) : (
        <div>No captcha is assigned to you at the moment</div>
      )}
    </Container>
  );
}

type AssignedCaptchaSubscriptionContainerProps = {
  userId: number;
  handleSubscribeToMore: (userId: number) => () => void;
};

export function AssignedCaptchaSubscriptionContainer({
  userId,
  handleSubscribeToMore,
}: AssignedCaptchaSubscriptionContainerProps) {
  useEffect(() => {
    const subscribeToMoreAssignedCaptcha = handleSubscribeToMore(userId);

    return () => {
      subscribeToMoreAssignedCaptcha();
    };
  }, [handleSubscribeToMore, userId]);

  return null;
}
