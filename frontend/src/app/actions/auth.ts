"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { env } from "@/config/env";

const AUTH_TOKEN_KEY = "auth_token";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

export type LoginSchema = z.infer<typeof loginSchema>;

type LoginData = {
  token: string;
  user: {
    email: string;
  };
  maxAge: number;
};

export type LoginResult = {
  data?: LoginData;
  error?:
    | string
    | {
        [key in keyof LoginSchema]?: string[];
      };
};

export async function login(
  prevState: unknown,
  formData: FormData,
): Promise<LoginResult> {
  const rawFormData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const validationResults = loginSchema.safeParse(rawFormData);

  if (!validationResults.success) {
    return Promise.resolve({
      error: validationResults.error.flatten().fieldErrors,
    });
  }

  const { email, password } = validationResults.data;

  try {
    const res = await fetch(`${env.API_URL}/${env.CMS_ADMIN_PATH}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      return Promise.resolve({
        error: data.message,
      });
    }

    const userData = data.data as LoginData;

    const cookie = await cookies();

    cookie.set(AUTH_TOKEN_KEY, userData.token, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: userData.maxAge,
    });

    return Promise.resolve({});
  } catch (error) {
    console.log("Something went wrong my guy, ", error);
    throw new Error("Something went wrong with loggin in");
  }
}

export async function logout() {
  const cookie = await cookies();
  const token = cookie.get(AUTH_TOKEN_KEY);

  if (token) {
    cookie.delete(AUTH_TOKEN_KEY);
  }

  redirect("/");
}
