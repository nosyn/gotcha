import { ApolloProvider } from '@apollo/client';
import { Route, Routes } from 'react-router-dom';
import client from './graphql/client';
import Layout from './layouts/Layout';

// Hooks
import { useInitializeApp } from './hooks/useInitializeApp';

// Routes
import { NotFoundPage } from './pages/NoMatch';
import Login from './pages/Login';
import RequireAuth from './pages/RequiredAuth';
import DashboardPage from './pages/DashboardPage';

// Mantine UI Theme
import ThemeWrapper from './theme';
import HomePage from './pages/HomePage';

export default function App() {
  const { appInitialized } = useInitializeApp();

  return (
    <ApolloProvider client={client}>
      <ThemeWrapper>
        {!appInitialized ? (
          <div className="">Hellooo</div>
        ) : (
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<Layout />}>
              <Route element={<RequireAuth />}>
                <Route index path="/" element={<HomePage />} />
                <Route index path="/dashboard" element={<DashboardPage />} />
              </Route>
              {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
              routes for. */}
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        )}
      </ThemeWrapper>
    </ApolloProvider>
  );
}
