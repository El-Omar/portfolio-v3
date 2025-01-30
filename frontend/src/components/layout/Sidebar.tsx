"use client";

import { motion, MotionConfig } from "framer-motion";
import { Moon, Sun, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { Dispatch, ReactElement, SetStateAction } from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import { Button } from "../ui/Button";
import { Link } from "@/i18n/routing";
import { usePages } from "@/lib/hooks/usePages";
import { useThemeStore } from "@/stores/themeStore";

const Sidebar = ({
  toggleSidebar,
  isAnimating,
  setIsAnimating,
}: {
  toggleSidebar: () => void;
  isAnimating: boolean;
  setIsAnimating: Dispatch<SetStateAction<boolean>>;
}): ReactElement => {
  const { isDarkMode, toggleTheme } = useThemeStore();
  const pathname = usePathname();
  const locale = useLocale();
  const pages = usePages();

  return (
    <MotionConfig transition={{ ease: "circInOut", duration: 0.28 }}>
      <motion.div
        className="fixed inset-0 bg-black/5 backdrop-blur-md z-50"
        onClick={toggleSidebar}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <motion.div
        className="z-50 fixed h-screen rtl:left-0 right-0 top-0 w-full sm:w-[400px] bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl"
        initial={{ x: locale === "ar" ? "-100%" : "100%" }}
        animate={{ x: 0 }}
        exit={{ x: locale === "ar" ? "-100%" : "100%" }}
      >
        <div className="flex flex-col h-full">
          <nav className="flex-1 flex items-center">
            <ul className="w-full space-y-2 px-12">
              {pages.map(({ path, label }, i) => (
                <motion.li
                  key={path}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.15 }}
                >
                  <Link
                    onClick={toggleSidebar}
                    href={path}
                    className="block py-3 relative group"
                  >
                    <span className="text-4xl font-bold tracking-tight">
                      {label}
                    </span>
                    {pathname === path && (
                      <motion.div
                        layoutId="active"
                        className="absolute -left-6 top-1/2 -translate-y-1/2 w-2 h-2 bg-cool-red rounded-full"
                      />
                    )}
                    <span className="absolute left-0 right-0 h-px bottom-0 bg-neutral-200 dark:bg-neutral-800 scale-x-0 group-hover:scale-x-100 transition-transform" />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </nav>

          <div className="p-8 flex items-center justify-between border-t border-neutral-200 dark:border-neutral-800">
            <Button
              onClick={toggleTheme}
              variant="ghost"
              size="icon"
              className="text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
            <LanguageSwitcher
              isAnimating={isAnimating}
              setIsAnimating={setIsAnimating}
            />
          </div>
        </div>
      </motion.div>
    </MotionConfig>
  );
};

export default Sidebar;
