import { create } from 'zustand';

type User = {
  username: string;
};

interface UserStore {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const useUserStore = create<UserStore>()((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
