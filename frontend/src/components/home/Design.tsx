import { useTranslations } from "next-intl";
import { ReactElement } from "react";

import Paragraph from "../ui/Paragraph";
import Title from "../ui/Title";
import LightbulbImage from "@/components/assets/lightbulb-space.svg";

const Design = (): ReactElement => {
  const t = useTranslations("home.expertise");

  return (
    <article className="flex bg-white dark:bg-neutral-700 flex-col justify-center gap-2 relative lg:flex-row items-center md:gap-4 shadow- rounded-3xl p-4 md:p-8">
      <div
        className="absolute bottom-0 w-full h-2/6 bg-gradient-to-tr from-cool-red rounded-3xl"
        style={{ clipPath: "url('#wave')" }}
      ></div>
      <svg viewBox="0 0 1440 328" width="0" className="">
        <defs>
          <clipPath
            id="wave"
            clipPathUnits="objectBoundingBox"
            transform="scale(0.00139444444, 0.00354878048)"
          >
            <path d="M504.452 27.7002C163.193 -42.9551 25.9595 38.071 0 87.4161V328H1440V27.7002C1270.34 57.14 845.711 98.3556 504.452 27.7002Z" />
          </clipPath>
        </defs>
      </svg>
      <div className="content z-10 pb-6 md:pb-20 pl-0 md:pl-5 md:mb-0 order-1 md:-order-1">
        <Title>{t("designTitle")}</Title>
        <Paragraph className="rounded-md lg:mt-4 mt-2">
          {t.rich("designDescription", {
            strong: (chunk) => <strong>{chunk}</strong>,
          })}
          <strong className="text-primary text-6xl md:text-8xl font-baskerville absolute -top-1 md:-top-4 -left-4">
            &#8220;
          </strong>
        </Paragraph>
      </div>
      <LightbulbImage className="relative z-10 max-w-full w-96 md:w-auto md:max-w-[700px]" />
    </article>
  );
};

export default Design;
