import { useTranslations } from "next-intl";
import { ReactElement } from "react";

import BilingualLogo from "../ui/BilingualLogo";
import Title from "../ui/Title";
import IconPen from "@/components/assets/pen.svg";
import Paragraph from "../ui/Paragraph";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import TitleAccent from "../ui/TitleAccent";

const Intro = (): ReactElement => {
  return (
    <article className="w-full xl:max-h-[70vh] overflow-clip flex flex-col lg:flex-row justify-center items-center gap-12 p-4 pb-6 lg:p-0 bg-gradient-to-b lg:bg-gradient-to-l from-neutral-100 to-neutral-200 dark:to-neutral-900 from-50% min-h-full container mx-auto">
      <IntroHeader />
      <IntroFigure />
    </article>
  );
};

const IntroHeader = () => {
  const t = useTranslations("home.intro");

  return (
    <div className="flex flex-col gap-12 w-1/2 items-center text-center">
      <div className="space-y-6 flex flex-col gap-3">
        <Title>
          Developer <br />
          <TitleAccent>& Designer</TitleAccent>
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
      <div className="flex items-center gap-2">
        <BilingualLogo />
        <IconPen className="dark:fill-neutral-100" />
      </div>
    </div>
  );
};

const IntroFigure = () => (
  <figure className="relative flex justify-center items-end w-1/2 aspect-square">
    <Image
      src="/img/elomar.jpg"
      alt="Elomar"
      className="intro__image absolute -top-8 w-300"
      fill
    />
  </figure>
);

export default Intro;
