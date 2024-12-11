import { useTranslations } from "next-intl";
import { ReactElement } from "react";

import Paragraph from "../ui/Paragraph";
import Title from "../ui/Title";
import DevelopImage from "@/components/assets/control-panel-bro.svg";

const Develop = (): ReactElement => {
  const t = useTranslations("home.expertise");

  return (
    <article className="flex bg-white dark:bg-neutral-700 flex-col justify-center gap-2 relative lg:flex-row items-center md:gap-4 shadow- rounded-3xl p-4 md:p-8">
      <div
        className="rounded-3xl absolute bottom-0 w-full h-1/3 bg-gradient-to-r from-neutral-400 to-amber-600"
        style={{ clipPath: "url('#wave2')" }}
      ></div>
      <svg viewBox="0 0 1440 328" width="0" className="">
        <defs>
          <clipPath
            id="wave2"
            clipPathUnits="objectBoundingBox"
            transform="scale(0.00139444444, 0.00504878048)"
          >
            <path d="M504.452 27.7002C163.193 -42.9551 25.9595 38.071 0 87.4161V328H1440V27.7002C1270.34 57.14 845.711 98.3556 504.452 27.7002Z" />
          </clipPath>
        </defs>
      </svg>
      <DevelopImage className="relative z-10 max-w-full w-96 md:w-auto md:max-w-[700px]" />
      <div className="content z-10 pb-2 lg:pb-16">
        <Title>{t("developTitle")}</Title>
        <Paragraph className="lg:mt-4 mt-2">
          {t.rich("developDescription", {
            strong: (chunk) => <strong>{chunk}</strong>,
          })}
          <strong className="text-primary text-6xl md:text-8xl absolute font-baskerville -bottom-10 md:-bottom-20 -right-1 text-cool">
            &#8221;
          </strong>
        </Paragraph>
      </div>
    </article>
  );
};

export default Develop;
