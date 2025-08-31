import { useState, useEffect } from "react";

const ADMIN_PASSWORD = "mctiers2024"; // In production, this should come from Supabase
const ADMIN_SESSION_KEY = "mctiers_admin_session";

export const useAdmin = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  useEffect(() => {
    // Check if admin session exists
    const savedSession = localStorage.getItem(ADMIN_SESSION_KEY);
    if (savedSession) {
      const session = JSON.parse(savedSession);
      const now = new Date().getTime();
      if (session.expires > now) {
        setIsAdmin(true);
      } else {
        localStorage.removeItem(ADMIN_SESSION_KEY);
      }
    }
  }, []);

  const login = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      const expirationTime = new Date().getTime() + (24 * 60 * 60 * 1000); // 24 hours
      localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify({
        expires: expirationTime
      }));
      setIsAdmin(true);
      setIsLoginOpen(false);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem(ADMIN_SESSION_KEY);
    setIsAdmin(false);
  };

  const requireAdmin = () => {
    if (!isAdmin) {
      setIsLoginOpen(true);
      return false;
    }
    return true;
  };

  return {
    isAdmin,
    isLoginOpen,
    setIsLoginOpen,
    login,
    logout,
    requireAdmin
  };
};