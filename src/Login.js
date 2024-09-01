import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Step 1: Send email and password to the login API
      await axios.post('https://ufa-id-dev.baibars.club/api/accounts/login', { email, password, returnUrl: "/connect/authorize?redirect_uri=https://localhost:3000/connect/token&client_id=graphql&response_type=code&scope=openid" }, {
        withCredentials: true,  // Ensure cookies are sent/received
      });

      // Step 2: Send a request to the authorize API to get the access token
      const response = await axios.post('https://ufa-id-dev.baibars.club/connect/authorize', {}, {
        withCredentials: true,  // Send the cookies with this request
        headers: {
          'access-control-allow-origin': 'https://ufa-ui-dev.baibars.club',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        params: {
          client_id: 'graphql',
          redirect_uri: 'https://ufa-ui-dev.baibars.club/connect/token',  // Ensure this matches your registered redirect URI
          response_type: 'code',
          scope: 'openid profile',  // Adjust scopes as needed
        },
      });

      // Handle the response, possibly saving the token or redirecting
      console.log('Authorization response:', response.data);
      // Redirect to the callback route or another route
      window.location.href = response.data.redirect_uri;
    } catch (err) {
      setError('Login failed. Please check your credentials and try again.');
      console.error('Login or authorization failed:', err);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default LoginForm;
