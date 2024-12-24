import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import LoginForm from "./LoginForm";
import { env } from "@/config/env";
import { AUTH_TOKEN_KEY } from "@/constants/auth";
import { verifyAuth } from "@/lib/auth/verifyAuth";

export default async function AdminRoute({
  params,
}: {
  params: Promise<{ path?: string[] }>;
}) {
  const secretPath = env.CMS_ADMIN_PATH;
  const pars = await params;

  // If accessing just /admin, redirect away
  if (!pars.path || pars.path.length === 0) {
    notFound();
  }

  const currentPath = pars.path.join("");

  // Check if the path matches our secret
  if (currentPath !== secretPath) {
    notFound();
  }

  const cookie = await cookies();
  const token = cookie.get(AUTH_TOKEN_KEY);

  if (!token) {
    return <LoginForm />;
  }

  try {
    await verifyAuth(token.value);
    return <h1>Logged in</h1>;
  } catch {
    return <LoginForm />;
  }
}
