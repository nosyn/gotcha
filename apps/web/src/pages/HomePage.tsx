import { Container } from '@mantine/core';
import { AssignedCaptchaContainer } from '../containers/CaptchaContainer';
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
      <AssignedCaptchaContainer />
    </Container>
  );
}
