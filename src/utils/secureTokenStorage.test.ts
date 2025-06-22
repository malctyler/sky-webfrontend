import { secureTokenStorage } from '../utils/secureTokenStorage';

describe('SecureTokenStorage', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  afterEach(() => {
    // Clean up after each test
    secureTokenStorage.clearTokens();
  });

  it('should store and retrieve tokens securely', () => {
    const testToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjk5OTk5OTk5OTl9.Lv-7aIxHUd6vOVHrP7COYlKDbfvZlqLrPvqZKhj-i8A';
    const testRefreshToken = 'refresh-token-123';
    const testUserInfo = { email: 'test@example.com', roles: ['User'] };
    const testExpiresAt = Date.now() + 3600000; // 1 hour from now

    // Store tokens
    secureTokenStorage.storeTokens(testToken, testRefreshToken, testUserInfo, testExpiresAt);

    // Retrieve tokens
    const retrievedData = secureTokenStorage.getTokens();

    expect(retrievedData.token).toBe(testToken);
    expect(retrievedData.refreshToken).toBe(testRefreshToken);
    expect(retrievedData.userInfo).toEqual(testUserInfo);
    expect(retrievedData.expiresAt).toBe(testExpiresAt);
  });

  it('should return null for invalid/missing tokens', () => {
    const result = secureTokenStorage.getTokens();
    
    expect(result.token).toBeNull();
    expect(result.refreshToken).toBeNull();
    expect(result.userInfo).toBeNull();
    expect(result.expiresAt).toBeNull();
  });

  it('should validate token expiration', () => {
    const expiredToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE1MTYyMzkwMjJ9.invalid';
    const pastExpiresAt = Date.now() - 1000; // 1 second ago

    secureTokenStorage.storeTokens(expiredToken, undefined, {}, pastExpiresAt);

    expect(secureTokenStorage.isTokenValid()).toBe(false);
    
    // After checking invalid token, it should be cleared
    const result = secureTokenStorage.getTokens();
    expect(result.token).toBeNull();
  });

  it('should clear tokens properly', () => {
    const testToken = 'test-token';
    secureTokenStorage.storeTokens(testToken);

    // Verify token is stored
    expect(secureTokenStorage.getToken()).toBe(testToken);

    // Clear tokens
    secureTokenStorage.clearTokens();

    // Verify tokens are cleared
    expect(secureTokenStorage.getToken()).toBeNull();
  });

  it('should update user info without affecting tokens', () => {
    const testToken = 'test-token';
    const initialUserInfo = { email: 'initial@example.com' };
    const updatedUserInfo = { email: 'updated@example.com' };

    secureTokenStorage.storeTokens(testToken, undefined, initialUserInfo);
    
    // Update user info
    secureTokenStorage.updateUserInfo(updatedUserInfo);

    // Token should remain the same, user info should be updated
    expect(secureTokenStorage.getToken()).toBe(testToken);
    expect(secureTokenStorage.getUserInfo()).toEqual(updatedUserInfo);
  });
});
