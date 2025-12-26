// AuthContext.tsx
import { createContext, useContext, useState } from "react";

interface AuthContextType {
  username: string | null;
  setUsername: (name: string | null) => void;
}

const AuthContext = createContext<AuthContextType>({
  username: null,
  setUsername: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [username, setUsername] = useState<string | null>(null);

  return (
    <AuthContext.Provider value={{ username, setUsername }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
