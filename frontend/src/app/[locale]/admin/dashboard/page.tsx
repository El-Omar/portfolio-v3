import { ReactElement } from "react";
import DashboardCard from "./DashboardCard";

const Dashboard = (): ReactElement => {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <DashboardCard
          title="Projects"
          count="5"
          href="/admin/dashboard/projects"
          description="Manage your portfolio projects"
        />
        <DashboardCard
          title="Blog Posts"
          count="8"
          href="/admin/dashboard/blogs"
          description="Manage your blog content"
        />
      </div>
    </div>
  );
};

export default Dashboard;
