import Image from "next/image";
import { useTranslations } from "next-intl";
import { ReactElement } from "react";
import Paragraph from "../ui/Paragraph";
import Title from "../ui/Title";

const Photography = (): ReactElement => {
  const t = useTranslations("about.photography");

  return (
    <section className="w-full pt-14 lg:pt-20 relative">
      <div className="relative flex flex-col lg:flex-row gap-10 items-center justify-between">
        <div>
          <Title className="md:leading-tight">
            {t.rich("title", {
              br: () => <br />,
              accent: (chunk) => (
                <span className="font-baskerville text-cool-red">{chunk}</span>
              ),
            })}
          </Title>
          <Paragraph className="md:text-lg mt-6 md:leading-relaxed">
            {t("description")}
          </Paragraph>
        </div>
        <figure className="relative">
          <Image alt="Forest" src="/img/dslr.jpg" width={1000} height={1000} />
        </figure>
      </div>
    </section>
  );
};

export default Photography;
