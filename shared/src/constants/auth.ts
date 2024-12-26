/** Auth cookie information, like key of the cookie and its options */
export const AUTH = {
  KEY: "auth_token",
  OPTIONS: {
    httpOnly: true,
    sameSite: "strict",
    path: "/",
  },
};