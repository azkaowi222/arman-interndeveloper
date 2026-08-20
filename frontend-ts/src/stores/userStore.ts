import { create } from "zustand";
import type { User } from "../models/User";

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}

const useUserStore = create<UserState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  setUser: (newUser: User) => {
    set({
      user: newUser,
      isAuthenticated: true,
    });
  },
  clearUser: () => {
    set({
      user: null,
      isAuthenticated: false,
    });
  },
  setLoading: (loading: boolean) => {
    set({
      isLoading: loading,
    });
  },
}));

export default useUserStore;
