# Secure Authentication Implementation

## Overview

This implementation provides secure, persistent authentication for a React frontend (Azure Static Web Apps, free tier) and .NET backend (Azure App Service) with enhanced security measures for cross-domain JWT handling.

## Key Features

### 1. SecureTokenStorage (`src/utils/secureTokenStorage.ts`)

**Purpose**: Provides encrypted, fingerprinted localStorage for secure token storage on Azure free tier.

**Security Features**:
- **AES Encryption**: All tokens encrypted using crypto-js with browser-specific keys
- **Browser Fingerprinting**: Canvas-based + browser characteristics to prevent token theft
- **Auto-Expiry**: Automatic cleanup of expired tokens
- **Timestamp Validation**: Maximum storage age (24 hours) to prevent stale data
- **Tamper Detection**: Browser fingerprint mismatch triggers automatic cleanup

**Key Methods**:
```typescript
storeTokens(token, refreshToken?, userInfo?, expiresAt?)
getTokens() // Returns { token, refreshToken, userInfo, expiresAt }
clearTokens()
isTokenValid()
updateUserInfo(userInfo)
```

### 2. Enhanced Authentication Utils (`src/utils/authUtils.ts`)

**Purpose**: Unified authentication helpers that work across Azure Static Web Apps and same-domain scenarios.

**Features**:
- **Domain Detection**: Automatically detects Azure Static Web Apps vs same-domain
- **Dual Storage**: Uses cookies for same-domain, secure storage for cross-domain
- **Type Safety**: Proper TypeScript return types for headers

### 3. Activity Monitor (`src/utils/activityMonitor.ts`)

**Purpose**: Automatic logout on user inactivity for enhanced security.

**Features**:
- **Configurable Timeout**: Default 30 minutes of inactivity
- **Multiple Event Tracking**: Mouse, keyboard, touch, scroll events
- **Cleanup**: Proper event listener cleanup on destruction

### 4. Updated AuthContext (`src/contexts/AuthContext.tsx`)

**Purpose**: React context for global authentication state with integrated security.

**Features**:
- **Activity Monitoring**: Automatic initialization/cleanup of activity monitor
- **Secure Storage Integration**: Uses SecureTokenStorage for all token operations
- **Type Mapping**: Converts backend AuthResponse to frontend AuthUser format

## Security Headers (CSP)

**Location**: `public/index.html`

**Implemented Headers**:
- **Content Security Policy**: Restricts script sources and prevents XSS
- **X-Content-Type-Options**: Prevents MIME sniffing
- **X-Frame-Options**: Prevents clickjacking
- **X-XSS-Protection**: Additional XSS protection
- **Referrer-Policy**: Controls referrer information leakage

## Migration Path

### Current Implementation (Free Tier)
- ✅ **SecureTokenStorage**: Encrypted localStorage with fingerprinting
- ✅ **Activity Monitoring**: Auto-logout on inactivity
- ✅ **CSP Headers**: Basic security headers
- ✅ **Cross-domain Support**: Works with Azure Static Web Apps

### Future Implementation (Paid Tier with Custom Domain)
- 🔄 **Secure Cookies**: HttpOnly, Secure, SameSite cookies
- 🔄 **Custom Domain**: Same-domain deployment for better cookie security
- 🔄 **Enhanced CSP**: Stricter content security policy
- 🔄 **HTTPS Enforcement**: Mandatory HTTPS with HSTS headers

## Usage Examples

### Basic Authentication Flow
```typescript
// Login
const user = await login(email, password);
// Token automatically stored securely

// Check authentication
const { valid, user } = await validateToken();

// Logout
await logout();
// All tokens automatically cleared
```

### Manual Token Management
```typescript
// Store tokens with expiration
secureTokenStorage.storeTokens(token, refreshToken, userInfo, expiresAt);

// Check validity
if (secureTokenStorage.isTokenValid()) {
  // Token is valid and not expired
}

// Get user info
const userInfo = secureTokenStorage.getUserInfo();
```

## Testing

### Test Coverage
- ✅ **SecureTokenStorage**: Full unit test suite
- ✅ **AuthContext**: React component testing
- ✅ **Integration**: Basic app rendering tests

### Test Features
- **Environment Detection**: Tests handle canvas fallbacks for jsdom
- **Async Testing**: Proper waitFor usage for async auth operations
- **Mocking**: Service layer mocking for isolated testing

## Configuration

### Environment Variables
- `NODE_ENV`: Used for test environment detection in SecureTokenStorage

### Constants
- **Inactivity Timeout**: 30 minutes (configurable in ActivityMonitor)
- **Token Max Age**: 24 hours for localStorage storage
- **Encryption**: AES encryption with browser-specific keys

## Files Modified/Created

### New Files
- `src/utils/secureTokenStorage.ts`: Secure token storage implementation
- `src/utils/activityMonitor.ts`: User activity monitoring
- `src/utils/secureTokenStorage.test.ts`: Unit tests for secure storage
- `src/contexts/AuthContext.test.tsx`: React context tests

### Modified Files
- `src/utils/authUtils.ts`: Enhanced with secure storage integration
- `src/services/authService.ts`: Updated to use new auth utils
- `src/contexts/AuthContext.tsx`: Integrated activity monitoring and secure storage
- `public/index.html`: Added security headers (CSP, etc.)
- `vite.config.ts`: Updated test configuration

## Security Considerations

### Current Mitigations
1. **Encryption**: All tokens encrypted at rest
2. **Fingerprinting**: Browser-specific token binding
3. **Expiry**: Automatic cleanup of stale tokens
4. **Activity Monitoring**: Auto-logout on inactivity
5. **CSP**: Content Security Policy headers

### Known Limitations (Free Tier)
1. **localStorage Exposure**: Still vulnerable to XSS (mitigated by encryption)
2. **Cross-domain Cookies**: Cannot use secure cookies reliably
3. **Limited CSP**: Some CSP restrictions relaxed for compatibility

### Recommended Upgrades (Paid Tier)
1. **Custom Domain**: Enable same-domain deployment
2. **Secure Cookies**: Replace localStorage with HttpOnly cookies
3. **Stricter CSP**: Remove 'unsafe-inline' and 'unsafe-eval'
4. **HSTS**: HTTP Strict Transport Security headers

## Maintenance

### Regular Tasks
- **Dependency Updates**: Keep crypto-js and security libraries updated
- **Security Review**: Regular review of token storage and encryption
- **CSP Updates**: Adjust CSP as application evolves
- **Test Coverage**: Maintain test coverage for security features

### Monitoring
- **Error Logging**: Monitor SecureTokenStorage errors
- **Authentication Failures**: Track validation failures
- **Activity Patterns**: Monitor auto-logout frequency
