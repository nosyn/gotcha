import { Container } from '@mantine/core';

// Containers
import { CaptchaTableContainer } from '../containers/CaptchaTableContainer';
import { UserTableContainer } from '../containers/UserTableContainer';

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
      <CaptchaTableContainer />
      <UserTableContainer />
    </Container>
  );
}
