"use client";

import { Download, ExternalLink, Linkedin, User } from "lucide-react";
import { useTranslations } from "next-intl";
import { ReactElement } from "react";
import { Link } from "@/i18n/routing";

const LINKS = [
  {
    id: "linkedin",
    href: "https://www.linkedin.com/in/el-omar/",
    icon: Linkedin,
    external: true,
    download: false,
  },
  {
    id: "agency",
    href: "https://lomy.studio",
    icon: ExternalLink,
    external: true,
    download: false,
  },
  {
    id: "portfolio",
    href: "/",
    icon: User,
    external: false,
    download: false,
  },
  {
    id: "resume",
    href: "/Resume-Elomar_Sami-Jan_2026.pdf",
    icon: Download,
    external: true,
    download: true,
  },
] as const;

const CardContent = (): ReactElement => {
  const t = useTranslations("card");

  return (
    <div className="w-full max-w-md space-y-8">
      <header className="text-center space-y-2">
        <h1 className="text-3xl md:text-4xl font-dm-sans tracking-tight">
          {t("title")}
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400">
          {t("description")}
        </p>
      </header>

      <nav className="flex flex-col gap-3">
        {LINKS.map(({ id, href, icon: Icon, external, download }) => {
          const linkProps = external
            ? {
                href,
                target: "_blank",
                rel: "noopener noreferrer",
                ...(download && { download: true }),
              }
            : {};

          const className =
            "group flex items-center justify-between px-6 py-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 hover:border-cool-red dark:hover:border-cool-red hover:bg-cool-red/5 dark:hover:bg-cool-red/10 transition-all duration-300";

          if (external) {
            return (
              <a key={id} href={href} className={className} {...linkProps}>
                <span className="font-medium">{t(`links.${id}`)}</span>
                <Icon className="w-5 h-5 text-neutral-500 group-hover:text-cool-red transition-colors" />
              </a>
            );
          }

          return (
            <Link key={id} href={href} className={className}>
              <span className="font-medium">{t(`links.${id}`)}</span>
              <Icon className="w-5 h-5 text-neutral-500 group-hover:text-cool-red transition-colors" />
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default CardContent;
