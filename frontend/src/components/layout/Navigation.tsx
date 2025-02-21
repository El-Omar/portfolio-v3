"use client";

import { motion } from "framer-motion";
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

  // Hide home page on mobile
  const pages = !isMobile ? allPages : allPages.slice(1);

  const pagesLookout = useMemo(() => {
    return pagesWithAccent.reduce<Record<string, NavItem>>((acc, page) => {
      acc[page.path] = page;
      return acc;
    }, {});
  }, [pagesWithAccent]);

  // To get the page and detail pages as well
  const cleanPathname = pathname.split("/")[1];
  const pageWithAccent = pagesLookout[`/${cleanPathname}`];
  const isHomePage = cleanPathname === "";

  return (
    <nav
      className="
        fixed z-[100] w-full backdrop-blur-sm shadow-sm dark:shadow-neutral-950 py-1
        bg-white/70 dark:bg-neutral-900/70"
    >
      <Container className="flex justify-between items-center">
        <Link href="/" className="p-2 -ml-2">
          <Logo />
        </Link>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="flex items-center gap-1"
        >
          {pages.map((page) => {
            if (page.path === pageWithAccent?.path) {
              if (isMobile && isHomePage) {
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
                  rounded-xl
                  hover:text-cool-red
                  transition-colors duration-300"
              >
                {page.label}
              </Link>
            );
          })}
        </motion.div>
        <ThemeLanguageToggles />
      </Container>
    </nav>
  );
};

export default Navigation;
