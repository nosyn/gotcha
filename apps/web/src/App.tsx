import { ApolloProvider } from '@apollo/client';
import client from './graphql/client';

// Mantine UI Theme
import AppRouter from './router/AppRouter';
import ThemeWrapper from './theme';

export default function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeWrapper>
        <AppRouter />
      </ThemeWrapper>
    </ApolloProvider>
  );
}
