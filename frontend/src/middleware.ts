import { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const response = intlMiddleware(request);
  const path = request.nextUrl.pathname;

  if (path.includes("/admin")) {
    response.headers.set("X-Frame-Options", "DENY");
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("Referrer-Policy", "no-referrer");
  }

  return response;
}

// Configure which routes should be handled by the middleware
export const config = {
  matcher: [
    // Match root path explicitly
    "/",
    // Match admin
    "/admin/:path*",
    // Match locale
    "/(en|ar)/:path*",
    // Match all other paths, ignoring Next.js internals and files with extensions
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
