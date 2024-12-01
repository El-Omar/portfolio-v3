"use client";

import { useThemeStore } from "@/stores/themeStore";
import { ReactElement, ReactNode, useEffect } from "react";

type Props = {
  children: ReactNode;
};

const ThemeProvider = ({ children }: Props): ReactElement => {
  const { isDarkMode } = useThemeStore();

  useEffect(() => {
    // Update the HTML class when the theme changes
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return <>{children}</>;
};

export default ThemeProvider;
