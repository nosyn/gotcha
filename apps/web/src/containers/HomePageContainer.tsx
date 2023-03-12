import { useQuery, useSubscription } from '@apollo/client';
import { Container, Loader } from '@mantine/core';
import CaptchaCard from '../components/captcha/captcha_card/CaptchaCard';
import { CaptchaAssigned } from '../graphql/document_nodes/subscriptions';
import { useUserStore } from '../store/user';
import {
  OnCaptchaAssignedData,
  AssignedCaptchaData,
  UserIdInput,
} from '../types';
import { useCaptchaStore } from '../store/captcha';
import { AssignedCaptcha } from '../graphql/document_nodes/queries';
import { notifications } from '@mantine/notifications';
import { useEffect } from 'react';

export function HomePageContainer() {
  const [user] = useUserStore(({ user }) => [user]);

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
      {user && <AssignedCaptchaSubscriptionContainer userId={+user.id} />}
      <AssignedCaptchaContainer />
    </Container>
  );
}

function AssignedCaptchaSubscriptionContainer({ userId }: { userId: number }) {
  const setAssignedCaptcha = useCaptchaStore(
    ({ setAssignedCaptcha }) => setAssignedCaptcha
  );

  const { subscribeToMore } = useQuery<AssignedCaptchaData>(AssignedCaptcha, {
    onCompleted: (data) => {
      setAssignedCaptcha(data.assignedCaptcha);
    },
    onError: (err) => {
      notifications.show({
        message: err.message,
      });
    },
  });

  useEffect(() => {
    const subscribeToMoreAssignedCaptcha = subscribeToMore<
      OnCaptchaAssignedData,
      UserIdInput
    >({
      document: CaptchaAssigned,
      onError: (err) => {
        notifications.show({
          message: err.message,
        });
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const assignedCaptcha = subscriptionData.data.captchaAssigned;

        return {
          assignedCaptcha,
        };
      },
      variables: {
        userId,
      },
    });

    return () => {
      subscribeToMoreAssignedCaptcha();
    };
  }, []);

  return null;
}

function AssignedCaptchaContainer() {
  const assignedCaptcha = useCaptchaStore(
    ({ assignedCaptcha }) => assignedCaptcha
  );

  if (!assignedCaptcha) {
    return <div>No captcha is assigned to you at the moment</div>;
  }

  return <CaptchaCard captcha={assignedCaptcha} />;
}
