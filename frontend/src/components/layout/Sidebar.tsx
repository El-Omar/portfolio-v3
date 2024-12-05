"use client";

import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { usePathname } from "next/navigation";
import { ReactElement } from "react";
import { twMerge } from "tailwind-merge";
import { Button } from "../ui/Button";
import { Link } from "@/i18n/routing";
import { usePages } from "@/lib/hooks/usePages";
import { useThemeStore } from "@/stores/themeStore";

type Props = {
  toggleSidebar: () => void;
};

const Sidebar = ({ toggleSidebar }: Props): ReactElement => {
  const { isDarkMode, toggleTheme } = useThemeStore();
  const pathname = usePathname();
  const pages = usePages();

  return (
    <>
      <motion.div
        className="fixed w-full h-full inset-0 bg-neutral-600 dark:bg-neutral-200 z-50"
        onClick={toggleSidebar}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ ease: "circInOut", duration: 0.38 }}
      />
      <motion.div
        className="z-50 fixed w-80 h-screen bg-white right-0 top-0"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        transition={{ ease: "circInOut", duration: 0.38 }}
      >
        <ul className="w-80 h-[calc(100vh_-_6rem)] flex flex-col gap-2 pt-20 px-4 dark:bg-neutral-700 fixed right-0 top-0">
          {pages.map(({ path, label, icon }) => (
            <li key={path}>
              <Link
                href={path}
                className={twMerge(
                  "flex w-full items-center gap-3 py-3 pl-4 transition-colors",
                  pathname === path
                    ? "bg-neutral-200 dark:bg-cool-red text-cool-red dark:text-white"
                    : "hover:bg-neutral-100 dark:hover:bg-cool-red/20",
                )}
              >
                {icon}
                <p className="text-sm font-semibold">{label}</p>
              </Link>
            </li>
          ))}
        </ul>
        <div className="fixed flex flex-col justify-end bottom-0 h-24 w-80 p-4 bg-white dark:bg-neutral-700">
          <aside className="flex justify-between items-end border-t border-gray-300 dark:border-gray-500 pt-5">
            <Button onClick={toggleTheme} variant="secondary" size="icon">
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
          </aside>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
