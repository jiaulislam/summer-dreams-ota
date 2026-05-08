# Implementation Plan: Telegram Chat Privacy & Lead Capture

## Phase 1: State Management and Local Storage [checkpoint: d868cfe]
- [x] Task: Create Session Management Utility [b2bee6b]
    - [x] Create a utility function (e.g., `lib/session.ts`) to generate a unique UUID.
    - [x] Implement functions to `getSession`, `setSession`, and `clearSession` using browser `localStorage`.
- [x] Task: Update Chat State Logic [31bd02a]
    - [x] Modify `FloatingChatWidget` or `ChatWindow` state to track `hasSession` and the user's details.
- [x] Task: Conductor - User Manual Verification 'Phase 1: State Management and Local Storage' (Protocol in workflow.md) [d868cfe]

## Phase 2: Lead Capture UI Implementation [checkpoint: 38b311f]
- [x] Task: Build Intro Form Component [c533a0a]
    - [x] Create a new component `ChatIntroForm` inside `src/features/marketing/components/`.
    - [x] Include fields for Name (required) and Contact Number (required), styled with `shadcn/ui` Inputs and Labels.
    - [x] Implement form validation and a submission handler.
- [x] Task: Integrate Form into Chat Window [4e88aa1]
    - [x] Modify `ChatWindow` to conditionally render `ChatIntroForm` if no session exists, or the actual message interface if a session is present.
- [x] Task: Conductor - User Manual Verification 'Phase 2: Lead Capture UI Implementation' (Protocol in workflow.md) [38b311f]

## Phase 3: API Enhancements (Tagging & Filtering) [checkpoint: 6d10ac4]
- [x] Task: Update POST API Route (Tagging) [7eae780]
    - [x] Modify `src/app/api/telegram/route.ts` (POST) to accept `sessionId`, `name`, and `contact`.
    - [x] Update the Telegram message payload to include a formatted prefix (e.g., `[ID: {sessionId}] {Name}: {message}`).
    - [x] Implement logic to send an "Initial Lead Info" message to Telegram immediately upon form submission.
- [x] Task: Update GET API Route (Privacy Filtering) [7eae780]
    - [x] Modify `src/app/api/telegram/route.ts` (GET) to accept a `sessionId` query parameter.
    - [x] Filter the incoming Telegram `getUpdates` array to only return messages that contain the user's specific `sessionId` in the text.
- [x] Task: Conductor - User Manual Verification 'Phase 3: API Enhancements (Tagging & Filtering)' (Protocol in workflow.md) [6d10ac4]

## Phase 4: Frontend Integration & Final Polish [checkpoint: 71a607b]
- [x] Task: Connect Frontend State to Updated API [62a6a5f]
    - [x] Update the `fetchUpdates` and `handleSendMessage` functions in `ChatWindow` to pass the correct `sessionId`.
- [x] Task: UI Polish [41ed921]
    - [x] Ensure smooth transitions between the Intro Form and the Chat view.
- [x] Task: Conductor - User Manual Verification 'Phase 4: Frontend Integration & Final Polish' (Protocol in workflow.md) [71a607b]
