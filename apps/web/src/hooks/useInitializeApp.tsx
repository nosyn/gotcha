import { useEffect } from 'react';
import { useUserStore } from '../store/user';
import { useSettingStore } from '../store/settings';
import { useStore } from 'zustand';
import { jwtStore } from '../store/jwt';

export const useInitializeApp = () => {
  const [appInitialized, setAppInitialized] = useSettingStore(
    ({ appInitialized, setAppInitialized }) => [
      appInitialized,
      setAppInitialized,
    ]
  );
  const [setUser] = useUserStore(({ setUser }) => [setUser]);
  const [setJwt] = useStore(jwtStore, ({ setJwt }) => [setJwt]);

  useEffect(() => {
    const initializeApp = async () => {
      const response = await fetch('/api/auth/me');

      if (response.ok) {
        const { user = null, jwt = '' } = await response.json();
        setUser(user);
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
