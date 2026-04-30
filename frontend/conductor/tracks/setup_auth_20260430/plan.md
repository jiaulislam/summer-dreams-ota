# Implementation Plan: Authentication Setup

## Phase 1: Foundation & Credentials Auth
- [x] Task: Configure NextAuth.js v5 with Credentials Provider (714f9bf)
    - [ ] Update `src/auth.ts` to include robust `authorize` logic calling the Django backend.
    - [ ] Configure `jwt` and `session` callbacks to persist access and refresh tokens.
- [ ] Task: Implement Login and Signup Pages
    - [ ] Create the signup page in `src/app/[locale]/(auth)/signup/page.tsx`.
    - [ ] Enhance the existing login page with form validation and error handling.
- [ ] Task: Protect Private Routes
    - [ ] Update `src/proxy.ts` to enforce session requirements on sensitive routes like `/dashboard`.
- [ ] Task: Conductor - User Manual Verification 'Foundation & Credentials Auth' (Protocol in workflow.md)

## Phase 2: JWT Lifecycle & 401 Interception
- [ ] Task: Enhance API Client with Token Rotation
    - [ ] Refactor `src/lib/api-client.ts` to implement the intercept-refresh-retry logic.
    - [ ] Ensure `signOut` is called if the refresh token expires or the refresh attempt fails.
- [ ] Task: Test 401 Handling Manually
    - [ ] Simulate a 401 response from the backend to verify the automatic refresh and retry.
- [ ] Task: Conductor - User Manual Verification 'JWT Lifecycle & 401 Interception' (Protocol in workflow.md)

## Phase 3: Google Social Login Integration
- [ ] Task: Configure Google Provider in NextAuth
    - [ ] Add the Google provider to `src/auth.ts`.
    - [ ] Set up the necessary environment variables (`AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET`).
- [ ] Task: Implement Backend Linkage for Social Login
    - [ ] Create a dedicated handler or update the `authorize` flow to exchange Google tokens for Django JWTs.
- [ ] Task: Conductor - User Manual Verification 'Google Social Login Integration' (Protocol in workflow.md)
