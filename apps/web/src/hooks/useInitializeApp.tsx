import { useStore } from 'zustand';
import { useEffect, useState } from 'react';
import { useUserStore } from '../store/user';
import { jwtStore } from '../store/jwt';
import { useQuery } from '@apollo/client';

import { Me } from '../graphql/document_nodes/queries';
import { OnUserUpdated } from '../graphql/document_nodes/subscriptions';

export const useInitializeApp = () => {
  // App states
  const [appInitialized, setAppInitialized] = useState(false);
  const [setUser] = useUserStore(({ setUser }) => [setUser]);
  const [setJwt] = useStore(jwtStore, ({ setJwt }) => [setJwt]);

  // GraphQL
  const { data, subscribeToMore } = useQuery(Me, {
    onCompleted: (data) => {
      setUser(data.me);
    },
    onError: (err) => {
      // console.error('err: ', err);
      setAppInitialized(true);
    },
  });

  useEffect(() => {
    const initializeApp = async () => {
      const response = await fetch('/api/auth/me');

      if (response.ok) {
        const { user = null, jwt = '' } = await response.json();
        // setUser(user);
        setJwt(jwt);
      }

      setAppInitialized(true);
    };

    if (!appInitialized) {
      initializeApp();
    }
  }, [appInitialized]);

  useEffect(() => {
    let onUserUpdated;

    if (data?.me) {
      setTimeout(() => {
        setUser(data.me);
        onUserUpdated = subscribeToMore({
          document: OnUserUpdated,
          updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data) return prev;
            // const me = subscriptionData.data.onUserUpdated;
            // setUser(me);
            // return me;
          },
          variables: {
            input: {
              userId: '1',
            },
          },
        });
      }, 5000);
    }
  }, [data]);

  return {
    appInitialized,
  };
};
