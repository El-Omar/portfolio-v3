import Image from "next/image";
import { useTranslations } from "next-intl";
import { ReactElement } from "react";
import Paragraph from "../ui/Paragraph";
import Title from "../ui/Title";
import TitleAccent from "../ui/TitleAccent";

const Design = (): ReactElement => {
  const t = useTranslations("about.design");

  return (
    <section className="w-full py-14 lg:py-20 relative">
      <div className="relative flex flex-col lg:flex-row lg:gap-10 gap-5 items-center justify-between">
        <figure className="relative order-1 lg:-order-1">
          <Image alt="Forest" src="/img/design.svg" width={900} height={900} />
        </figure>
        <div>
          <Title className="md:leading-tight">
            {t.rich("title", {
              accent: (chunk) => <TitleAccent>{chunk}</TitleAccent>,
            })}
          </Title>
          <Paragraph className="md:text-lg mt-6 md:leading-relaxed">
            {t("description")}
          </Paragraph>
        </div>
      </div>
    </section>
  );
};

export default Design;
