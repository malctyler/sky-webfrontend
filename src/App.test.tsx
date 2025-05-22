import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

describe('App', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    
    // Since we know the app has a login form when not authenticated
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });
});
