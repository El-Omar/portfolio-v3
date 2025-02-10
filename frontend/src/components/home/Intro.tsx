import Image from "next/image";
import { useTranslations } from "next-intl";
import { ReactElement } from "react";

import BilingualLogoWithPen from "../ui/BilingualLogoWithPen";
import Paragraph from "../ui/Paragraph";
import Title from "../ui/Title";
import TitleAccent from "../ui/TitleAccent";
import { Link } from "@/i18n/routing";

const Intro = (): ReactElement => {
  return (
    <article
      className="w-full xl:max-h-[70vh] overflow-clip 
      flex flex-col lg:flex-row justify-center items-center
      p-8 lg:p-0 gap-6 lg:gap-12
      bg-gradient-to-b lg:bg-gradient-to-l
      from-neutral-100 to-cool-red/5 dark:to-neutral-900"
    >
      <IntroHeader />
      <IntroFigure />
    </article>
  );
};

const IntroHeader = () => {
  const t = useTranslations("home.intro");

  return (
    <div className="flex flex-col gap-12 w-full lg:w-1/2 items-center text-center p-0 lg:p-8 xl:p-0">
      <div className="space-y-6 flex flex-col lg:gap-3 gap-0">
        <Title>
          {t.rich("title", {
            br: () => <br />,
            accent: (chunks) => <TitleAccent>{chunks}</TitleAccent>,
          })}
        </Title>
        <Paragraph className="md:text-lg lg:w-[400px]">
          {t.rich("description", {
            blog: (chunk) => (
              <Link
                className="underline underline-offset-2 hover:text-primary transition-colors"
                href="/blog"
              >
                {chunk}
              </Link>
            ),
          })}
        </Paragraph>
      </div>
      <BilingualLogoWithPen />
    </div>
  );
};

const IntroFigure = () => (
  <figure
    className="relative overflow-clip
      flex justify-center items-end
      w-full lg:w-1/2 aspect-square
      -order-1 lg:order-1
      rounded-full lg:rounded-none"
  >
    <Image
      src="/img/elomar.jpg"
      alt="Elomar"
      className="intro__image absolute -top-8 w-300"
      fill
    />
  </figure>
);

export default Intro;
