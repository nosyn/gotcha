import { Container } from '@mantine/core';
import {
  AssignedCaptchaContainer,
  AssignedCaptchaSubscriptionContainer,
} from '../containers/HomePageContainer';
import { useUserStore } from '../store/user';

export default function HomePage() {
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
