import { Container } from '@mantine/core';
import { AssignedCaptchaContainer } from '../containers/CaptchaContainer';

export default function HomePage() {
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
