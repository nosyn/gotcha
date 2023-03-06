import { useState } from 'react';
import {
  Navbar,
  Center,
  Tooltip,
  UnstyledButton,
  createStyles,
  Stack,
  rem,
} from '@mantine/core';
import {
  IconHome2,
  IconGauge,
  IconDeviceDesktopAnalytics,
  IconFingerprint,
  IconCalendarStats,
  IconUser,
  IconSettings,
  IconLogout,
  IconSwitchHorizontal,
} from '@tabler/icons-react';
import { MantineLogo } from '@mantine/ds';
import { notifications } from '@mantine/notifications';
import { useUserStore } from '../store/user';
import { useLocation, useNavigate } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  link: {
    width: rem(50),
    height: rem(50),
    borderRadius: theme.radius.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[5]
          : theme.colors.gray[0],
    },
  },

  active: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({
        variant: 'light',
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
        .color,
    },
  },
}));

interface NavbarLinkProps {
  icon: React.FC<any>;
  label: string;
  active?: boolean;
  onClick?(): void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
  const { classes, cx } = useStyles();

  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton
        onClick={onClick}
        className={cx(classes.link, { [classes.active]: active })}
      >
        <Icon size="1.2rem" stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

const navLinks = [
  { icon: IconHome2, label: 'Home', path: '/' },
  { icon: IconGauge, label: 'Dashboard', path: '/dashboard' },
  //   { icon: IconDeviceDesktopAnalytics, label: 'Analytics' },
  //   { icon: IconCalendarStats, label: 'Releases' },
  //   { icon: IconUser, label: 'Account' },
  //   { icon: IconFingerprint, label: 'Security' },
  //   { icon: IconSettings, label: 'Settings' },
];

export function NavbarMinimal() {
  const [setUser] = useUserStore(({ setUser }) => [setUser]);
  const [active, setActive] = useState(2);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const links = navLinks.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={link.path === pathname}
      onClick={() => navigate(link.path)}
    />
  ));

  return (
    <Navbar width={{ base: 80 }} p="md">
      <Center>
        <MantineLogo type="mark" size={30} />
      </Center>
      <Navbar.Section grow mt={50}>
        <Stack justify="center" spacing={0}>
          {links}
        </Stack>
      </Navbar.Section>
      <Navbar.Section>
        <Stack justify="center" spacing={0}>
          {/* <NavbarLink icon={IconSwitchHorizontal} label="Change account" /> */}
          <NavbarLink
            icon={IconLogout}
            label="Logout"
            onClick={async () => {
              const response = await fetch('/api/auth/logout', {
                method: 'POST',
              });

              if (!response.ok) {
                const { error } = await response.json();
                notifications.show({
                  message: error.message,
                  title: 'Fail to logout',
                  color: 'red',
                });
                return;
              }

              const { user } = await response.json();
              setUser(null);
            }}
          />
        </Stack>
      </Navbar.Section>
    </Navbar>
  );
}
