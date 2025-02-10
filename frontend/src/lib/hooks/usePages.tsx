import { BookText, House, Send, Signature } from "lucide-react";
import { useTranslations } from "next-intl";
import { ReactNode } from "react";
import TitleAccent from "@/components/ui/TitleAccent";

type NavItem = {
  path: string;
  label: ReactNode;
  icon: ReactNode;
};

export const PAGES = {
  HOME: "/",
  ABOUT: "/about",
  PROJECTS: "/projects",
  BLOG: "/blog",
};

/**
 * Hook to get the pages of the website
 * @returns Array of the navigation translated with their icons & paths
 */
export const usePages = (): NavItem[] => {
  const t = useTranslations("navigation");

  const navItems: NavItem[] = [
    { path: PAGES.HOME, label: t("home"), icon: <House size={20} /> },
    { path: PAGES.ABOUT, label: t("about"), icon: <Signature size={20} /> },
    { path: PAGES.PROJECTS, label: t("projects"), icon: <Send size={20} /> },
    { path: PAGES.BLOG, label: t("blog"), icon: <BookText size={20} /> },
  ];

  return navItems;
};
/**
 * Hook to get the pages of the website with accent
 * @returns Array of the navigation translated with their icons & paths
 */
export const usePagesWithAccent = (): NavItem[] => {
  const t = useTranslations("navigation");

  const navItems: NavItem[] = [
    {
      path: PAGES.HOME,
      label: t.rich("homeWithAccent", {
        accent: (chunks) => <TitleAccent>{chunks}</TitleAccent>,
      }),
      icon: <House size={20} />,
    },
    {
      path: PAGES.ABOUT,
      label: t.rich("aboutWithAccent", {
        accent: (chunks) => <TitleAccent>{chunks}</TitleAccent>,
      }),
      icon: <Signature size={20} />,
    },
    {
      path: PAGES.PROJECTS,
      label: t.rich("projectsWithAccent", {
        accent: (chunks) => <TitleAccent>{chunks}</TitleAccent>,
      }),
      icon: <Send size={20} />,
    },
    {
      path: PAGES.BLOG,
      label: t.rich("blogWithAccent", {
        accent: (chunks) => <TitleAccent>{chunks}</TitleAccent>,
      }),
      icon: <BookText size={20} />,
    },
  ];

  return navItems;
};
