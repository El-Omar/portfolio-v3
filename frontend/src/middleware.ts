import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

// Configure which routes should be handled by the middleware
export const config = {
  matcher: [
    // Match root path explicitly
    "/",
    `/(en|ar)/:path*`,
    // Match all other paths, ignoring Next.js internals and files with extensions
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
