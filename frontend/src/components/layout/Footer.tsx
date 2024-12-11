import { useTranslations } from "next-intl";
import { ReactElement } from "react";
import Acknowledgments from "./Acknowledgments";
import BilingualLogo from "../ui/BilingualLogo";
import { Link } from "@/i18n/routing";
import { PAGES, usePages } from "@/lib/hooks/usePages";

const Footer = (): ReactElement => {
  const pages = usePages();
  const t = useTranslations("footer");

  const socialLinks = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
          <path d="M9 18c-4.51 2-5-2-7-2"></path>
        </svg>
      ),
      href: "https://github.com/El-Omar/",
      label: "GitHub",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
          <rect width="4" height="12" x="2" y="9"></rect>
          <circle cx="4" cy="4" r="2"></circle>
        </svg>
      ),
      href: "https://www.linkedin.com/in/el-omar/",
      label: "LinkedIn",
    },
  ];

  return (
    <footer className="bg-neutral-800 dark:bg-neutral-900 shadow">
      <div className="w-full max-w-screen-xl mx-auto p-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <Link
              href={PAGES.HOME}
              className="flex items-center justify-center sm:justify-start"
            >
              <BilingualLogo invert />
            </Link>

            <nav>
              <ul className="flex flex-wrap gap-6 items-center justify-center sm:justify-end text-sm text-neutral-300 dark:text-neutral-400">
                {pages.map(({ path, label }) => (
                  <li key={path}>
                    <Link
                      href={path}
                      className="hover:text-neutral-100 dark:hover:text-neutral-300 transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Middle Section: Social Links */}
          <div className="flex justify-center gap-6">
            {socialLinks.map(({ icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                rel="noopener noreferrer"
                target="_blank"
                className="text-neutral-500 hover:text-neutral-400 dark:text-neutral-600 dark:hover:text-neutral-500 transition-colors"
              >
                {icon}
              </a>
            ))}
          </div>

          {/* Bottom Section: Copyright and Acknowledgments */}
          <div className="flex flex-col items-center gap-2 text-sm text-neutral-400 dark:text-neutral-500">
            <span>
              {t("copyright", { year: new Date().getFullYear() })}{" "}
              <Acknowledgments />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
