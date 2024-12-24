import { notFound, redirect } from "next/navigation";
import LoginForm from "./LoginForm";
import { env } from "@/config/env";
import { verifyAuth } from "@/lib/auth/verifyAuth";

export default async function AdminRoute({
  params,
}: {
  params: Promise<{ path?: string[] }>;
}) {
  const secretPath = env.CMS_ADMIN_PATH;
  const pars = await params;

  if (!pars.path || pars.path.length === 0) {
    notFound();
  }

  const currentPath = pars.path.join("");

  if (currentPath !== secretPath) {
    notFound();
  }

  const verified = await verifyAuth();

  if (verified.success) {
    redirect("/admin/dashboard");
  }

  return <LoginForm />;
}
