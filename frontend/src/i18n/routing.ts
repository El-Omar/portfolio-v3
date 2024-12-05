import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

const LOCALES = ["en", "ar"] as const;
export type Locale = (typeof LOCALES)[number];

// Define all your routes and their translations
export const routing = defineRouting({
  locales: LOCALES,
  defaultLocale: "en",
  localePrefix: "as-needed",
  localeDetection: false,
  alternateLinks: false,
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
