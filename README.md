# Sky Web Frontend

## Overview
Sky Web Frontend is a TypeScript-based web application that provides the user interface for the Sky system.

## Development Guidelines

### API Communication
- All service files must use the shared `apiClient` for API calls
- Direct usage of axios or fetch is not allowed in service files
- The `apiClient` automatically handles:
  - API base URL configuration
  - Authentication headers
  - Error handling
  - Type safety

### Authentication
- Basic authentication is implemented and working in both frontend and backend
- All authenticated requests should go through `apiClient`

### TypeScript
- The project is built with TypeScript for better type safety and development experience
- Always use proper type definitions for API requests and responses
- Avoid using `any` type where possible

### Date Handling
- Use the `toISODateString` helper (from `inspectionService`) for date serialization
- Format dates as 'yyyy-MM-dd' without timezone for date-only fields
- Be careful with timezone handling in date operations