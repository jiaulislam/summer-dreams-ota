# GEMINI.md - Summer Dreams Travel Agency SAC

## Project Overview
Summer Dreams Travel Agency SAC is a high-performance, accessible, and SEO-optimized web application built with Next.js. It follows a decoupled Headless CMS architecture and orchestrates external APIs (primarily a Django backend) to provide travel-related services like flight bookings.

### Core Technologies
- **Framework:** Next.js (App Router paradigm)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (Mobile-First approach)
- **UI Components:** `shadcn/ui` (Radix UI)
- **State Management / Data Fetching:** TanStack Query (React Query)
- **Authentication:** NextAuth.js (Auth.js) v5 with JWT integration
- **Localization:** `next-intl` (supporting multi-locale routing)

## Development Conventions
### Architectural Principles
- **DRY (Don't Repeat Yourself):** Centralize configurations and reusable logic.
- **Lean Page Components:** Page components in `src/app/` should be lean, primarily acting as entry points and using feature-specific components for logic and UI.
- **API Configuration:** The `NEXT_PUBLIC_API_URL` should point to the root API endpoint (e.g., `.../api`). Versioning (e.g., `/v1`) should be appended dynamically or via centralized constants.

### Directory Structure
- `src/features/`: Feature-specific logic (api, components, hooks).
    - `src/features/auth/`: Components like `LoginForm`, `SignupForm`, and auth-related hooks.

## Building and Running
### Development
```bash
npm run dev
```
### Production Build
```bash
npm run build
```
### Static Assets
Static assets are located in the `public/` directory.

## Development Conventions
### Directory Structure
- `src/app/[locale]/`: Root of the App Router, containing localized routes.
    - `(marketing)`: Route group for public-facing pages.
    - `(auth)`: Route group for authentication pages (login, registration).
- `src/features/`: Feature-specific logic (api, components, hooks).
- `src/components/ui/`: Reusable, atomic UI components (shadcn/ui).
- `src/providers/`: Context providers (Query, Auth, etc.).
- `src/lib/`: Core utilities and the centralized `apiClient`.
- `messages/`: Localization dictionaries for `next-intl`.

### Coding Standards
- **Interactivity:** Use `'use client'` strictly when necessary.
- **Routing:** Use the `proxy.ts` (formerly `middleware.ts`) for authentication and locale-based redirection.
- **Types:** Define shared types in `src/types/`.
- **Styling:** Avoid custom CSS logic; leverage Tailwind utility classes.
- **Error Handling:** Use `error.tsx` at the layout level and handle API errors via the `apiClient` with user-friendly toast notifications (TODO).

## Auth & Security
- Routes are protected via `src/proxy.ts`.
- JWTs (access and refresh) are managed through NextAuth callbacks.
- Access tokens are automatically refreshed by the `apiClient` when a 401 response is received.
- Fallback to forced logout occurs if refresh tokens expire.

## TODO / Roadmap
- [ ] Implement user-friendly toast notifications for API errors.
- [ ] Complete the registration flow in `src/app/[locale]/(auth)/`.
- [ ] Integrate real Django backend endpoints in `src/features/flights/api/`.
- [ ] Add unit and integration tests using Jest/Vitest and Playwright.
