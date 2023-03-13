import {
  Anchor,
  Button,
  Checkbox,
  Container,
  Group,
  MantineTheme,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useStore } from 'zustand';
import { jwtStore } from '../store/jwt';
import { useUserStore } from '../store/user';

const schema = z.object({
  username: z
    .string()
    .min(4, { message: 'Username should have at least 4 letters' }),
  password: z
    .string()
    .min(4, { message: 'Password must should have at least 4 characters' }),
});

export default function Login() {
  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },

    validate: zodResolver(schema),
  });
  const [user, setUser] = useUserStore(({ user, setUser }) => [user, setUser]);
  const [setJwt] = useStore(jwtStore, ({ setJwt }) => [setJwt]);
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    if (!user) return;

    // Send user back to the page they tried to visit when they were
    // redirected to the login page. Use { replace: true } so we don't create
    // another entry in the history stack for the login page.  This means that
    // when they get to the protected page and click the back button, they
    // won't end up back on the login page, which is also really nice for the
    // user experience.
    navigate(from, { replace: true });
  }, [user]);

  const handleOnSubmit = () =>
    form.onSubmit(async (values) => {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const { error } = await response.json();
        notifications.show({
          message: error.message,
          title: 'Login error',
          color: 'red',
        });
        return;
      }

      const { user, jwt } = await response.json();

      setUser(user);
      setJwt(jwt);
    });

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
      <form onSubmit={handleOnSubmit()}>
        <Title
          align="center"
          sx={(theme: MantineTheme) => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 900,
          })}
        >
          Welcome back!
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Do not have an account yet?{' '}
          <Anchor size="sm" component="button">
            Create account
          </Anchor>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput
            label="Username"
            placeholder="john_doe"
            {...form.getInputProps('username')}
          />
          <PasswordInput
            label="Password"
            placeholder="super_password"
            mt="md"
            {...form.getInputProps('password')}
          />
          <Group position="apart" mt="lg">
            <Checkbox label="Remember me" />
            <Anchor component="button" size="sm">
              Forgot password?
            </Anchor>
          </Group>
          <Button fullWidth mt="xl" type="submit">
            Sign in
          </Button>
        </Paper>
      </form>
    </Container>
  );
}
