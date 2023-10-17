import React, { useState, useContext, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { gql } from 'graphql-tag';
import { useAppState } from '../../AppStateContext';
import '../../style/UserRepositories.css';
import RepositoryDetails from '../RepositoryDetails/RepositoryDetails';

export const GET_USER_REPOSITORIES = gql`
  query GetUserRepositories($username: String!, $first: Int, $afterCursor: String) {
    user(login: $username) {
      repositories(first: $first, after: $afterCursor) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          cursor
          node {
            name
            watchers {
              totalCount
            }
            forks {
              totalCount
            }
            stargazers {
              totalCount
            }
            languages(first: 10) {
              edges {
                node {
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`;

function UserRepositories() {
  const { state, dispatch } = useAppState();
  const [getRepositories, { loading, error, data }] = useLazyQuery(GET_USER_REPOSITORIES);
  const [searchedUser, setSearchedUser] = useState(null);


  const handleSearch = () => {
    setSearchedUser(state.username);
    if(state.username === searchedUser) return;
    dispatch({ type: 'SET_REPOSITORIES', payload: [] });
    getRepositories({ variables: { username: state?.username, first: 10, afterCursor: null } });
  };

  const handleLoadMore = () => {
    const afterCursor = data.user.repositories.pageInfo.endCursor;
    getRepositories({ variables: { username: state?.username, first: 10, afterCursor } });
  };



  useEffect(() => {
    if (data) {
      const newRepos = data?.user?.repositories?.edges?.map((edge) => edge?.node);
      dispatch({ type: 'SET_REPOSITORIES', payload: [...state?.repositories, ...newRepos] });
    }
  }, [data]);

  return (
    <div>
      <input
        type="text"
        placeholder="Enter GitHub username"
        value={state?.username}
        onChange={(e) => dispatch({ type: 'SET_USERNAME', payload: e?.target?.value })}
      />
      <button onClick={handleSearch}>Search</button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error?.message}</p>}
      {state?.repositories?.length > 0 && (
        <div>
          <h2>Repositories for {state?.username}:</h2>
          <ul>
            {state?.repositories.map((repo, index) => (
              <li key={index}>
                {repo?.name}
                <RepositoryDetails repo={repo} />
              </li>
            ))}
          </ul>
          {data && data?.user?.repositories?.pageInfo?.hasNextPage && (
            <button onClick={handleLoadMore}>Load More</button>
          )}
        </div>
      )}
    </div>
  );
}

export default UserRepositories;
