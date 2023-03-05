import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useUserStore } from '../store/user';
import { useSettingStore } from '../store/settings';

export const useInitializeApp = () => {
  const [appInitialized, setAppInitialized] = useSettingStore(
    ({ appInitialized, setAppInitialized }) => [
      appInitialized,
      setAppInitialized,
    ]
  );
  const [setUser] = useUserStore(({ setUser }) => [setUser]);

  useEffect(() => {
    const initializeApp = async () => {
      const response = await fetch('/api/auth/me');

      if (!response.ok) {
        console.log('Not authenticated. Navigate to login page ');
      }

      const { user } = await response.json();

      if (user) {
        setUser(user);
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
