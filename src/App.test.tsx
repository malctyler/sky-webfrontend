import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders without crashing', async () => {
    render(<App />);
    
    // Initially should show loading or authentication check
    expect(screen.getByText('Checking authentication...')).toBeInTheDocument();
    
    // Wait for authentication check to complete and app to render properly
    // After auth check fails (no token), should redirect to login page
    await waitFor(
      () => {
        // Should show either the login form or have navigated to login page
        const loginElement = screen.queryByText('Login') || 
                            screen.queryByRole('button', { name: /sign in/i }) ||
                            screen.queryByPlaceholderText(/email/i);
        expect(loginElement).toBeInTheDocument();
      },
      { timeout: 5000 }
    );
  });
});
