"use server";

import { AUTH, LoginResponse, loginSchema } from "@portfolio-v3/shared";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { env } from "@/config/env";
import { authClient } from "@/lib/api/auth-client";

export type LoginSchema = z.infer<typeof loginSchema>;

export type LoginResult = {
  data?: LoginResponse;
  error?:
    | string
    | {
        [key in keyof LoginSchema]?: string[];
      };
};

export async function login(
  _prevState: unknown,
  formData: FormData,
): Promise<LoginResult> {
  const rawFormData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const validationResults = loginSchema.safeParse(rawFormData);

  if (!validationResults.success) {
    return {
      error: validationResults.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validationResults.data;

  try {
    const userData = await authClient.login(email, password);
    const cookie = await cookies();

    if (userData.status !== "success") {
      return {
        error: userData.message,
      };
    }

    const { token, maxAge } = userData.data;

    cookie.set(AUTH.KEY, token, {
      ...AUTH.OPTIONS,
      secure: env.NODE_ENV === "production",
      maxAge: maxAge / 1000,
    });

    return {
      data: userData.data,
    };
  } catch (error) {
    console.log("Something went wrong my guy, ", error);
    return {
      error: `Something went wrong with logging in: ${error}`,
    };
  }
}

export async function logout() {
  const cookie = await cookies();
  const token = cookie.get(AUTH.KEY);

  if (token) {
    cookie.delete(AUTH.KEY);
  }

  redirect("/admin");
}
