// src/ApolloClient.js
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://ufa-api-dev.baibars.club/graphql/',
  cache: new InMemoryCache(),
});

export default client;
