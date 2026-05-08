# Implementation Plan: Telegram Floating Chat Integration

## Phase 1: Setup and Configuration
- [ ] Task: Environment Configuration
    - [ ] Add `TELEGRAM_BOT_TOKEN` to `.env.local` and `.env.example`.
    - [ ] Add `TELEGRAM_CHAT_ID` to `.env.local` and `.env.example`.
- [ ] Task: Create UI Components Structure
    - [ ] Create `FloatingChatWidget` component in `src/features/marketing/components/`.
    - [ ] Create `ChatWindow` component in `src/features/marketing/components/`.
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Setup and Configuration' (Protocol in workflow.md)

## Phase 2: API Route Implementation
- [ ] Task: Create Next.js API Route for Telegram
    - [ ] Create `src/app/api/telegram/route.ts` to handle POST requests.
    - [ ] Implement logic to forward messages to the Telegram bot API.
    - [ ] Ensure token is read securely from environment variables.
    - [ ] Return appropriate success/error responses to the frontend.
- [ ] Task: Implement Mechanism for Receiving Messages
    - [ ] Implement logic in the API route to fetch incoming messages (e.g., via Telegram's `getUpdates` method) and expose it via a `GET` request.
- [ ] Task: Conductor - User Manual Verification 'Phase 2: API Route Implementation' (Protocol in workflow.md)

## Phase 3: Frontend UI and Integration
- [ ] Task: Build Floating Chat Widget UI
    - [ ] Implement the rounded chat icon button (fixed position, bottom right).
    - [ ] Add toggle logic (open/close state).
- [ ] Task: Build Chat Window UI
    - [ ] Create the chat interface (header, message list area, input field, send button) using Tailwind CSS and shadcn/ui styles.
    - [ ] Implement auto-scroll to the bottom of the message list.
- [ ] Task: Connect Frontend to API Route
    - [ ] Create a hook or service utility to handle API calls (`POST /api/telegram` for sending, `GET /api/telegram` for receiving).
    - [ ] Wire up the send button to dispatch the message.
    - [ ] Implement a lightweight polling mechanism to fetch incoming messages periodically while the chat window is open.
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Frontend UI and Integration' (Protocol in workflow.md)

## Phase 4: Final Integration and Polish
- [ ] Task: Integrate Widget into Marketing Page
    - [ ] Render the `FloatingChatWidget` in the appropriate marketing layout or page.
- [ ] Task: UI Polish and Animations
    - [ ] Add smooth enter/exit animations for the chat window.
    - [ ] Ensure responsive design on mobile devices.
- [ ] Task: Conductor - User Manual Verification 'Phase 4: Final Integration and Polish' (Protocol in workflow.md)
