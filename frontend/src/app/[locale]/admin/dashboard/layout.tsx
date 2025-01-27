import { notFound } from "next/navigation";
import { ReactElement, ReactNode } from "react";
import { verifyAuth } from "@/lib/auth/verifyAuth";
import DashboardSidebar from "./DashboardSidebar";

type Props = {
  children: ReactNode;
};

const DashboardLayout = async ({ children }: Props): Promise<ReactElement> => {
  const verified = await verifyAuth();

  if (!verified.success) {
    notFound();
  }

  return (
    <div className="flex min-h-screen w-full md:px-16 px-4 py-6">
      <DashboardSidebar />
      <main className="flex-1 p-8 shadow-lg rounded-lg bg-white">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
