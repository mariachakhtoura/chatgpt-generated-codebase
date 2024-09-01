export const oauthConfig = {
    clientId: 'graphql',
    clientSecret: '06BD941-1437-402C-A09F-A9BDA23044BD',  // Only needed for server-side, avoid using it in client-side apps
    authorizeUrl: 'https://ufa-id-dev.baibars.club/connect/authorize',
    tokenUrl: 'https://ufa-id-dev.baibars.club/connect/token',
    redirectUri: 'http://localhost:3000/connect/token',  // Ensure this matches your registered redirect URI
    scope: 'openid profile',  // Adjust scopes as needed
  };
  