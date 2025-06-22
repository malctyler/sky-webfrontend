import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders without crashing', async () => {
    render(<App />);
    
    // Initially should show loading or authentication check
    expect(screen.getByText('Checking authentication...')).toBeInTheDocument();
    
    // Wait for authentication check to complete and login form to appear
    await waitFor(
      () => {
        expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });
});
