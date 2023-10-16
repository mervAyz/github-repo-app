import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { AppStateProvider } from './AppStateContext';

jest.mock('./AppStateContext', () => ({
  AppStateProvider: jest.fn(({ children }) => children),
}));

test('renders learn react linkk', () => {
  render(<App />);
  expect(AppStateProvider).toHaveBeenCalled();
} );

