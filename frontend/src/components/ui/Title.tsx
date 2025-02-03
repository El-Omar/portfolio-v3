import { useLocale } from "next-intl";
import { CSSProperties, ReactElement, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

const Title = ({
  children,
  className: _className = "",
  style,
}: Props): ReactElement => {
  const locale = useLocale();
  const isArabic = locale === "ar";

  const className = twMerge(
    "text-4xl md:text-6xl md:leading-tight",
    !isArabic ? "tracking-tight font-dm-sans" : "font-amiri",
    _className,
  );

  return (
    <h2 className={className} style={style}>
      {children}
    </h2>
  );
};

export default Title;
