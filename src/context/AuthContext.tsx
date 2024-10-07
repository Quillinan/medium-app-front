import { createContext, ReactNode, useContext } from 'react';

interface AuthContextType {
  setAuth: () => void;
  removeAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const setAuth = () => {
    sessionStorage.setItem('isAuthenticated', 'true');
  };

  const removeAuth = () => {
    sessionStorage.removeItem('isAuthenticated');
  };

  return (
    <AuthContext.Provider value={{ setAuth, removeAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
