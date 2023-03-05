import { ApolloProvider } from '@apollo/client';
import { Route, Routes } from 'react-router-dom';
import client from './graphql/client';
import Layout from './layouts/Layout';

// Routes
import CaptchaPage from './routes/Captcha';
import Login from './routes/Login';
import NoMatch from './routes/NoMatch';
import RequireAuth from './routes/RequiredAuth';
import { useInitializeApp } from './hooks/useInitializeApp';
import { Toaster } from 'react-hot-toast';

export default function App() {
  const { appInitialized } = useInitializeApp();
  return (
    <ApolloProvider client={client}>
      {!appInitialized ? (
        <div className="">Hellooo</div>
      ) : (
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/login" element={<Login />} />
            <Route element={<RequireAuth />}>
              <Route index path="/" element={<CaptchaPage />} />
            </Route>
            {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
              routes for. */}
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      )}

      {/* Toaster */}
      <Toaster
        position="bottom-right"
        toastOptions={{
          error: {
            className: 'bg-indigo-500',
          },
        }}
      />
    </ApolloProvider>
  );
}
