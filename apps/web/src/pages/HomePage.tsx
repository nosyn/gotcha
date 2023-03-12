import { Container } from '@mantine/core';
import { HomePageContainer } from '../containers/HomePageContainer';

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
      <HomePageContainer />
    </Container>
  );
}
