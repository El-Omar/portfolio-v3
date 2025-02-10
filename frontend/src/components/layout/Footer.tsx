import { Github, Linkedin, Mail } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ReactElement } from "react";
import Container from "../ui/Container";
import { Link, usePathname } from "@/i18n/routing";
import { PAGES, usePagesWithAccent } from "@/lib/hooks/usePages";

const Footer = (): ReactElement => {
  return (
    <footer
      className="w-full relative h-[100vh] lg:h-[600px]"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="relative h-[calc(100vh+100vh)] lg:h-[calc(100vh+600px)] -top-[100vh]">
        <div
          className="h-[100vh] lg:h-[600px] sticky top-[calc(100vh-100vh)] lg:top-[calc(100vh-600px)]
            bg-gradient-to-b lg:bg-gradient-to-l
          from-neutral-100 to-cool-red/5 dark:from-neutral-900 dark:to-neutral-800"
        >
          <Content />
        </div>
      </div>
    </footer>
  );
};

const BigLogo = () => {
  return (
    <figure className="flex items-end rtl:flex-row-reverse rtl:justify-end">
      <strong className="text-3xl font-rakkas -mr-1.5 mb-2 leading-[0]">
        ـمر
      </strong>
      <Image src="/img/logo.svg" alt="Logo" width={40} height={40} />
      <span className="text-3xl font-pacifico mt-0 -ml-1.5 leading-[0] self-center">
        omar
      </span>
    </figure>
  );
};

const Content = () => {
  const pages = usePagesWithAccent();
  const t = useTranslations("footer");
  const pathname = usePathname();

  const socialLinks = [
    {
      icon: <Mail className="w-5 h-5" />,
      href: "mailto:elomar.sami@gmail.com",
      label: "Email",
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      href: "https://www.linkedin.com/in/el-omar/",
      label: "LinkedIn",
    },
    {
      icon: <Github className="w-5 h-5" />,
      href: "https://github.com/El-Omar/",
      label: "GitHub",
    },
  ];

  return (
    <Container className="py-20 rounded-lg relative z-20 flex flex-col gap-12">
      <div className="flex flex-col lg:flex-row justify-between gap-16">
        <div className="lg:w-2/5 space-y-6">
          <Link href={PAGES.HOME} className="hidden lg:block">
            <BigLogo />
          </Link>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-sm">
            {t("description")}
          </p>
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

        <div className="grid grid-cols-1 gap-16 lg:w-1/2">
          <nav className="text-right">
            <ul className="space-y-4">
              {pages.map(({ path, label }) => (
                <li key={path}>
                  <Link
                    href={path}
                    className={`hover:text-cool-red transition-colors duration-300 text-3xl font-dm-sans ${
                      pathname === path && "underline underline-offset-4"
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <hr className="border-neutral-200 dark:border-neutral-800" />

      <div className="flex justify-between lg:items-center items-start text-sm text-neutral-600 dark:text-neutral-400">
        <p className="w-">
          {t.rich("copyright", {
            year: new Date().getFullYear(),
            space: () => <br className="block lg:hidden" />,
          })}
        </p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors flex items-center gap-2"
        >
          {t("backToTop")}
        </button>
      </div>
    </Container>
  );
};

export default Footer;
