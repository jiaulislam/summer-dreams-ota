# Implementation Plan: Telegram Floating Chat Integration

## Phase 1: Setup and Configuration [checkpoint: 0deb9af]
- [x] Task: Environment Configuration [e1916de]
    - [x] Add `TELEGRAM_BOT_TOKEN` to `.env.local` and `.env.example`.
    - [x] Add `TELEGRAM_CHAT_ID` to `.env.local` and `.env.example`.
- [x] Task: Create UI Components Structure [5dd5b46]
    - [x] Create `FloatingChatWidget` component in `src/features/marketing/components/`.
    - [x] Create `ChatWindow` component in `src/features/marketing/components/`.
- [x] Task: Conductor - User Manual Verification 'Phase 1: Setup and Configuration' (Protocol in workflow.md) [0deb9af]
## Phase 2: API Route Implementation [checkpoint: 05960d9]
- [x] Task: Create Next.js API Route for Telegram [669b62a]
    - [x] Create `src/app/api/telegram/route.ts` to handle POST requests.
    - [x] Implement logic to forward messages to the Telegram bot API.
    - [x] Ensure token is read securely from environment variables.
    - [x] Return appropriate success/error responses to the frontend.
- [x] Task: Implement Mechanism for Receiving Messages [669b62a]
    - [x] Implement logic in the API route to fetch incoming messages (e.g., via Telegram's `getUpdates` method) and expose it via a `GET` request.
- [x] Task: Conductor - User Manual Verification 'Phase 2: API Route Implementation' (Protocol in workflow.md) [05960d9]

## Phase 3: Frontend UI and Integration [checkpoint: de602ad]
- [x] Task: Build Floating Chat Widget UI [5dd5b46]
    - [x] Implement the rounded chat icon button (fixed position, bottom right).
    - [x] Add toggle logic (open/close state).
- [x] Task: Build Chat Window UI [e21ec59]
    - [x] Create the chat interface (header, message list area, input field, send button) using Tailwind CSS and shadcn/ui styles.
    - [x] Implement auto-scroll to the bottom of the message list.
- [x] Task: Connect Frontend to API Route [e21ec59]
    - [x] Create a hook or service utility to handle API calls (`POST /api/telegram` for sending, `GET /api/telegram` for receiving).
    - [x] Wire up the send button to dispatch the message.
    - [x] Implement a lightweight polling mechanism to fetch incoming messages periodically while the chat window is open.
- [x] Task: Conductor - User Manual Verification 'Phase 3: Frontend UI and Integration' (Protocol in workflow.md) [de602ad]

## Phase 4: Final Integration and Polish [checkpoint: 8d8832b]
- [x] Task: Integrate Widget into Marketing Page [9f9e9ea]
    - [x] Render the `FloatingChatWidget` in the appropriate marketing layout or page.
- [x] Task: UI Polish and Animations [3e16903]
    - [x] Add smooth enter/exit animations for the chat window.
    - [x] Ensure responsive design on mobile devices.
- [x] Task: Conductor - User Manual Verification 'Phase 4: Final Integration and Polish' (Protocol in workflow.md) [8d8832b]
