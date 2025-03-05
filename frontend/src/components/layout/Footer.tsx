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
      className="h-[650px] w-full fixed bottom-0 flex items-center justify-center
        bg-gradient-to-b lg:bg-gradient-to-l z-[2]
      from-neutral-100 to-cool-red/5 dark:from-neutral-800 dark:to-neutral-950"
    >
      <Content />
    </footer>
  );
};

const BigLogo = () => {
  return (
    <figure className="flex items-end rtl:flex-row-reverse rtl:justify-end">
      <strong className="text-3xl font-rakkas -mr-1.5 mb-2 leading-[0]">
        ـمر
      </strong>
      <Image
        src="/img/logo.svg"
        alt="Logo"
        width={40}
        height={40}
        className="dark:invert"
      />
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
  const cleanPathname = pathname.split("/")[1];

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
                      path === `/${cleanPathname}` &&
                      "underline underline-offset-4"
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

      <hr className="border-neutral-200 dark:border-neutral-700" />

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
