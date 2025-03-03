import { ReactElement } from "react";

const ThemeScript = (): ReactElement => {
  const themeScript = `
    (function() {
      try {
        const storedTheme = localStorage.getItem("theme-store");
        if (storedTheme) {
          const parsedTheme = JSON.parse(storedTheme);
          if (parsedTheme.state && parsedTheme.state.isDarkMode) {
            document.documentElement.classList.add("dark");
          } else {
            document.documentElement.classList.remove("dark");
          }
        }
      } catch (e) {
        console.error("Error applying theme:", e);
      }
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: themeScript }} />;
};

export default ThemeScript;
