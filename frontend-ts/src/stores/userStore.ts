import { create } from "zustand";
import type { User } from "../models/User";

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  setUser: (user: User) => void;
  clearUser: () => void;
  setLoading: (loading: boolean) => void;
}

const useUserStore = create<UserState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  setUser: (user) => {
    set({
      user,
      isAuthenticated: true,
    });
  },

  clearUser: () => {
    set({
      user: null,
      isAuthenticated: false,
    });
  },

  setLoading: (loading) => {
    set({
      isLoading: loading,
    });
  },
}));

export default useUserStore;
