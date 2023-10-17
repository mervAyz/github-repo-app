import React from 'react';
import './App.css';
import UserRepositories from './components/UserRepositories/UserRepositories';
import { AppStateProvider } from './AppStateContext';

function App() {
  return (
    <AppStateProvider>
      <div className="App">
        <h1>GitHub Repositories</h1>
        <UserRepositories />
      </div>
    </AppStateProvider>
  );
}

export default App;
