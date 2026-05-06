// src/context/AuthContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
  isAdmin: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return localStorage.getItem("ruad_admin") === "true";
  });

  const login = (username: string, password: string): boolean => {
    const validUsername = import.meta.env.VITE_ADMIN_USERNAME || "admin";
    const validPassword = import.meta.env.VITE_ADMIN_PASSWORD || "ruadacademy2026";

    if (username === validUsername && password === validPassword) {
      setIsAdmin(true);
      localStorage.setItem("ruad_admin", "true");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem("ruad_admin");
  };

  return (
    <AuthContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
