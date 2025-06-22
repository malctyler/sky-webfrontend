import { render, screen, waitFor } from '@testing-library/react';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import { validateToken } from '../services/authService';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock the authService
vi.mock('../services/authService', () => ({
  validateToken: vi.fn(),
  login: vi.fn(),
  logout: vi.fn(),
  checkEmailConfirmation: vi.fn(),
  getCurrentUser: vi.fn(),
}));

// Mock the ActivityMonitor
vi.mock('../utils/activityMonitor', () => ({
  ActivityMonitor: vi.fn().mockImplementation(() => ({
    destroy: vi.fn(),
  })),
}));

const mockValidateToken = validateToken as any;

// Test component to access the auth context
const TestComponent = () => {
  const { user, loading } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  if (user) return <div>User: {user.email}</div>;
  return <div>No user</div>;
};

describe('AuthContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Clear localStorage
    localStorage.clear();
  });

  it('should show loading initially', () => {
    mockValidateToken.mockResolvedValue({ valid: false });
    
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByText('Checking authentication...')).toBeInTheDocument();
  });

  it('should show no user when token validation fails', async () => {
    mockValidateToken.mockResolvedValue({ valid: false });
    
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('No user')).toBeInTheDocument();
    });
  });

  it('should show user when token validation succeeds', async () => {
    const mockUser = {
      email: 'test@example.com',
      roles: ['User'],
      emailConfirmed: true,
      token: 'mock-token',
      expiration: new Date().toISOString(),
    };

    mockValidateToken.mockResolvedValue({ 
      valid: true, 
      user: mockUser 
    });
    
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('User: test@example.com')).toBeInTheDocument();
    });
  });
});
