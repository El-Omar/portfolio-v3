import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type ThemeState = {
  isDarkMode: boolean;
  toggleTheme: () => void;
  setDarkTheme: (mode: boolean) => void;
};

/**
 * Util to use a state for the dark mode
 */
export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      isDarkMode: false,
      toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      setDarkTheme: (theme) => set({ isDarkMode: theme }),
    }),
    {
      name: "theme-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ isDarkMode: state.isDarkMode }),
    }
  )
);
