import { env } from "../config/env";

/** Key for storing the token */
export const AUTH_TOKEN_KEY = "auth_token";

export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: env.NODE_ENV === "production",
  sameSite: "strict",
  path: "/",
} as const;