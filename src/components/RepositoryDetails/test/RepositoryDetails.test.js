import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import RepositoryDetails from '../RepositoryDetails';
import '@testing-library/jest-dom'

test('renders repository details', async () => {
    const repo = {
        watchers: {
        totalCount: 10,
        },
        forks: {
        totalCount: 20,
        },
        stargazers: {
        totalCount: 30,
        },
        languages: {
        edges: [
            {
            node: {
                name: 'HTML',
            },
            },
            {
            node: {
                name: 'CSS',
            },
            },
            {
            node: {
                name: 'JavaScript',
            },
            },
        ],
        },
    };
    
    render(<RepositoryDetails repo={repo} />);
    
    const button = screen.getByText('Details');
    fireEvent.click(button);
    
    await waitFor(async () => {
        await Promise.all([
            expect(screen.getByText('Watchers: 10')).toBeInTheDocument(),
            expect(screen.getByText('Forks: 20')).toBeInTheDocument(),
            expect(screen.getByText('Stars: 30')).toBeInTheDocument(),
            expect(screen.getByText('Languages:')).toBeInTheDocument(),
            expect(screen.getByText('HTML')).toBeInTheDocument(),
            expect(screen.getByText('CSS')).toBeInTheDocument(),
            expect(screen.getByText('JavaScript')).toBeInTheDocument(),
        ]);
    });
    });