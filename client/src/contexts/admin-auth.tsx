import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

interface AdminAuthContextType {
  isAuthenticated: boolean;
  login: (passcode: string) => boolean;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

const ADMIN_PASSCODE = "202512";
const AUTH_STORAGE_KEY = "bright-admin-auth";

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedAuth = sessionStorage.getItem(AUTH_STORAGE_KEY);
    if (storedAuth === "authenticated") {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (passcode: string): boolean => {
    if (passcode === ADMIN_PASSCODE) {
      setIsAuthenticated(true);
      sessionStorage.setItem(AUTH_STORAGE_KEY, "authenticated");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
  };

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
}
