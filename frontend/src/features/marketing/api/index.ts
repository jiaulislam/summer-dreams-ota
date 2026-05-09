"use server";

import { apiClient } from "@/lib/api-client";
import { LandingPageData } from "@/types";

export async function getLandingPageData(): Promise<LandingPageData> {
  return apiClient("/marketing/landing-page/", {
    method: "GET",
    requireAuth: false,
  });
}

export async function submitContactForm(data: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}): Promise<{ success: boolean; message: string }> {
  return apiClient("/marketing/contact-us/", {
    method: "POST",
    body: JSON.stringify(data),
    requireAuth: false,
  });
}
