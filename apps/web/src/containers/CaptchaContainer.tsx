import { useQuery } from '@apollo/client';
import { notifications } from '@mantine/notifications';
import { useEffect } from 'react';
import CaptchaCard from '../components/captcha/captcha_card/CaptchaCard';
import { AssignedCaptcha } from '../graphql/document_nodes/queries';
import { CaptchaAssigned } from '../graphql/document_nodes/subscriptions';
import { useCaptchaStore } from '../store/captcha';
import { AssignedCaptchaData, OnCaptchaAssignedData, UserIdInput } from '../types';

export function AssignedCaptchaContainer() {
  const assignedCaptcha = useCaptchaStore(({ assignedCaptcha }) => assignedCaptcha);

  if (!assignedCaptcha) {
    return <div>No captcha is assigned to you at the moment</div>;
  }

  return <CaptchaCard captcha={assignedCaptcha} />;
}

type AssignedCaptchaSubscriptionContainerProps = {
  userId: number;
};
export function AssignedCaptchaSubscriptionContainer({ userId }: AssignedCaptchaSubscriptionContainerProps) {
  const setAssignedCaptcha = useCaptchaStore(({ setAssignedCaptcha }) => setAssignedCaptcha);

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
    const subscribeToMoreAssignedCaptcha = subscribeToMore<OnCaptchaAssignedData, UserIdInput>({
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
