import { useStore } from 'zustand';
import { useEffect, useState } from 'react';
import { useUserStore } from '../store/user';
import { jwtStore } from '../store/jwt';
import { useQuery } from '@apollo/client';

import { Me } from '../graphql/document_nodes/queries';

export const useInitializeApp = () => {
  // App states
  const [appInitialized, setAppInitialized] = useState(false);
  const [setUser] = useUserStore(({ setUser }) => [setUser]);
  const [setJwt] = useStore(jwtStore, ({ setJwt }) => [setJwt]);

  // GraphQL
  useQuery(Me, {
    onCompleted: (data) => {
      console.log('data: ', data.me);
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

  return {
    appInitialized,
  };
};
