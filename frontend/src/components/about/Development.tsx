import Image from "next/image";
import { useTranslations } from "next-intl";
import { ReactElement } from "react";
import Paragraph from "../ui/Paragraph";
import Title from "../ui/Title";
import TitleAccent from "../ui/TitleAccent";

const Development = (): ReactElement => {
  const t = useTranslations("about.development");

  return (
    <section className="w-full py-14 relative">
      <div className="absolute h-full w-[200vw] -left-[50vh] bg-neutral-100 dark:bg-neutral-800 top-0"></div>
      <Title className="md:leading-tight relative z-10 text-center mb-10">
        {t.rich("title", {
          accent: (chunk) => <TitleAccent>{chunk}</TitleAccent>,
        })}
      </Title>
      <div className="relative flex flex-col lg:flex-row lg:gap-10 items-center justify-center">
        <figure className="relative">
          <Image
            alt="Forest"
            src="/img/coding.svg"
            width={300 * 2}
            height={220 * 2}
          />
        </figure>
        <Paragraph className="md:text-lg mt-6 md:leading-relaxed">
          {t.rich("description", {
            br: () => <br />,
          })}
        </Paragraph>
      </div>
    </section>
  );
};

export default Development;
