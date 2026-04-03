import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { loginUser, type User } from '../api/dataService';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('mc_user');
    if (saved) {
      try { setUser(JSON.parse(saved)); } catch { localStorage.removeItem('mc_user'); }
    }
    setLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    const { user } = await loginUser(username, password);
    setUser(user);
    localStorage.setItem('mc_user', JSON.stringify(user));
    localStorage.setItem('mc_token', user.role + '-' + Date.now());
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mc_user');
    localStorage.removeItem('mc_token');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
