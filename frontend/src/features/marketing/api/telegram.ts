"use server";

import { apiClient } from "@/lib/api-client";

export async function sendChatMessage(payload: any) {
  return apiClient("/telegram/send/", {
    method: "POST",
    body: JSON.stringify(payload),
    requireAuth: false,
  });
}

export async function pollChatMessages(sessionId: string) {
  return apiClient("/telegram/messages/", {
    method: "GET",
    params: { session_id: sessionId },
    requireAuth: false,
  });
}
