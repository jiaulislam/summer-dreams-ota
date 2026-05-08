/**
 * Utility for managing user chat sessions in localStorage
 */

const SESSION_KEY = "sd_chat_session";

export interface ChatSession {
  sessionId: string;
  name: string;
  contact: string;
  createdAt: number;
}

/**
 * Generates a unique session ID
 */
export function generateSessionId(): string {
  return crypto.randomUUID();
}

/**
 * Retrieves the current chat session from localStorage
 */
export function getChatSession(): ChatSession | null {
  if (typeof window === "undefined") return null;

  const stored = localStorage.getItem(SESSION_KEY);
  if (!stored) return null;

  try {
    return JSON.parse(stored) as ChatSession;
  } catch (e) {
    console.error("Failed to parse chat session", e);
    return null;
  }
}

/**
 * Saves a chat session to localStorage
 */
export function setChatSession(session: ChatSession): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

/**
 * Removes the chat session from localStorage
 */
export function clearChatSession(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(SESSION_KEY);
}
