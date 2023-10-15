// src/UserRepositories.js
import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { gql } from 'graphql-tag';

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
  const [username, setUsername] = useState('');
  const [getRepositories, { loading, error, data}] = useLazyQuery(GET_USER_REPOSITORIES);

  const handleSearch = () => {
    getRepositories({ variables: { username } });
  };


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <input
        type="text"
        placeholder="Enter GitHub username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      {data && data.user && data.user.repositories.edges.length > 0 && (
        <div>
          <h2>Repositories for {username}:</h2>
          <ul>
            {data.user.repositories.edges.map((repo, index) => (
              <li key={index}>{repo.node.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default UserRepositories;
