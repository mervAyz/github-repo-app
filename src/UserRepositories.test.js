import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UserRepositories from './UserRepositories';
import { AppStateProvider } from './AppStateContext';
import { MockedProvider } from '@apollo/client/testing';
import { GET_USER_REPOSITORIES } from './UserRepositories';

const mocks = [
    {
        request: {
        query: GET_USER_REPOSITORIES,
        variables: { username: 'test', first: 10, afterCursor: null },
        },
        result: {
        data: {
            user: {
            repositories: {
                pageInfo: {
                hasNextPage: true,
                endCursor: 'Y3Vyc29yOjA=',
                },
                edges: [
                {
                    cursor: 'Y3Vyc29yOjA=',
                    node: {
                    name: 'test-repo-1',
                    },
                },
                ],
            },
            },
        },
        },
    },
    ];

test('renders UserRepositories component', () => {
    render(
        <MockedProvider mocks={mocks} addTypename={false}>
            <AppStateProvider>
                <UserRepositories />
            </AppStateProvider>
        </MockedProvider>
    );
    const inputElement = screen.getByPlaceholderText(/Enter GitHub username/i);
    expect(inputElement).toBeInTheDocument();
});