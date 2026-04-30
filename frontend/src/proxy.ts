import { auth } from "@/auth";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  // Define public and private routes
  // We check if the path starts with a locale or is just the path
  const path = nextUrl.pathname;

  // Regex to match paths ignoring the locale prefix (en|es)
  const isAuthPage = /^\/(?:en|es)?\/(?:login|signup)$/.test(path) || path === "/login" || path === "/signup";
  const isPrivatePage = /^\/(?:en|es)?\/(?:dashboard|booking)/.test(path) || path.startsWith("/dashboard") || path.startsWith("/booking");

  if (isPrivatePage) {
    if (!isLoggedIn) {
      // Redirect to login, preserving the intended destination if possible
      // Note: for simplicity we just redirect to /login
      const locale = path.split("/")[1];
      const loginPath = ["en", "es"].includes(locale) ? `/${locale}/login` : "/login";
      return Response.redirect(new URL(loginPath, nextUrl));
    }
  }

  if (isAuthPage) {
    if (isLoggedIn) {
      const locale = path.split("/")[1];
      const homePath = ["en", "es"].includes(locale) ? `/${locale}` : "/";
      return Response.redirect(new URL(homePath, nextUrl));
    }
  }

  return intlMiddleware(req);
});

export const config = {
  // Match only internationalized pathnames
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
