"use client";

import { Moon, Sun } from "lucide-react";
import { ReactElement } from "react";
import { Toggle } from "../ui/Toggle";
import { usePathname, useRouter } from "@/i18n/routing";
import { useThemeStore } from "@/stores/themeStore";

const ThemeLanguageToggles = (): ReactElement => {
  const { isDarkMode, toggleTheme } = useThemeStore();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex items-center gap-2 lg:gap-3 pl-4 lg:pl-6 border-l border-neutral-200">
      <Toggle
        pressed={isDarkMode}
        onPressedChange={toggleTheme}
        size="sm"
        className="border bg-white
          data-[state=on]:border-primary
          hover:bg-neutral-50 transition-colors"
      >
        {isDarkMode ? <Moon size={16} /> : <Sun size={16} />}
      </Toggle>

      <Toggle
        pressed={pathname.startsWith("/ar")}
        onPressedChange={() => {
          const newLocale = pathname.startsWith("/ar") ? "en" : "ar";
          router.push(pathname, { locale: newLocale });
        }}
        size="sm"
        className="border bg-white
          data-[state=on]:border-primary text-sm
          hover:bg-neutral-50 transition-colors"
      >
        <span className="text-sm font-medium">
          {pathname.startsWith("/ar") ? "EN" : "ع"}
        </span>
      </Toggle>
    </div>
  );
};

export default ThemeLanguageToggles;
