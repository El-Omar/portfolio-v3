import { useLocale } from "next-intl";
import { ReactElement, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  children: ReactNode;
  className?: string;
};

const Title = ({
  children,
  className: _className = "",
}: Props): ReactElement => {
  const locale = useLocale();
  const isArabic = locale === "ar";

  const className = twMerge(
    "text-4xl md:text-6xl md:leading-tight",
    !isArabic ? "tracking-tight font-dm-sans" : "font-amiri",
    _className,
  );

  return <h2 className={className}>{children}</h2>;
};

export default Title;
