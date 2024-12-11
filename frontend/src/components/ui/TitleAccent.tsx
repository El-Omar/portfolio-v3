import { useLocale } from "next-intl";
import { ReactElement, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const TitleAccent = ({ children }: Props): ReactElement => {
  const locale = useLocale();
  const isArabic = locale === "ar";

  return (
    <span
      className={`font-${!isArabic ? "baskerville" : "rakkas"} text-cool-red`}
    >
      {children}
    </span>
  );
};

export default TitleAccent;
