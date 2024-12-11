import Image from "next/image";
import { useTranslations } from "next-intl";
import { ReactElement } from "react";
import Paragraph from "../ui/Paragraph";
import Title from "../ui/Title";
import TitleAccent from "../ui/TitleAccent";

const Intro = (): ReactElement => {
  const t = useTranslations("about.intro");

  return (
    <>
      <section className="w-full flex flex-col lg:flex-row items-start lg:items-start lg:justify-between gap-4 lg:gap-0">
        <Title className="md:leading-tight self-start">
          {t.rich("title", {
            br: () => <br />,
            accent: (chunk) => <TitleAccent>{chunk}</TitleAccent>,
          })}
        </Title>
        <Paragraph className="lg:text-right md:text-lg">
          {t("description")}
        </Paragraph>
      </section>
      <figure className="w-full aspect-video relative">
        <Image src="/img/group-photo.jpg" fill alt="Group photo" />
      </figure>
    </>
  );
};

export default Intro;
