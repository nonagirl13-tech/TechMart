"use client";

import { createContext, useEffect, useState } from "react";

// ✅ التعديل هنا: أضفنا كلمة export عشان نقدر نستخدمه في ملفات تانية
export type AuthContextType = {
  user: any;
  token: string | null;
  login: (userData: any, userToken: string) => void;
  logout: () => void;
  loading: boolean;
  isLoggedIn: boolean;
};

export const authContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // 🧠 Load from localStorage on mount
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("user");
      const savedToken = localStorage.getItem("token");

      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }

      if (savedToken) {
        setToken(savedToken);
      }
    } catch (error) {
      console.log("Error loading auth data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // 🔐 LOGIN
  function login(userData: any, userToken: string) {
    setUser(userData);
    setToken(userToken);

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", userToken);
  }

  // 🚪 LOGOUT
  function logout() {
    setUser(null);
    setToken(null);

    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }

  return (
    <authContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        loading,
        isLoggedIn: !!token,
      }}
    >
      {children}
    </authContext.Provider>
  );
}