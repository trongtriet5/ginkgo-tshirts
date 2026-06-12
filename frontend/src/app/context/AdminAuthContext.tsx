'use client';

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';

interface AdminUser {
  id: number;
  username: string;
  displayName: string;
}

interface AdminAuthContextType {
  token: string | null;
  user: AdminUser | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType>({
  token: null,
  user: null,
  login: async () => {},
  logout: () => {},
  isAuthenticated: false,
});

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AdminUser | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('admin_token');
    if (saved) {
      setToken(saved);
      fetch('http://localhost:3333/admin/me', {
        headers: { Authorization: `Bearer ${saved}` },
      })
        .then((r) => r.ok ? r.json() : Promise.reject())
        .then((u) => setUser(u))
        .catch(() => { localStorage.removeItem('admin_token'); setToken(null); });
    }
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    const res = await fetch('http://localhost:3333/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: 'Login failed' }));
      throw new Error(err.message || 'Login failed');
    }
    const data = await res.json();
    localStorage.setItem('admin_token', data.token);
    setToken(data.token);
    const meRes = await fetch('http://localhost:3333/admin/me', {
      headers: { Authorization: `Bearer ${data.token}` },
    });
    if (meRes.ok) {
      setUser(await meRes.json());
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('admin_token');
    setToken(null);
    setUser(null);
  }, []);

  return (
    <AdminAuthContext.Provider value={{ token, user, login, logout, isAuthenticated: !!token }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  return useContext(AdminAuthContext);
}
