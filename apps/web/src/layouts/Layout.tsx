import { AppShell, MantineTheme } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import { NavbarMinimal } from '../components/Navbar';

export default function Layout() {
  return (
    <AppShell
      padding="md"
      navbar={<NavbarMinimal />}
      styles={(theme: MantineTheme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      <Outlet />
    </AppShell>
  );
}
