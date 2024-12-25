"use client";

import { FileText, FolderKanban, Layout } from "lucide-react";
import Link from "next/link";
import { ReactElement } from "react";
import { usePathname } from "@/i18n/routing";

const DashboardSidebar = (): ReactElement => {
  const pathname = usePathname();

  const links = [
    { href: "/admin/dashboard", label: "Overview", icon: Layout },
    {
      href: "/admin/dashboard/projects",
      label: "Projects",
      icon: FolderKanban,
    },
    { href: "/admin/dashboard/blogs", label: "Blog Posts", icon: FileText },
  ];

  return (
    <div className="w-64 bg-gray-900 text-white p-4">
      <div className="mb-8">
        <h2 className="text-xl font-bold">Portfolio CMS</h2>
      </div>
      <nav className="space-y-2">
        {links.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-800 ${
              pathname === href ? "bg-gray-800" : ""
            }`}
          >
            <Icon size={20} />
            <span>{label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default DashboardSidebar;
