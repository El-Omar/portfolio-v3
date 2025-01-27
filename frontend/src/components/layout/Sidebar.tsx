"use client";

import { motion } from "framer-motion";
import { Moon, Sun, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { Dispatch, ReactElement, SetStateAction } from "react";
import { twMerge } from "tailwind-merge";
import LanguageSwitcher from "./LanguageSwitcher";
import { Button } from "../ui/Button";
import Title from "../ui/Title";
import TitleAccent from "../ui/TitleAccent";
import { Link } from "@/i18n/routing";
import { useThemeStore } from "@/stores/themeStore";

type Props = {
  toggleSidebar: () => void;
  isAnimating: boolean;
  setIsAnimating: Dispatch<SetStateAction<boolean>>;
};

const menuItems = [
  { path: "/", label: "home" },
  { path: "/blog", label: "writing" },
  { path: "/about", label: "about" },
  { path: "/contact", label: "contact" },
];

const Sidebar = ({
  toggleSidebar,
  isAnimating,
  setIsAnimating,
}: Props): ReactElement => {
  const { isDarkMode, toggleTheme } = useThemeStore();
  const pathname = usePathname();
  const locale = useLocale();

  return (
    <>
      <motion.div
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
        onClick={toggleSidebar}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      />
      <motion.div
        className="z-50 fixed w-[min(100vw,520px)] h-screen bg-white dark:bg-neutral-900 rtl:left-0 right-0 top-0"
        initial={{ x: locale === "ar" ? "-100%" : "100%" }}
        animate={{ x: 0 }}
        exit={{ x: locale === "ar" ? "-100%" : "100%" }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="relative h-40 border-b border-neutral-200 dark:border-neutral-800">
            <div className="relative p-8 flex flex-col justify-between h-full">
              <Button
                variant="ghost"
                onClick={toggleSidebar}
                className="absolute top-6 right-8 hover:bg-transparent"
              >
                <X className="w-8 h-8 text-cool-red" />
              </Button>
              <div className="space-y-2">
                <Title className="text-5xl">
                  Navigation<TitleAccent>.</TitleAccent>
                </Title>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-12">
            <ul className="px-8 space-y-8">
              {menuItems.map(({ path, label }) => (
                <li key={path}>
                  <Link
                    onClick={toggleSidebar}
                    href={path}
                    className={twMerge(
                      "block transition-colors relative group",
                      pathname === path
                        ? "text-neutral-900 dark:text-white"
                        : "text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300",
                    )}
                  >
                    <Title className="text-6xl md:text-7xl group-hover:text-cool-red transition-colors">
                      {label}
                      {pathname === path && (
                        <TitleAccent className="ml-4">.</TitleAccent>
                      )}
                    </Title>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer */}
          <div className="border-t border-neutral-200 dark:border-neutral-800 p-8">
            <div className="flex items-center justify-between">
              <Button
                onClick={toggleTheme}
                variant="ghost"
                size="icon"
                className="text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
              >
                {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
              </Button>
              <LanguageSwitcher
                isAnimating={isAnimating}
                setIsAnimating={setIsAnimating}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
