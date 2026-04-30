import { auth } from "@/auth";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest } from "next/server";

const intlMiddleware = createMiddleware(routing);

export default auth((req) => {
  // Logic to protect private routes
  const isAuthPage = req.nextUrl.pathname.includes("/login") || req.nextUrl.pathname.includes("/register");
  const isPrivatePage = req.nextUrl.pathname.includes("/dashboard") || req.nextUrl.pathname.includes("/booking");

  if (isPrivatePage && !req.auth) {
    return Response.redirect(new URL("/login", req.nextUrl));
  }

  if (isAuthPage && req.auth) {
    return Response.redirect(new URL("/", req.nextUrl));
  }

  return intlMiddleware(req);
});

export const config = {
  // Match only internationalized pathnames
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
