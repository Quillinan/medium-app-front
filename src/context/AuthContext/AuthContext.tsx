import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { AuthContextType } from '@utils/types';
import { createContext, ReactNode, useState } from 'react';

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

const deploy = true;
let clientId = import.meta.env.VITE_API_CLIENTIDDEV;
let redirectUri = import.meta.env.VITE_API_REDURLDEV;

if (deploy) {
  clientId = import.meta.env.VITE_API_CLIENTIDPROD;
  redirectUri = import.meta.env.VITE_API_REDURLPROD;
}

const msalInstance = new PublicClientApplication({
  auth: {
    clientId: clientId,
    authority: 'https://login.microsoftonline.com/gruposendas.onmicrosoft.com',
    redirectUri: redirectUri,
  },
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);

  const setAuth = (authToken: string | null) => {
    if (authToken) {
      sessionStorage.setItem('isAuthenticated', 'true');
      sessionStorage.setItem('authToken', authToken);
    } else {
      sessionStorage.removeItem('isAuthenticated');
      sessionStorage.removeItem('authToken');
    }
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
