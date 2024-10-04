import { Configuration } from '@azure/msal-browser';

export const msalConfig: Configuration = {
  auth: {
    clientId: 'YOUR_CLIENT_ID', // Application (client) ID do Azure
    authority: 'https://login.microsoftonline.com/YOUR_TENANT_ID', // Directory (tenant) ID
    redirectUri: 'http://localhost:5173', // URL para onde o usuário será redirecionado após o login
  },
  cache: {
    cacheLocation: 'sessionStorage', // Altere para "localStorage" se preferir
    storeAuthStateInCookie: false, // Ative se houver problemas com navegadores antigos
  },
};
