import React from 'react';
import { render, screen, fireEvent,waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing'; 
import UserRepositories from '../UserRepositories';
import { AppStateProvider } from '../../../AppStateContext';
import '@testing-library/jest-dom'
import { GET_USER_REPOSITORIES } from '../UserRepositories';


const mocks = [] 

describe('UserRepositories component', () => {
  it('renders UserRepositories component', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <AppStateProvider>
          <UserRepositories />
        </AppStateProvider>
      </MockedProvider>
    );
    const searchButton = screen.getByText('Search');
    expect(searchButton).toBeInTheDocument();
  });

  it('updates the state with the entered username', async () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <AppStateProvider>
          <UserRepositories />
        </AppStateProvider>
      </MockedProvider>
    );

    const usernameInput = await screen.findByPlaceholderText('Enter GitHub username');
    fireEvent.change(usernameInput, { target: { value: 'newusername' } });

    expect(usernameInput.value).toBe('newusername');
  });
  
  it('loads more repositories when the "Load More" button is clicked', async () => {
    const loadMoreMock = {
        request: {
          query: GET_USER_REPOSITORIES,
          variables: {
            username: 'testuser',
            first: 10,
            afterCursor: 'someCursor',
          },
        },
        result: {
          data: {
            user: {
              repositories: {
                pageInfo: {
                  hasNextPage: false,
                  endCursor: 'newCursor',
                },
                edges: [
                  {
                    cursor: 'repo3Cursor',
                    node: {
                      name: 'Repo3',
                      watchers: { totalCount: 10 },
                      forks: { totalCount: 5 },
                      stargazers: { totalCount: 20 },
                      languages: {
                        edges: [
                          { node: { name: 'JavaScript' } },
                          { node: { name: 'Python' } },
                        ],
                      },
                    },
                  },
                ],
              },
            },
          },
        },
      };
      

    render(
      <MockedProvider mocks={[loadMoreMock]} addTypename={false}>
        <AppStateProvider>
          <UserRepositories />
        </AppStateProvider>
      </MockedProvider>
    );

    await waitFor(() => {
        const loadMoreButton = screen.queryByRole('button', { name: 'Load More' });
        if (loadMoreButton) {
          fireEvent.click(loadMoreButton);
        }
      });
    }
    );
});
