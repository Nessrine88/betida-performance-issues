import { create } from "zustand";
import { persist } from "zustand/middleware";

export type User = {
  username: string;
  email: string;
  vipProgress: number;
  level: string;
  nextLevel: string;
  showPopupItem: boolean;
};

interface AuthState {
  user: User | null;
  loaded: boolean;
  setUser: (user: User) => void;
  clearUser: () => void;
  setLoaded: (value: boolean) => void;
}

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      user: null,
      loaded: false,

      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
      setLoaded: (value) => set({ loaded: value }),
    }),
    {
      name: "auth-storage",
      // This callback runs once rehydration from localStorage is complete
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setLoaded(true);
        }
      },
    }
  )
);
