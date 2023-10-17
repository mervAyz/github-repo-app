import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { AppStateProvider } from './AppStateContext';
import { useAppState } from './AppStateContext';

jest.mock('./AppStateContext', () => ({
  AppStateProvider: jest.fn(({ children }) => children),
  useAppState: jest.fn().mockReturnValue({ state: { username: 'test' } }),
}));

test('renders learn react link', () => {
  render(
    <AppStateProvider>
      <App />
    </AppStateProvider>
  );

  const linkElement = screen.getByText(/GitHub Repositories/i);
  expect(linkElement).toBeInTheDocument();
});
