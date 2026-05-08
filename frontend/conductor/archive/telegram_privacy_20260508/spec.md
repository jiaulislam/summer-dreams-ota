# Specification: Telegram Chat Privacy & Lead Capture

## Overview
Enhance the existing Telegram floating chat widget by introducing individual session tracking and a lead capture form. This ensures multi-user privacy (customers only see their own messages) and collects essential contact information before a chat begins.

## Functional Requirements
- **Lead Capture Form:** When a new user opens the chat for the first time, they must be presented with an "Intro Form View" requesting their Name and Contact Number.
- **Session Tracking:** Upon submitting the form, a unique `Session ID` is generated and stored in the browser's `localStorage` (Persistent across reloads and sessions).
- **Message Tagging (Sending):** All messages sent from the frontend to the Next.js API must include the `Session ID`. The API will format the message sent to Telegram to include this ID (e.g., `[Session: 1234] Name: John - Message`).
- **Privacy Filtering (Receiving):** The Next.js `GET` API route must filter incoming Telegram messages. Since we are using "Simple Prefixing", the frontend or API must ensure that only messages containing or associated with the user's specific `Session ID` are returned and displayed in their chat window.
- **Initial Notification:** When the lead capture form is submitted, an initial notification message containing the user's Name and Contact Number should be sent to the Telegram bot immediately.

## Non-Functional Requirements
- **UI/UX:** The Intro Form should match the existing `shadcn/ui` and custom Tailwind styling of the chat window.
- **Security:** The Session ID should be sufficiently random (e.g., UUID) to prevent guessing.

## Acceptance Criteria
- [ ] First-time users see a form requesting Name and Contact Number.
- [ ] Submitting the form reveals the chat interface.
- [ ] Agency receives a notification in Telegram with the new lead's details.
- [ ] User's Session ID is saved in `localStorage`.
- [ ] Messages from User A are not visible in User B's chat window.

## Out of Scope
- Complex Telegram bot command parsing (e.g., `/reply`). The agency will rely on the simple prefixing context for now.
- Backend database storage for leads (handled purely via Telegram for now).
