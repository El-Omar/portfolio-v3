import { Github, Linkedin } from "lucide-react";
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
      icon: <Github className="w-5 h-5" />,
      href: "https://github.com/El-Omar/",
      label: "GitHub",
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      href: "https://www.linkedin.com/in/el-omar/",
      label: "LinkedIn",
    },
  ];

  return (
    <footer className="w-full border-t border-neutral-200 dark:border-neutral-800">
      <div className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          {/* Logo & Description */}
          <div className="space-y-4">
            <Link href={PAGES.HOME}>
              <BilingualLogo />
            </Link>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Developer, designer, and occasional writer. Building digital
              experiences with purpose.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium uppercase tracking-wider text-neutral-400">
              Navigation
            </h3>
            <nav>
              <ul className="space-y-3">
                {pages.map(({ path, label }) => (
                  <li key={path}>
                    <Link
                      href={path}
                      className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium uppercase tracking-wider text-neutral-400">
              Connect
            </h3>
            <div className="flex gap-4">
              {socialLinks.map(({ icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Copyright */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium uppercase tracking-wider text-neutral-400">
              Legal
            </h3>
            <div className="text-sm text-neutral-600 dark:text-neutral-400">
              {t("copyright", { year: new Date().getFullYear() })}
            </div>
            <div className="text-sm text-neutral-500 dark:text-neutral-500">
              <Acknowledgments />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
