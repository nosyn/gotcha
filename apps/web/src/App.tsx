import { ApolloProvider } from '@apollo/client';
import client from './graphql/client';
import Layout from './layouts/Layout';
import CaptchaPage from './pages/CaptchaPage';

function App() {
  return (
    <ApolloProvider client={client}>
      <Layout>
        <CaptchaPage />
      </Layout>
    </ApolloProvider>
  );
}

export default App;
