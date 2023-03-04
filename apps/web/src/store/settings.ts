import { create } from 'zustand';

interface SettingsStore {
  appInitialized: boolean;
}

export const useSettingStore = create<SettingsStore>()((set) => ({
  appInitialized: false,
}));
