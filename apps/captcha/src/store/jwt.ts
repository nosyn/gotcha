import { createStore } from 'zustand/vanilla';

interface JwtStore {
  jwt: string;
  setJwt: (jwt: string) => void;
}

export const jwtStore = createStore<JwtStore>((set, get) => ({
  jwt: '',
  setJwt: (jwt: string) => set({ jwt }),
}));
