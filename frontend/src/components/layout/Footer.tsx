import { useTranslations } from "next-intl";
import { ReactElement } from "react";
import Acknowledgments from "./Acknowledgments";
import BilingualLogo from "../ui/BilingualLogo";
import { Link } from "@/i18n/routing";
import { PAGES, usePages } from "@/lib/hooks/usePages";

const Footer = (): ReactElement => {
  const pages = usePages();
  const t = useTranslations("footer");

  return (
    <footer className="bg-neutral-100 shadow dark:bg-neutral-900">
      <div className="w-full max-w-screen-xl mx-auto p-4">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link
            href={PAGES.HOME}
            className="flex items-center justify-center sm:justify-start mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <BilingualLogo />
          </Link>
          <ul className="flex gap-6 items-center justify-center sm:justify-start text-sm ttext-neutral-600 dark:ttext-neutral-400">
            {pages.map(({ path, label }) => (
              <li key={path}>
                <Link href={path} className="">
                  <p className="">{label}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* <hr className="mb-6 border-gray-200 sm:mx-auto dark:border-gray-700" /> */}
        <span className="block text-sm text-gray-500 text-center my-4 dark:text-gray-400">
          {t("copyright", { year: new Date().getFullYear() })}{" "}
          <Acknowledgments />
        </span>
      </div>
    </footer>
  );
};

export default Footer;
