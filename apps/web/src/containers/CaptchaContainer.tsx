import { useQuery } from '@apollo/client';
import { Container } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useCallback, useEffect } from 'react';
import CaptchaCard from '../components/captcha/captcha_card/CaptchaCard';
import { gql } from '../graphql/__generated__';
import { useUserStore } from '../store/user';

const AssignedCaptcha = gql(/* GraphQL */ `
  query AssignedCaptcha {
    assignedCaptcha {
      id
      captchaId
      name
      text
      status
      updatedAt
      createdAt
    }
  }
`);

const OnAssignCaptcha = gql(/* GraphQL */ `
  subscription OnAssignCaptcha($input: OnAssignCaptchaInput!) {
    onAssignCaptcha(input: $input) {
      id
      captchaId
      text
      name
      status
      updatedAt
      createdAt
    }
  }
`);

export function AssignedCaptchaContainer() {
  const [user] = useUserStore(({ user }) => [user]);
  const { data, subscribeToMore, loading, error } = useQuery(AssignedCaptcha, {
    onError: (err) => {
      notifications.show({
        message: err.message,
      });
    },
  });

  const handleSubscribeToMore = useCallback(
    (userId: string) =>
      subscribeToMore({
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
          input: {
            userId: userId,
          },
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
      {user && <AssignedCaptchaSubscriptionContainer userId={user.id} handleSubscribeToMore={handleSubscribeToMore} />}
      {data?.assignedCaptcha ? (
        <CaptchaCard captcha={data?.assignedCaptcha} />
      ) : (
        <div>No captcha is assigned to you at the moment</div>
      )}
    </Container>
  );
}

type AssignedCaptchaSubscriptionContainerProps = {
  userId: string;
  handleSubscribeToMore: (userId: string) => () => void;
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
