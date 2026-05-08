# Specification: Telegram Floating Chat Integration

## Overview
Implement a floating chat window on the marketing page that allows users to send and receive messages directly to/from a Telegram bot. The integration will utilize a Next.js API route to ensure secure communication and token management.

## Functional Requirements
- **Floating Chat UI:** A rounded chat icon positioned at the bottom-right of the screen. Clicking it toggles a floating chat window.
- **Message Sending:** Users can type and send messages. These messages will be forwarded to a configured Telegram bot via a secure API route.
- **Message Receiving:** The chat window should display responses received from the Telegram bot. (Note: Real-time receiving might require polling or webhooks depending on Telegram's API capabilities via the Next.js route).
- **Secure Communication:** All interactions with the Telegram API must be routed through a Next.js API endpoint to protect the bot token.
- **State Management:** Currently, chat history does not need to be persisted across page reloads (No Persistence), but the architecture should be built to allow easy integration of storage later.

## Non-Functional Requirements
- **UI/UX:** Utilize `shadcn/ui` components combined with custom Tailwind CSS for a modern, responsive, and cohesive design that matches the current branding.
- **Security:** Telegram Bot Token and Chat ID must be stored securely as environment variables (`.env`) and never exposed to the client-side code.

## Acceptance Criteria
- [ ] A floating chat icon is visible on the marketing page.
- [ ] Clicking the icon opens and closes the chat window.
- [ ] Users can type a message and send it.
- [ ] Sent messages appear in the Telegram client via the bot.
- [ ] Replies from the Telegram bot appear in the user's chat window.
- [ ] The Telegram bot token is completely hidden from the client browser network requests.

## Out of Scope
- Persistent chat history across sessions or page reloads (planned for future iteration).
- Complex messaging features like file attachments, images, or read receipts.
