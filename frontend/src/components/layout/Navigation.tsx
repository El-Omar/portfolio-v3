"use client";

import { ReactElement, useMemo } from "react";
import ThemeLanguageToggles from "./ThemeLanguageToggles";
import Container from "../ui/Container";
import Logo from "../ui/Logo";
import { Link, usePathname } from "@/i18n/routing";
import { useIsMobile } from "@/lib/hooks/useIsMobile";
import { NavItem, usePages, usePagesWithAccent } from "@/lib/hooks/usePages";

const Navigation = (): ReactElement => {
  const pathname = usePathname();
  const allPages = usePages();
  const pagesWithAccent = usePagesWithAccent();
  const isMobile = useIsMobile();

  const pagesLookout = useMemo(() => {
    return pagesWithAccent.reduce<Record<string, NavItem>>((acc, page) => {
      acc[page.path] = page;
      return acc;
    }, {});
  }, [pagesWithAccent]);

  // Hide home page on mobile
  const pages = !isMobile ? allPages : allPages.slice(1);

  const pageWithAccent = pagesLookout[pathname];

  return (
    <nav
      className="
        fixed z-[100] w-full backdrop-blur-sm shadow-sm py-2
        bg-white/70 dark:bg-neutral-900"
    >
      <Container className="flex justify-between items-center">
        <Link href="/" className="p-2 -ml-2">
          <Logo />
        </Link>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            {pages.map((page) => {
              if (page.path === pageWithAccent?.path) {
                if (isMobile && page.path === "/") {
                  return null;
                }

                return (
                  <Link
                    key={page.path}
                    href={page.path}
                    className="lg:px-4 px-3 py-2 text-xs lg:text-sm font-medium
                      underline underline-offset-2
                      text-primary transition-colors"
                  >
                    {isMobile ? page.label : pageWithAccent.label}
                  </Link>
                );
              }

              return (
                <Link
                  key={page.path}
                  href={page.path}
                  className="lg:px-4 px-3 py-2 text-xs lg:text-sm font-medium 
                    rounded-xl text-neutral-600
                    hover:text-cool-red
                    transition-colors duration-300"
                >
                  {page.label}
                </Link>
              );
            })}
          </div>
          <ThemeLanguageToggles />
        </div>
      </Container>
    </nav>
  );
};

export default Navigation;
