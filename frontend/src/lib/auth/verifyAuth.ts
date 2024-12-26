import { AUTH } from "@portfolio-v3/shared";
import { jwtVerify, JWTVerifyResult } from "jose";
import { cookies } from "next/headers";
import { env } from "@/config/env";

type AuthResult =
  | {
      success: true;
      payload: JWTVerifyResult["payload"];
    }
  | {
      success: false;
      error: unknown;
    };

export const verifyAuth = async (): Promise<AuthResult> => {
  const cookie = await cookies();
  const token = cookie.get(AUTH.KEY);

  if (!token) {
    return {
      success: false,
      error: new Error("No token found"),
    };
  }

  try {
    const verified = await jwtVerify(
      token.value,
      new TextEncoder().encode(env.JWT_SECRET),
    );

    return { success: true, payload: verified.payload };
  } catch (error) {
    return { success: false, error };
  }
};
