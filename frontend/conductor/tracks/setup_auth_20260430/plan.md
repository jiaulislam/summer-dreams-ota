# Implementation Plan: Authentication Setup

## Phase 1: Foundation & Credentials Auth [checkpoint: c9555d3]
- [x] Task: Configure NextAuth.js v5 with Credentials Provider (714f9bf)
    - [x] Update `src/auth.ts` to include robust `authorize` logic calling the Django backend.
    - [x] Configure `jwt` and `session` callbacks to persist access and refresh tokens.
- [x] Task: Implement Login and Signup Pages (939abff)
    - [x] Create the signup page in `src/app/[locale]/(auth)/signup/page.tsx`.
    - [x] Enhance the existing login page with form validation and error handling.
- [x] Task: Protect Private Routes (303e24e)
    - [x] Update `src/proxy.ts` to enforce session requirements on sensitive routes like `/dashboard`.
- [x] Task: Conductor - User Manual Verification 'Foundation & Credentials Auth' (Protocol in workflow.md)

## Phase 2: JWT Lifecycle & 401 Interception [checkpoint: 0f84f74]
- [x] Task: Enhance API Client with Token Rotation (0f84f74)
    - [x] Refactor `src/lib/api-client.ts` to implement the intercept-refresh-retry logic.
    - [x] Ensure `signOut` is called if the refresh token expires or the refresh attempt fails.
- [x] Task: Test 401 Handling Manually (0f84f74)
    - [x] Simulate a 401 response from the backend to verify the automatic refresh and retry.
- [x] Task: Conductor - User Manual Verification 'JWT Lifecycle & 401 Interception' (Protocol in workflow.md)

## Phase 3: Google Social Login Integration [checkpoint: 2c0696b]
- [x] Task: Configure Google Provider in NextAuth (2c0696b)
    - [x] Add the Google provider to `src/auth.ts`.
    - [x] Set up the necessary environment variables (`AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET`).
- [x] Task: Implement Backend Linkage for Social Login (2c0696b)
    - [x] Create a dedicated handler or update the `authorize` flow to exchange Google tokens for Django JWTs.
- [x] Task: Conductor - User Manual Verification 'Google Social Login Integration' (Protocol in workflow.md)
