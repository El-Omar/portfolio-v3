type Options = {
  sameSite?: boolean | "lax" | "strict" | "none";
  httpOnly?: boolean;
  path?: string;
};

/** Auth cookie information, like key of the cookie and its options */
export const AUTH: {
  KEY: string;
  OPTIONS: Options;
} = {
  KEY: "auth_token",
  OPTIONS: {
    httpOnly: true,
    sameSite: "strict",
  },
};
