import React from 'react';
import { useHistory } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';

const Auth0ProviderWithHistory = ({ children }) => {
  const history = useHistory();
  const domain = 'dev-qurvlzph8pi372el.us.auth0.com';
  const clientId = 'SHuiZA549CDwyFQ0H6jD8Ed0Y8g2Bwbl';
  /* Makes sure the user is redirected back to the page they were once they log in */

  const onRedirectCallback = appState => {
    history.push(appState?.returnTo || window.location.pathname);
  };
  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;
