"use client";

import { motion } from "framer-motion";
import {
  BookText,
  FileDown,
  House,
  Moon,
  Send,
  Signature,
  Sun,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactElement } from "react";
import { twMerge } from "tailwind-merge";
import { Button } from "../ui/Button";
import { useThemeStore } from "@/stores/themeStore";

type NavItem = {
  path: string;
  label: string;
  icon: ReactElement;
};

const navItems: NavItem[] = [
  { path: "/", label: "Home", icon: <House size={20} /> },
  { path: "/about", label: "About me", icon: <Signature size={20} /> },
  { path: "/blog", label: "Blog", icon: <BookText size={20} /> },
  { path: "/resume", label: "Resume", icon: <FileDown size={20} /> },
  { path: "/contact", label: "Contact", icon: <Send size={20} /> },
];

type Props = {
  toggleSidebar: () => void;
};

const Sidebar = ({ toggleSidebar }: Props): ReactElement => {
  const { isDarkMode, toggleTheme } = useThemeStore();
  const pathname = usePathname();

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
        className="z-50 fixed w-80 h-screen"
        animate={{ x: 0 }}
        transition={{ ease: "circInOut", duration: 0.38 }}
        initial={{ x: -300 }}
      >
        <ul className="w-80 h-[calc(100vh_-_5rem)] pt-20 px-4 bg-white dark:bg-neutral-700 fixed left-0 top-0">
          {navItems.map(({ path, label, icon }) => (
            <li key={path}>
              <Link
                href={path}
                className={twMerge(
                  "flex w-full items-center gap-3 rounded-lg py-3 pl-4 font-semibold transition-colors",
                  pathname === path
                    ? "bg-neutral-200 dark:bg-cool-red text-cool-red dark:text-white"
                    : "hover:bg-neutral-100 dark:hover:bg-cool-red/20",
                )}
              >
                {icon}
                <p className="mr-auto text-sm">{label}</p>
              </Link>
            </li>
          ))}
        </ul>
        <div className="fixed bottom-0 h-20 w-80 p-4 bg-white dark:bg-neutral-700">
          <aside className="flex justify-between border-t border-gray-300 dark:border-gray-500 py-2">
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
