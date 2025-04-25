// src/stores/authStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User as FirebaseUser } from "firebase/auth";

type Role = "admin" | "customer"; // ✅ Define posibles roles

interface User {
  uid: string;
  email: string | null;
  name?: string;
  role: Role;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (userData: Partial<User> & { uid: string; email: string | null }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (userData) =>
        set({
          user: {
            uid: userData.uid,
            email: userData.email,
            name: userData.name,
            role: userData.role ?? "customer", // ✅ usa "customer" por defecto
          },
          isAuthenticated: true,
        }),
      logout: () =>
        set({
          user: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: "auth-storage",
    }
  )
);
