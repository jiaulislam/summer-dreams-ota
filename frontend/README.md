# Summer Dreams OTA - Frontend Web Application

## Overview
This is the frontend for the **Summer Dreams Travel Agency SAC** platform. It is a high-performance, accessible, and SEO-optimized web application built with Next.js 16 and React 19. It acts as the B2C portal, consuming a Django Headless CMS and flight orchestration API.

## Tech Stack
- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Library:** [React 19](https://react.dev/)
- **Language:** TypeScript
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/) (Radix UI)
- **Data Fetching:** [TanStack Query](https://tanstack.com/query/latest) (React Query)
- **Authentication:** [NextAuth.js v5](https://authjs.dev/) (Auth.js) with JWT bridge to Django
- **Localization:** [next-intl](https://next-intl-docs.vercel.app/)

## Getting Started

### Prerequisites
- Node.js 20+
- npm or yarn

### Installation
1.  **Install dependencies:**
    ```bash
    npm install
    ```
2.  **Configure environment:**
    Create a `.env.local` file with the following variables:
    ```env
    NEXT_PUBLIC_API_URL=http://localhost:8000/api
    AUTH_SECRET=your-secret-here
    AUTH_GOOGLE_ID=your-google-id
    AUTH_GOOGLE_SECRET=your-google-secret
    ```
3.  **Start development server:**
    ```bash
    npm run dev
    ```
4.  **Open the app:**
    Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure
The project follows a **Feature-based structure** inside `src/features/`:
- **`src/app/[locale]/`**: Localized App Router routes.
- **`src/features/`**: Modular logic, components, and hooks.
  - `auth/`: Login/Signup forms and auth-specific logic.
  - `marketing/`: Components for the landing page (Hero, Carousel, Accordions).
- **`src/components/ui/`**: Atomic UI components from shadcn/ui.
- **`src/lib/`**: Shared utilities, constants, and the `apiClient`.
- **`messages/`**: JSON dictionary files for `en` and `es` translations.

## Core Concepts

### Localization
Managed via `next-intl`. All user-facing strings are stored in `messages/*.json`. The application supports dynamic routing (e.g., `/en`, `/es`) and automatically detects the user's preferred language.

### Authentication
Uses NextAuth.js v5. It handles credential-based login and Google OAuth2. The system exchanges these for JWT tokens (access/refresh) provided by the Django backend, which are then attached to all subsequent `apiClient` requests.

### Telegram Live Support
A custom floating widget (`FloatingChatWidget`) allows real-time communication. It includes lead capture for first-time users and individual session tracking stored in `localStorage` for privacy.

## Development Workflow
- **Linting:** `npm run lint` (ESLint + unused imports check)
- **Formatting:** Prettier (configured in `.prettierrc`)
- **Building:** `npm run build` to verify production readiness.
