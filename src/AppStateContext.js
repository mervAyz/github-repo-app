import React, { createContext, useContext, useReducer } from 'react';

const initialState = {
  username: '',
  loading: false,
  error: null,
  repositories: [],
};

const AppStateContext = createContext();

export const useAppState = () => {
  return useContext(AppStateContext);
};

const appStateReducer = (state, action) => {
  console.log("state",state)
  switch (action.type) {
    case 'SET_USERNAME':
      return { ...state, username: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_REPOSITORIES':
      return { ...state, repositories: action.payload };
    default:
      return state;
  }
};

export const AppStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appStateReducer, initialState);

  return (
    <AppStateContext.Provider value={{ state, dispatch }}>
      {children}
    </AppStateContext.Provider>
  );
};
