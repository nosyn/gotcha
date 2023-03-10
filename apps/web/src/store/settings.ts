import { create } from 'zustand';

interface SettingsStore {
  appInitialized: boolean;
  setAppInitialized: (appInitialized: boolean) => void;
}

export const useSettingStore = create<SettingsStore>()((set) => ({
  appInitialized: false,
  setAppInitialized: (appInitialized: boolean) => {
    set({
      appInitialized,
    });
  },
}));
