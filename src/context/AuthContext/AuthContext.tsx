import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { AuthContextType } from '@utils/Types/Types';
import { createContext, ReactNode, useState } from 'react';

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

const deploy = import.meta.env.VITE_API_PROD;
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
  const [uniqueId, setUniqueId] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);

  const setAuth = (
    authToken: string | null,
    authUniqueId: string | null,
    authName: string | null
  ) => {
    if (authToken) {
      sessionStorage.setItem('isAuthenticated', 'true');
      sessionStorage.setItem('authToken', authToken);
      sessionStorage.setItem('uniqueId', authUniqueId || '');
      sessionStorage.setItem('name', authName || '');
    } else {
      sessionStorage.removeItem('isAuthenticated');
      sessionStorage.removeItem('authToken');
      sessionStorage.removeItem('uniqueId');
      sessionStorage.removeItem('name');
    }
    setToken(authToken);
    setUniqueId(authUniqueId);
    setName(authName);
  };

  const removeAuth = () => {
    sessionStorage.removeItem('isAuthenticated');
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('uniqueId');
    sessionStorage.removeItem('name');
    setToken(null);
    setUniqueId(null);
    setName(null);
  };

  return (
    <AuthContext.Provider
      value={{ setAuth, removeAuth, token, uniqueId, name }}
    >
      <MsalProvider instance={msalInstance}>{children}</MsalProvider>
    </AuthContext.Provider>
  );
};
