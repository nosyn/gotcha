import { create } from 'zustand';

type Role = 'ADMIN' | 'USER';

type User = {
  username: string;
  role: Role;
};

interface UserStore {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const useUserStore = create<UserStore>()((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
