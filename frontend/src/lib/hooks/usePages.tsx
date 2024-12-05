import { BookText, House, Send, Signature } from "lucide-react";
import { useTranslations } from "next-intl";
import { ReactElement } from "react";

type NavItem = {
  path: string;
  label: string;
  icon: ReactElement;
};

export const PAGES = {
  HOME: "/",
  ABOUT: "/about",
  BLOG: "/blog",
  CONTACT: "/contact",
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
    { path: PAGES.BLOG, label: t("blog"), icon: <BookText size={20} /> },
    { path: PAGES.CONTACT, label: t("contact"), icon: <Send size={20} /> },
  ];

  return navItems;
};
