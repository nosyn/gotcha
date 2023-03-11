import { Container } from '@mantine/core';

// Containers
import { CaptchasTableContainer } from '../containers/CaptchasTableContainer';
import { UsersTableContainer } from '../containers/UsersTableContainer';

export default function DashboardPage() {
  return (
    <Container
      sx={(theme) => ({
        backgroundColor: theme.colors.gray[2],
        display: 'flex',
        gap: '1rem',
        marginTop: '3rem',
        padding: '1rem',
      })}
      fluid
    >
      <CaptchasTableContainer />
      <UsersTableContainer />
    </Container>
  );
}
