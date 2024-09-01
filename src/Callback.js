import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');

    if (code) {
      const clientId = 'graphql';
      const clientSecret = '06BD941-1437-402C-A09F-A9BDA23044BD';  // Use this only server-side
      const redirectUri = 'http://localhost:3000/connect/token';
      const tokenUrl = 'https://ufa-id-dev.baibars.club/connect/token';

      const params = new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirectUri,
        client_id: clientId,
        client_secret: clientSecret,  // Use this only server-side
      });

      axios.post(tokenUrl, params)
        .then(response => {
          const accessToken = response.data.access_token;
          localStorage.setItem('access_token', accessToken);
          console.log('Access Token:', accessToken);
          navigate('/');  // Redirect to the homepage or another route
        })
        .catch(error => {
          console.error('Token exchange failed:', error);
        });
    }
  }, [navigate]);

  return <div>Processing login...</div>;
};

export default Callback;
