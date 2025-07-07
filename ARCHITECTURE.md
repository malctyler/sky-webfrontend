# Frontend Architecture Guidelines

## HTTP Client Architecture

### ❌ NEVER DO THIS:
```typescript
import axios from 'axios';
import { getAuthHeaders } from '../utils/authUtils';

// WRONG - Direct axios usage
const response = await axios.get(`${baseUrl}/api/customers`, { 
  headers: getAuthHeaders() 
});
```

### ✅ ALWAYS DO THIS:
```typescript
import apiClient from '../services/apiClient';
import { customerService } from '../services/customerService';

// CORRECT - Use service layer
const customer = await customerService.getById(id);

// OR if no service exists, use apiClient directly
const response = await apiClient.get('/api/customers');
```

## Rules:

### 1. **Service Layer First**
- Always check if a service exists for your API calls
- Use `customerService`, `plantHoldingService`, `inspectionService`, etc.
- Services handle typing and business logic

### 2. **ApiClient for Direct Calls**
- If no service exists, use `apiClient` directly
- `apiClient` handles authentication, token refresh, and error handling automatically
- Never bypass `apiClient` with direct `axios` calls

### 3. **Token Management**
- Never manually manage auth headers with `getAuthHeaders()`
- `apiClient` handles this automatically via interceptors
- Token expiration is handled gracefully (401 instead of 400 errors)

### 4. **Allowed axios Usage**
- **Only in `apiClient.ts`** - For creating the configured instance
- **For type checking** - `axios.isAxiosError(error)` is acceptable
- **Never for HTTP requests** - All requests must go through `apiClient`

## File Structure:
```
src/
├── services/
│   ├── apiClient.ts          ← Only file that should import axios for requests
│   ├── customerService.ts    ← Use these services first
│   ├── inspectionService.ts
│   └── ...
├── components/
│   └── *.tsx                 ← These should NEVER import axios directly
```

## Benefits of This Architecture:
- ✅ Consistent authentication handling
- ✅ Centralized error handling
- ✅ Token expiration handled properly
- ✅ Type safety through service layer
- ✅ Easy to modify auth logic in one place
- ✅ Prevents 400 errors on expired tokens

## Migration Checklist:
When you see direct axios usage:
1. [ ] Check if a service exists for this API
2. [ ] If yes → Use the service method
3. [ ] If no → Use `apiClient.get/post/put/delete`
4. [ ] Remove `import axios` and `getAuthHeaders`
5. [ ] Test that authentication still works
