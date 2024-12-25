import { notFound } from "next/navigation";
import { ReactElement, ReactNode } from "react";
import DashboardSidebar from "./DashboardSidebar";
import { verifyAuth } from "@/lib/auth/verifyAuth";

type Props = {
  children: ReactNode;
};

const DashboardLayout = async ({ children }: Props): Promise<ReactElement> => {
  const verified = await verifyAuth();

  if (!verified.success) {
    notFound();
  }

  return (
    <div className="flex h-screen w-full md:px-16 px-4 py-6">
      <DashboardSidebar />
      <main className="flex-1 overflow-y-auto p-8 bg-gray-50">{children}</main>
    </div>
  );
};

export default DashboardLayout;
