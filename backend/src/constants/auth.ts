import { env } from "../config/env";

/** Key for storing the token */
export const AUTH_TOKEN_KEY = "auth_token";

export const COOKIE_OPTIONS = {
  secure: env.NODE_ENV === "production",
  httpOnly: true,
  sameSite: "strict",
  path: "/",
} as const;