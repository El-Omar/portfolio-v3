import { useLocale } from "next-intl";
import { ReactElement, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  children: ReactNode;
  className?: string;
};

const TitleAccent = ({ children, className }: Props): ReactElement => {
  const locale = useLocale();
  const isArabic = locale === "ar";

  return (
    <span
      className={twMerge(
        `font-${!isArabic ? "baskerville" : "rakkas"}`,
        className
      )}
    >
      {children}
    </span>
  );
};

export default TitleAccent;
