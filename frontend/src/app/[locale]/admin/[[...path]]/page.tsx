import { notFound } from "next/navigation";
import LoginForm from "./LoginForm";
import { env } from "@/config/env";

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

  return <LoginForm />;
}
