import { ApolloProvider } from '@apollo/client';
import { Route, Routes } from 'react-router-dom';
import client from './graphql/client';
import Layout from './layouts/Layout';

// Hooks
import { useInitializeApp } from './hooks/useInitializeApp';

// Routes
import DashboardPage from './pages/DashboardPage';
import Login from './pages/Login';
import { NotFoundPage } from './pages/NoMatch';
import RequireAuth from './routes/RequiredAuth';

// Mantine UI Theme
import HomePage from './pages/HomePage';
import RequireAdmin from './routes/RequireAdmin';
import ThemeWrapper from './theme';
import { Container } from '@mantine/core';

export default function App() {
  const { appInitialized } = useInitializeApp();

  return (
    <ApolloProvider client={client}>
      <ThemeWrapper>
        {!appInitialized ? (
          <div className="">Initializing app</div>
        ) : (
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />

            <Route element={<Layout />}>
              {/* User role routes */}
              <Route element={<RequireAuth />}>
                <Route index path="/" element={<HomePage />} />
              </Route>

              {/* Admin role routes */}
              <Route element={<RequireAdmin />}>
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
