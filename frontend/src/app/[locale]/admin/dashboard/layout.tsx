import { notFound } from "next/navigation";
import { ReactElement, ReactNode } from "react";
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
    <div>
      This is my beautiful dashboard
      <h1>yes sir</h1>
      {children}
    </div>
  );
};

export default DashboardLayout;
