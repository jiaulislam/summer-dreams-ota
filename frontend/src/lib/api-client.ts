import { auth, signOut } from "@/auth";
import { API_URL } from "./constants";
import { redirect } from "next/navigation";
import { getLocale } from "next-intl/server";

type FetchOptions = RequestInit & {
  params?: Record<string, string>;
  requireAuth?: boolean;
};

export async function apiClient(endpoint: string, options: FetchOptions = {}) {
  const { params, requireAuth = true, ...customConfig } = options;

  let accessToken = null;
  let session = null;
  const locale = await getLocale();

  if (requireAuth) {
    session = await auth();
    accessToken = session?.accessToken;
  }

  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const url = new URL(`${API_URL}${cleanEndpoint}`);

  if (params) {
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
  }

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    "Accept-Language": locale,
    ...customConfig.headers,
  };

  if (accessToken) {
    (headers as Record<string, string>)["Authorization"] = `Bearer ${accessToken}`;
  }

  const config: RequestInit = {
    ...customConfig,
    headers,
  };

  let response = await fetch(url.toString(), config);

  if (response.status === 401 && requireAuth) {
    const refreshToken = session?.refreshToken;
    // ... refresh logic ...

    let refreshSuccessful = false;
    let newAccessToken = null;

    if (refreshToken) {
      try {
        const refreshResponse = await fetch(`${API_URL}/auth/token/refresh/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refresh: refreshToken }),
        });

        if (refreshResponse.ok) {
          const data = await refreshResponse.json();
          newAccessToken = data.access;
          refreshSuccessful = true;
        }
      } catch {
        // Silent fail, redirect handled below
      }
    }

    if (refreshSuccessful && newAccessToken) {
      (config.headers as Record<string, string>)["Authorization"] = `Bearer ${newAccessToken}`;
      response = await fetch(url.toString(), config);
    } else {
      await signOut({ redirect: false });
      redirect("/login");
    }
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || errorData.message || "An unexpected error occurred");
  }

  return response.json();
}
