import { useSubscription } from '@apollo/client';
import { Container, Loader } from '@mantine/core';
import CaptchaCard from '../components/captcha/captcha_card/CaptchaCard';
import { CaptchaAssigned } from '../graphql/document_nodes/subscriptions';
import { useUserStore } from '../store/user';
import { CaptchaAssignedData, UserIdInput } from '../types';

export default function HomePage() {
  const [user] = useUserStore(({ user }) => [user]);

  const { data, error, loading } = useSubscription<
    CaptchaAssignedData,
    UserIdInput
  >(CaptchaAssigned, {
    variables: {
      userId: !user?.id ? -1 : +user.id,
    },
    skip: !user?.id,
  });

  if (error) {
    console.error('Error occurred: ', error);
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
      {error ? (
        <div>Error</div>
      ) : loading ? (
        <Loader />
      ) : data?.captchaAssigned ? (
        <CaptchaCard captcha={data.captchaAssigned} />
      ) : (
        <div>No data</div>
      )}
    </Container>
  );
}
