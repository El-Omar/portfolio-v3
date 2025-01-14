import { useTranslations } from "next-intl";
import { ReactElement } from "react";

import IntroImage from "./IntroImage";
import BilingualLogo from "../ui/BilingualLogo";
import Paragraph from "../ui/Paragraph";
import Title from "../ui/Title";
import TitleAccent from "../ui/TitleAccent";
import IconPen from "@/components/assets/pen.svg";

const IntroHeader = () => {
  const t = useTranslations("home.intro");
  return (
    <header className="flex flex-col gap-3 max-w-xl">
      <Title className="md:text-4xl text-2xl md:leading-normal leading-snug">
        {t.rich("title", {
          br: () => <br className="md:block" />,
          accent: (chunk) => <TitleAccent>{chunk}</TitleAccent>,
        })}
      </Title>
      <Paragraph>
        {t.rich("description", {
          blog: (chunk) => (
            <a 
              className="underline underline-offset-2 hover:text-primary transition-colors" 
              href="/blog"
            >
              {chunk}
            </a>
          ),
        })}
      </Paragraph>
      <div className="flex items-center gap-2">
        <BilingualLogo />
        <IconPen className="dark:fill-neutral-100" />
      </div>
    </header>
  );
};

const IntroFigure = () => (
  <figure className="relative flex bg-white dark:bg-neutral-700 opacity-90 justify-center items-end xl:w-[460px] xl:h-[460px] w-[300px] h-[300px] rounded-full">
    <div className="hidden md:block absolute w-full h-full inset-0 rounded-full border-[14px] xl:border-[20px] border-neutral-950 dark:border-neutral-50 border-x-transparent dark:border-x-transparent border-b-transparent"></div>
    <div className="hidden md:block absolute w-full h-full inset-0 rounded-full border-[14px] xl:border-[20px] z-10 border-neutral-200 dark:border-neutral-800 border-t-transparent dark:border-t-transparent"></div>
    <IntroImage />
  </figure>
);

const Intro = (): ReactElement => {
  return (
    <article className="w-full flex flex-col lg:flex-row justify-center items-center gap-12 p-4 pb-6 lg:p-0 bg-gradient-to-b lg:bg-gradient-to-r from-transparent to-neutral-200 dark:to-neutral-900 from-50% min-h-full container mx-auto">
      <IntroFigure />
      <IntroHeader />
    </article>
  );
};

export default Intro;
