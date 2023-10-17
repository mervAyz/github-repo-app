import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { AppStateProvider } from './AppStateContext';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { MockedProvider } from '@apollo/client/testing';
import client from './index';

jest.mock('./AppStateContext', () => ({
  AppStateProvider: jest.fn(({ children }) => children),
}));

test('renders learn react link', () => {
  
  render(
    <ApolloProvider client={client}>
      <AppStateProvider>
        <App />
      </AppStateProvider>
    </ApolloProvider>
  );

  const linkElement = screen.getByText(/GitHub Repositories/i);
  expect(linkElement).toBeInTheDocument();
});
