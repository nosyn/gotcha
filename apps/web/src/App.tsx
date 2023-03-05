import { ApolloProvider } from '@apollo/client';
import { Route, Routes } from 'react-router-dom';
import client from './graphql/client';
import Layout from './layouts/Layout';

// Routes
import CaptchaPage from './routes/Captcha';
import Login from './routes/Login';
import { NotFoundPage } from './routes/NoMatch';
import RequireAuth from './routes/RequiredAuth';
import { useInitializeApp } from './hooks/useInitializeApp';

// Mantine UI Theme
import ThemeWrapper from './theme';

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
                <Route index path="/" element={<CaptchaPage />} />
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
