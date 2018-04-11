import React from 'react';
import { AsyncStorage } from 'react-native';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient, InMemoryCache, split } from 'apollo-client-preset';
import { getMainDefinition } from 'apollo-utilities';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from 'apollo-link-context';
import { WebSocketLink } from 'apollo-link-ws';

import Routes from './routes/AppNavigation';
import { TOKEN_KEY } from './constants';

const wsLink = new WebSocketLink({
  uri: 'wss://subscriptions.graph.cool/v1/cjfhya5792pdz0171wwtabziv',
  options: {
    reconnect: true,
  },
});

const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem(TOKEN_KEY);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  authLink.concat(createUploadLink({ uri: 'https://api.graph.cool/simple/v1/cjfhya5792pdz0171wwtabziv' })),
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default () => (
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>
);
