# GitHub Copilot Instructions for sky-webfrontend

## Project Overview
This is a React-based web frontend project using Vite as the build tool. The project uses Material-UI components and various modern React libraries for UI development.

## Project Structure
- `/src` - Main source code directory
- `/public` - Static assets
- `/src/services` - API and service layer
- `/src/theme` - Theme and styling configurations
- `/src/components` - React components (if any)

## Important Configuration
- The project uses Vite for development and building
- Material-UI is used for UI components
- React Router is used for routing
- Axios is used for HTTP requests
- JWT handling for authentication

## Directory Operations
When navigating directories, always use full paths. The root directory is:
```
d:\workingrepos\TheTylers2\sky-webfrontend
```

Any cd commands should use the complete path, for example:
```powershell
cd d:\workingrepos\TheTylers2\sky-webfrontend
```

## Development Commands
All commands should be run from the root directory (d:\workingrepos\TheTylers2\sky-webfrontend):

- Start development server:
```powershell
npm run dev
```

- Build for production:
```powershell
npm run build
```

- Preview production build:
```powershell
npm run preview
```

- Run tests:
```powershell
npm run test
```

## Package Management
- Use npm for package management
- Always save dependencies with exact versions
- For installing new packages:
```powershell
npm install --save <package-name>
```
- For dev dependencies:
```powershell
npm install --save-dev <package-name>
```

## File Naming Conventions
- React components: PascalCase (e.g., `MyComponent.jsx`)
- Services: camelCase (e.g., `authService.js`)
- Utils/Helpers: camelCase (e.g., `httpClient.ts`)
- Test files: `*.test.js` or `*.test.tsx`

## Code Style Guidelines
1. Use functional components with hooks
2. Implement proper TypeScript types where applicable
3. Use Material-UI components for consistent styling
4. Follow React best practices for state management
5. Implement proper error handling in API calls
6. Use async/await for asynchronous operations
7. Implement proper form validation
8. Use proper route protection for authenticated routes

## Important Dependencies
- React: ^18.2.0
- Material-UI: ^5.15.11
- React Router: ^7.3.0
- Axios: ^1.8.2
- Date-fns: ^4.1.0
- JWT-decode: ^4.0.0

## Testing
- Tests are run using Vitest
- Use React Testing Library for component testing
- Test files should be co-located with the components they test

## Build and Deployment
- Production builds are created using Vite
- Static files are served from the `/dist` directory after build
- Environment variables should be prefixed with `VITE_`

## Error Handling
1. Implement proper error boundaries
2. Use try-catch blocks for async operations
3. Handle API errors consistently
4. Show appropriate user feedback for errors

## Security Considerations
1. Sanitize user inputs
2. Implement proper authentication checks
3. Use HTTPS for API calls
4. Don't expose sensitive information in logs or errors
5. Validate JWT tokens properly
