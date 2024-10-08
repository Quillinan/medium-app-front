import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { createContext, ReactNode, useContext, useState } from 'react';

interface AuthContextType {
  setAuth: (token: string | null) => void;
  removeAuth: () => void;
  token: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const msalInstance = new PublicClientApplication({
  auth: {
    clientId: '1efce811-7a11-4e35-98a8-d85f7b169637',
    authority: 'https://login.microsoftonline.com/gruposendas.onmicrosoft.com',
    redirectUri: 'http://localhost:5173/home',
  },
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);

  const setAuth = (authToken: string | null) => {
    sessionStorage.setItem('isAuthenticated', 'true');
    sessionStorage.setItem('authToken', authToken || '');
    setToken(authToken);
  };

  const removeAuth = () => {
    sessionStorage.removeItem('isAuthenticated');
    sessionStorage.removeItem('authToken');
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ setAuth, removeAuth, token }}>
      <MsalProvider instance={msalInstance}>{children}</MsalProvider>
    </AuthContext.Provider>
  );
};
