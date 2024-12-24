import { jwtVerify } from "jose";
import { env } from "@/config/env";

export const verifyAuth = async (token: string) => {
  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(env.JWT_SECRET),
    );

    return verified.payload;
  } catch (error) {
    console.log(error);
    throw new Error("Invalid token");
  }
};
