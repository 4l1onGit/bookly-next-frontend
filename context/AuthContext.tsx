"use client";

import { User } from "@/lib/types";
import { createContext, useState } from "react";

type AuthContextType = {
  token: string | null;
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  token: null,
  user: null,
  loading: true,
  login: async () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState(() => {
    if (typeof window === "undefined") {
      return { token: null, user: null, loading: true };
    }
    const token = localStorage.getItem("authToken");
    const email = localStorage.getItem("userEmail");
    return {
      token,
      user: token && email ? { email } : null,
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

    const { token } = await res.json();
    localStorage.setItem("authToken", token);
    localStorage.setItem("userEmail", email);
    setAuth({ token, user: { email }, loading: false }); // Will be replaced with real user data
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    setAuth({ token: null, user: null, loading: false });
  };

  const value = {
    token: auth.token,
    user: auth.user,
    loading: auth.loading,
    login,
    logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
