// Mantine UI
import { Notifications } from '@mantine/notifications';
import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function ThemeWrapper({ children }: Props) {
  return (
    <MantineProvider theme={{ primaryColor: 'indigo' }} withGlobalStyles withNormalizeCSS>
      {children}
      <Notifications position="top-center" />
    </MantineProvider>
  );
}
