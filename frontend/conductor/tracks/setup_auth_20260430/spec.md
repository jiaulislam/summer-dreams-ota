# Specification: Authentication Setup

## Overview
Implement a comprehensive authentication system using NextAuth.js v5, integrating with a Django backend. This includes traditional login/signup flows, Google Social Login, and robust JWT management with automatic token rotation and 401 error handling.

## Requirements
- **Login/Signup Pages:** User-friendly interfaces for credentials-based authentication.
- **NextAuth.js Integration:** Configure Auth.js v5 to handle JWT sessions.
- **JWT Management:** Implement `jwt` and `session` callbacks to store and manage access/refresh tokens.
- **Automatic Token Rotation:** The `apiClient` must detect 401 errors, attempt to refresh the token using the refresh token, and retry the request.
- **Google Social Login:** Integrate Google as an authentication provider, delegating to the Django backend for final token issuance.
- **Route Protection:** Use `proxy.ts` (middleware) to protect private routes and handle redirects.

## Technical Details
- **Provider:** Credentials and Google.
- **Backend Communication:** Use `apiClient` for all auth-related requests to the Django API.
- **Storage:** JWTs stored in secure, HttpOnly cookies via NextAuth.
- **Error Handling:** Map backend errors to user-friendly toast notifications or inline messages.
