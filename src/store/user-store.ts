import { create } from "zustand";

interface User {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
  [key: string]: any; 
}

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
  updateUserField: (field: keyof User, value: any) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,

  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
  updateUserField: (field, value) =>
    set((state) => ({
      user: state.user ? { ...state.user, [field]: value } : null,
    })),
}));
