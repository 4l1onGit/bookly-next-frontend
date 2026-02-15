"use client";

import { User } from "@/lib/types";
import { createContext, useState } from "react";

type AuthContextType = {
  token: string | null;
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string) => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
  token: null,
  user: null,
  loading: true,
  login: async () => {},
  logout: () => {},
  register: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState(() => {
    if (typeof window === "undefined") {
      return { token: null, user: null, loading: true };
    }
    const token = localStorage.getItem("authToken");
    const user = localStorage.getItem("user");
    return {
      token,
      user: token && user ? JSON.parse(user) : null,
      loading: false,
    };
  });

  const login = async (email: string, password: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      throw new Error("Login failed");
    }
    const data = await res.json();

    const { token, user } = data;

    localStorage.setItem("authToken", token);
    localStorage.setItem("user", JSON.stringify(user));
    setAuth({ token, user, loading: false }); // Will be replaced with real user data
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setAuth({ token: null, user: null, loading: false });
  };

  const register = async (email: string, password: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      throw new Error("Registration failed");
    }

    login(email, password);
  };

  const value = {
    token: auth.token,
    user: auth.user,
    loading: auth.loading,
    login,
    logout,
    register,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
