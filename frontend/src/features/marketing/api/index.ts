"use server";

import { apiClient } from "@/lib/api-client";
import { LandingPageData } from "@/types";

export async function getLandingPageData(): Promise<LandingPageData> {
  return apiClient("/marketing/landing-page/", {
    method: "GET",
    requireAuth: false,
  });
}
