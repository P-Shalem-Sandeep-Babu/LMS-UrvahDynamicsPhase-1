import { createContext, useContext, useState, ReactNode } from "react";
import { User, mockUsers, Role } from "../data/mock";

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  switchRole: (role: Role) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Start with no user to simulate needing to login
  const [user, setUser] = useState<User | null>(null);

  const switchRole = (role: Role) => {
    setUser(mockUsers[role]);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, switchRole, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

