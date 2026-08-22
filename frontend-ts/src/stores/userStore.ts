import { create } from "zustand";
import type { User } from "../models/User";
import { persist } from "zustand/middleware";

interface UserState {
  user: User | null;
  userId: number | null;
  setUser: (user: User) => void;
  clearUser: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      userId: null,
      isAuthenticated: false,
      isLoading: true,
      setUser: (newUser: User) => {
        set({
          user: newUser,
          userId: +newUser.id,
          isAuthenticated: true,
        });
      },
      clearUser: () => {
        set({
          user: null,
          userId: null,
          isAuthenticated: false,
        });
      },
      setLoading: (loading: boolean) => {
        set({
          isLoading: loading,
        });
      },
    }),
    {
      name: "user-storage",
      partialize: (state) => ({
        userId: state.userId,
      }),
    },
  ),
);

export default useUserStore;
