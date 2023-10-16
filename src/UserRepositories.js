import React, { useState,useContext,useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { gql } from 'graphql-tag';
import { useAppState } from './AppStateContext';

const GET_USER_REPOSITORIES = gql`
  query GetUserRepositories($username: String!) {
    user(login: $username) {
      repositories(first: 10) {
        edges {
          node {
            name
          }
        }
      }
    }
  }
`;

function UserRepositories() {
  const { state,dispatch } = useAppState();
  const [getRepositories, { loading, error, data}] = useLazyQuery(GET_USER_REPOSITORIES);

  const handleSearch = () => {
    getRepositories({ variables: { username: state.username } });
  };

  useEffect(() => {
    if (data) {
      if (data.user && data.user.repositories.edges.length > 0) {
        dispatch({ type: 'SET_REPOSITORIES', payload: data.user.repositories.edges });
      } else {
        dispatch({ type: 'SET_REPOSITORIES', payload: [] });
      }
    }
  }, [data, dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <input
        type="text"
        placeholder="Enter GitHub username"
        value={state.username}
        onChange={(e) => dispatch({ type: 'SET_USERNAME', payload: e.target.value })}
      />
      <button onClick={handleSearch}>Search</button>
      {state.repositories.length > 0 && (
        <div>
          <h2>Repositories for {state.username}:</h2>
          <ul>
            {state.repositories.map((repo, index) => (
              <li key={index}>{repo.node.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default UserRepositories;
