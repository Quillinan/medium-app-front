import { Configuration } from '@azure/msal-browser';

export const msalConfig: Configuration = {
  auth: {
    clientId: 'YOUR_CLIENT_ID', // Substitua pelo seu Client ID do Azure AD
    authority: 'https://login.microsoftonline.com/YOUR_TENANT_ID', // Substitua pelo seu Tenant ID
    redirectUri: 'http://localhost:5173', // Substitua pela sua URL de redirecionamento
  },
};
